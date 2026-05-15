"use client";

import { useState, useEffect, useCallback } from "react";
import { Trophy, HelpCircle, RotateCcw, LogIn, UserPlus, Star, CheckCircle2, XCircle, Loader2, Timer, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { saveQuizScore, updateQuizScore } from "@/app/actions/quiz";
import { setQuizCooldown } from "@/app/actions/quiz-cooldown";
import { createClient } from "@/supabase/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

const COOLDOWN_MINUTES = 60;
const QUESTION_TIME = 15;

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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
          <p className="font-black text-slate-400 uppercase tracking-[0.2em] animate-pulse">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">

        {currentStep === "blocked" && (
          <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl animate-in fade-in zoom-in duration-500">
            <CardContent className="p-12 text-center space-y-8">
              <div className="mx-auto w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
                <Timer className="h-12 w-12 text-red-500" />
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-tight">Acceso Bloqueado</h1>
                <p className="text-slate-500 font-medium text-lg">
                  Has agotado tu tiempo o has fallado. Debes esperar a que pase el tiempo de enfriamiento.
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-3xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">PODRÁS VOLVER A JUGAR EN</p>
                <p className="text-4xl font-black text-slate-900 dark:text-white">
                  ~ {cooldownRemaining} minutos
                </p>
              </div>
              <Button asChild variant="outline" className="w-full h-14 rounded-2xl font-bold">
                <Link href="/dashboard">Volver al Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "limit" && (
          <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl animate-in fade-in zoom-in duration-500">
            <CardContent className="p-12 text-center space-y-8">
              <div className="mx-auto w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center">
                <AlertCircle className="h-12 w-12 text-amber-500" />
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-tight">Límite Diario Alcanzado</h1>
                <p className="text-slate-500 font-medium text-lg">
                  Has completado tus 10 partidas de hoy. Vuelve mañana para seguir acumulando puntos.
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-3xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">PARTIDAS HOY</p>
                <p className="text-4xl font-black text-slate-900 dark:text-white">
                  10 / 10
                </p>
              </div>
              <Button asChild variant="outline" className="w-full h-14 rounded-2xl font-bold">
                <Link href="/dashboard">Volver al Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "intro" && (
          <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
            <CardContent className="p-12 text-center space-y-8">
              <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-bounce">
                <HelpCircle className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-tight">Trivial Literario</h1>
                <p className="text-slate-500 font-medium text-lg italic">¿Cuánto sabes realmente de libros?</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <Timer className="h-5 w-5 text-primary mb-2" />
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Tiempo</p>
                  <p className="font-bold">15 segundos por pregunta </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <AlertCircle className="h-5 w-5 text-red-500 mb-2" />
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Límite</p>
                  <p className="font-bold">10 partidas cada día</p>
                </div>
              </div>

              {user && (
                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-primary fill-primary/20" />
                    <p className="text-sm font-bold">Tus partidas hoy</p>
                  </div>
                  <Badge className="bg-primary text-white border-none font-black px-3 py-1 rounded-full">
                    {dailyAttempts} / 10
                  </Badge>
                </div>
              )}

              <div className="flex flex-col gap-4 pt-4">
                <Button onClick={startGame} className="h-16 rounded-2xl bg-primary text-white text-xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                  ¡Empezar a Jugar!
                </Button>
                {!user && (
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-8">
                    Juega como invitado o inicia sesión para guardar tu récord
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === "playing" && questions.length > 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between px-4">
              <Badge className="bg-primary/10 text-primary border-none font-bold px-4 py-1 rounded-full">
                Pregunta {currentQuestion + 1} de {questions.length}
              </Badge>

              <div className={cn(
                "flex items-center gap-2 font-black transition-colors px-4 py-1 rounded-full border-2",
                timeLeft <= 5 ? "text-red-500 border-red-500/20 bg-red-500/5 animate-pulse" : "text-slate-400 border-transparent"
              )}>
                <Timer className="h-4 w-4" />
                <span>{timeLeft}s</span>
              </div>

              <div className="flex items-center gap-2 font-black text-slate-400">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>{score} Puntos</span>
              </div>
            </div>

            <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-white dark:bg-slate-900">
              <div className="h-2 bg-slate-100 dark:bg-slate-800 w-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-1000 linear",
                    timeLeft <= 5 ? "bg-red-500" : "bg-primary"
                  )}
                  style={{ width: `${(timeLeft / QUESTION_TIME) * 100}%` }}
                />
              </div>
              <CardContent className="p-10 space-y-8">
                <h2 className="text-2xl font-black leading-tight text-center text-slate-900 dark:text-white">
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
                        className={cn(
                          "w-full p-6 rounded-2xl text-left font-bold transition-all border-2 flex items-center justify-between group",
                          selectedOption === null
                            ? "border-slate-100 dark:border-slate-800 hover:border-primary hover:bg-primary/5 text-slate-600 dark:text-slate-300"
                            : isSelected
                              ? isCorrect
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-red-500 bg-red-50 text-red-700"
                              : isCorrectAnswer && selectedOption !== null
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700 opacity-50"
                                : "border-slate-50 dark:border-slate-800 opacity-30"
                        )}
                      >
                        <span>{option}</span>
                        {selectedOption !== null && isCorrectAnswer && <CheckCircle2 className="h-6 w-6 text-emerald-500" />}
                        {isSelected && !isCorrect && <XCircle className="h-6 w-6 text-red-500" />}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === "results" && (
          <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl animate-in zoom-in duration-500">
            <CardContent className="p-12 text-center space-y-8">
              <div className="relative mx-auto w-32 h-32 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-ping opacity-25" />
                <Trophy className="h-16 w-16 text-yellow-500" />
              </div>

              <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">¡Partida Terminada!</h2>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-6xl font-black text-primary">{score}</span>
                  <span className="text-2xl font-bold text-slate-400">/ {questions.length}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  {score === questions.length ? "¡Eres un maestro literario!" : score >= 7 ? "¡Impresionante! Tienes un gran nivel." : score >= 5 ? "Nada mal, pero puedes mejorar." : "Aún te queda mucho por leer..."}
                </p>
              </div>

              {!user ? (
                <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 space-y-4">
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    Tu puntuación no se ha guardado. Inicia sesión para entrar en el ranking.
                  </p>
                  <div className="flex gap-3">
                    <Button asChild variant="outline" className="flex-1 h-12 rounded-xl font-bold">
                      <Link href="/login"><LogIn className="mr-2 h-4 w-4" /> Login</Link>
                    </Button>
                    <Button asChild className="flex-1 h-12 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 font-bold">
                      <Link href="/register"><UserPlus className="mr-2 h-4 w-4" /> Registro</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center gap-2 border border-emerald-500/10">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Tu puntuación ha sido guardada con éxito</span>
                </div>
              )}

              <Button onClick={restart} variant="ghost" className="w-full h-14 rounded-2xl font-bold text-slate-500 hover:text-primary transition-colors">
                <RotateCcw className="mr-2 h-4 w-4" /> Jugar otra vez
              </Button>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
