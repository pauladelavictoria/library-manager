"use client";

import { useState, useEffect, useCallback } from "react";
import { Trophy, HelpCircle, RotateCcw, Star, CheckCircle2, XCircle, Loader2, Timer, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { saveQuizScore, updateQuizScore } from "@/app/actions/quiz";
import { setQuizCooldown } from "@/app/actions/quiz-cooldown";
import { createClient } from "@/supabase/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

const COOLDOWN_MINUTES = 10;
const QUESTION_TIME = 10;

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState<"intro" | "playing" | "results" | "blocked" | "limit">("intro");
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [cooldownRemaining, setCooldownRemaining] = useState<number | null>(null);
  const [dailyAttempts, setDailyAttempts] = useState(0);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    const supabase = createClient();
    const { data: dbQuestions } = await supabase.from("quiz_questions").select("*");
    if (dbQuestions) {
      const shuffled = [...dbQuestions].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, 10));
    }
  }, []);

  const checkLimits = useCallback(async (authUser: any) => {
    const supabase = createClient();

    const { data: profile } = await supabase
      .from("profiles")
      .select("last_quiz_attempt")
      .eq("id", authUser.id)
      .single();

    if (profile?.last_quiz_attempt) {
      const lastAttempt = new Date(profile.last_quiz_attempt).getTime();
      const now = new Date().getTime();
      const diffMinutes = (now - lastAttempt) / (1000 * 60);

      if (diffMinutes < COOLDOWN_MINUTES) {
        setCooldownRemaining(Math.ceil(COOLDOWN_MINUTES - diffMinutes));
        setCurrentStep("blocked");
        return true;
      }
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: attemptsCount } = await supabase
      .from("quiz_scores")
      .select("*", { count: "exact", head: true })
      .eq("user_id", authUser.id)
      .gte("created_at", twentyFourHoursAgo);

    const attempts = attemptsCount || 0;
    setDailyAttempts(attempts);

    if (attempts >= 10) {
      setCurrentStep("limit");
      return true;
    }

    return false;
  }, []);

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(authUser);

      if (authUser) {
        const isBlocked = await checkLimits(authUser);
        if (isBlocked) {
          setIsLoading(false);
          return;
        }
      }

      await fetchQuestions();
      setIsLoading(false);
    }

    loadData();
  }, [fetchQuestions, checkLimits]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentStep === "playing" && selectedOption === null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentStep === "playing" && selectedOption === null) {
      handleTimeout();
    }

    return () => clearInterval(timer);
  }, [currentStep, timeLeft, selectedOption]);

  async function handleTimeout() {
    setCurrentStep("blocked");
    setCooldownRemaining(COOLDOWN_MINUTES);
  }

  async function startGame() {
    if (user && questions.length > 0) {
      const [saveResult] = await Promise.all([
        saveQuizScore(0, questions.length),
        setQuizCooldown()
      ]);

      if (saveResult.success && saveResult.id) {
        setActiveSessionId(saveResult.id);
      }
    }
    setCurrentStep("playing");
    setTimeLeft(QUESTION_TIME);
  }

  function handleAnswer(optionIndex: number) {
    if (selectedOption !== null || questions.length === 0) return;

    setSelectedOption(optionIndex);
    const correct = optionIndex === questions[currentQuestion].answer;
    setIsCorrect(correct);

    const finalScore = correct ? score + 1 : score;
    if (correct) setScore(prev => prev + 1);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
        setTimeLeft(QUESTION_TIME);
      } else {
        finishGame(finalScore);
      }
    }, 1500);
  }

  async function finishGame(finalScore: number) {
    setCurrentStep("results");
    if (user && activeSessionId) {
      await updateQuizScore(activeSessionId, finalScore);
    }
  }

  function restart() {
    window.location.reload();
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-md">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 text-foreground animate-spin mx-auto" />
          <p className="font-black text-foreground/40 uppercase tracking-[0.2em] animate-pulse">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-container">
      <div className="container mx-auto px-md max-w-2xl">

        {currentStep === "blocked" && (
          <Card className="p-lg rounded-[2.5rem] overflow-hidden bg-background backdrop-blur-xl animate-in fade-in zoom-in duration-500">
            <CardContent className="text-center space-y-8">
              <div className="mx-auto w-24 h-24 bg-cardDark rounded-full flex items-center justify-center">
                <Timer className="h-12 w-12 text-foreground" />
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-tight">Acceso Bloqueado</h1>
                <p className=" font-medium text-lg">
                  Debes esperar a que pase el tiempo de enfriamiento.
                </p>
              </div>
              <div className="pg-background p-lg rounded-3xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-xs">PODRÁS VOLVER A JUGAR EN</p>
                <p className="text-4xl font-black text-foreground">
                  ~ {cooldownRemaining} minutos
                </p>
              </div>
              <Button asChild variant="primary">
                <Link href="/dashboard">Volver al Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "limit" && (
          <Card className="rounded-[2.5rem] overflow-hidden bg-background animate-in fade-in zoom-in duration-500">
            <CardContent className="p-lg text-center space-y-8">
              <div className="mx-auto w-24 h-24 bg-cardDark rounded-full flex items-center justify-center">
                <AlertCircle className="h-12 w-12 text-foreground" />
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-tight">Límite Diario Alcanzado</h1>
                <p className=" font-medium text-lg">
                  Has completado tus 10 partidas de hoy. Vuelve mañana para seguir acumulando puntos.
                </p>
              </div>
              <div className="pg-background p-lg rounded-3xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-xs">PARTIDAS HOY</p>
                <p className="text-4xl font-black text-foreground">
                  10 / 10
                </p>
              </div>
              <Button asChild variant="primary">
                <Link href="/dashboard">Volver al Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "intro" && (
          <Card className="rounded-[2.5rem] overflow-hidden bg-background">
            <CardContent className="p-lg text-center space-y-8">
              <div className="mx-auto w-24 h-24 bg-cardDark rounded-full flex items-center justify-center animate-bounce">
                <HelpCircle className="h-12 w-12 text-foreground" />
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-tight">Trivial Literario</h1>
                <p className=" font-medium text-lg italic">¿Cuánto sabes realmente de libros?</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className={cn("p-md rounded-2xl bg-cardDark/30 border border-cardDark", !user && "col-span-2")}>
                  <Timer className="h-5 w-5 text-foreground mb-sm" />
                  <p className="text-xs font-black uppercase tracking-widest text-foreground/40">Tiempo</p>
                  <p className="font-bold">15 segundos por pregunta</p>
                </div>
                {user && (
                  <div className="p-md rounded-2xl bg-cardDark/30 border border-cardDark">
                    <AlertCircle className="h-5 w-5 text-foreground mb-sm" />
                    <p className="text-xs font-black uppercase tracking-widest text-foreground/40">Límite</p>
                    <p className="font-bold text-xs">10 partidas cada día</p>
                  </div>
                )}
              </div>

              {user && (
                <div className="bg-cardDark/30 border border-cardDark rounded-2xl p-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-foreground fill-foreground/20" />
                    <p className="text-sm font-bold">Tus partidas hoy</p>
                  </div>
                  <Badge className="bg-foreground text-background border-none font-black px-sm py-xs rounded-full">
                    {dailyAttempts} / 10
                  </Badge>
                </div>
              )}

              <div className="flex flex-col gap-4 pt-md">
                <Button onClick={startGame}>
                  ¡Empezar a Jugar!
                </Button>

                {!user ? (
                  <div className="mt-md p-lg rounded-[2rem] bg-cardDark/30 border border-cardDark space-y-4">
                    <div className="flex items-center gap-3 justify-center text-foreground">
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-xs font-black uppercase tracking-widest">Atención: Modo Invitado</p>
                    </div>
                    <p className="text-sm font-medium">
                      Estás jugando como invitado. <span className="text-foreground font-bold">Tu progreso y puntos no se guardarán</span> y no podrás conseguir el cupón de 3€.
                    </p>
                    <div className="flex gap-2">
                      <Button asChild variant="primary">
                        <Link href="/login">Iniciar Sesión</Link>
                      </Button>
                      <Button asChild variant="ghost">
                        <Link href="/register">Crear Cuenta</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">
                    ¡Suerte, {user.email?.split('@')[0]}! Tu progreso se guardará automáticamente.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === "playing" && questions.length > 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between px-md">
              <Badge className="bg-cardDark text-foreground border-none font-bold px-md py-xs rounded-full">
                Pregunta {currentQuestion + 1} de {questions.length}
              </Badge>

              <div className={cn("flex items-center gap-2 font-black transition-colors px-md py-xs rounded-full border-2", timeLeft <= 5 ? "text-foreground border-foreground/20 bg-foreground/5 animate-pulse" : "text-foreground/40 border-transparent")}>
                <Timer className="h-4 w-4" />
                <span>{timeLeft}s</span>
              </div>

              <div className="flex items-center gap-2 font-black text-foreground/60">
                <Star className="h-4 w-4 text-foreground fill-foreground" />
                <span>{score} Puntos</span>
              </div>
            </div>

            <Card className="rounded-[2.5rem] overflow-hidden bg-background">
              <div className="h-2 pg-background w-full overflow-hidden">
                <div
                  className={cn("h-full transition-all duration-1000 linear", timeLeft <= 5 ? "bg-foreground" : "bg-foreground")}
                  style={{ width: `${(timeLeft / QUESTION_TIME) * 100}%` }}
                />
              </div>
              <CardContent className="p-lg space-y-8">
                <h2 className="text-2xl font-black leading-tight text-center text-foreground">
                  {questions[currentQuestion].question}
                </h2>

                <div className="grid gap-3">
                  {(questions[currentQuestion].options as string[]).map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrectAnswer = idx === questions[currentQuestion].answer;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={selectedOption !== null}
                        className={cn("w-full p-lg rounded-2xl text-left font-bold transition-all border-2 flex items-center justify-between group", selectedOption === null ? "border-cardDark hover:border-foreground hover:bg-cardDark/30 text-foreground" : isSelected ? isCorrect ? "border-foreground bg-cardDark text-foreground" : "border-foreground/30 bg-cardDark/30 text-foreground/50" : isCorrectAnswer && selectedOption !== null ? "border-foreground bg-cardDark text-foreground opacity-60" : "border-cardDark/30 opacity-30")}
                      >
                        <span>{option}</span>
                        {selectedOption !== null && isCorrectAnswer && <CheckCircle2 className="h-6 w-6 text-foreground" />}
                        {isSelected && !isCorrect && <XCircle className="h-6 w-6 text-foreground/40" />}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === "results" && (
          <Card className="p-lg rounded-[2.5rem] border-none shadow-2xl overflow-hidden card-background animate-in zoom-in duration-500">
            <CardContent className="text-center space-y-8">
              <div className="relative mx-auto w-32 h-32 bg-cardDark rounded-full flex items-center justify-center">
                <div className="absolute inset-0 bg-cardDark rounded-full animate-ping opacity-25" />
                <Trophy className="h-16 w-16 text-foreground" />
              </div>

              <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tight text-foreground">¡Partida Terminada!</h2>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-6xl font-black text-foreground">{score}</span>
                  <span className="text-2xl font-bold text-foreground/40">/ {questions.length}</span>
                </div>
                <p className=" font-medium">
                  {score === questions.length ? "¡Eres un maestro literario!" : score >= 7 ? "¡Impresionante! Tienes un gran nivel." : score >= 5 ? "Nada mal, pero puedes mejorar." : "Aún te queda mucho por leer..."}
                </p>
              </div>


              <Button onClick={restart} variant="ghost">
                <RotateCcw className="mr-sm h-4 w-4" /> Jugar otra vez
              </Button>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
