"use client";

import { useState, useEffect, useCallback } from "react";
import { RotateCcw, Star, CheckCircle2, XCircle, Loader2, Timer, Zap } from "lucide-react";
import { saveQuizScore, updateQuizScore } from "@/app/actions/quiz";
import { setQuizCooldown } from "@/app/actions/quiz-cooldown";
import { createClient } from "@/supabase/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

const COOLDOWN_MINUTES = 1;
const QUESTION_TIME = 15;
const OPTION_LETTERS = ["A", "B", "C", "D"];

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
  const [cardAnim, setCardAnim] = useState<"deal" | "throw" | "idle">("deal");
  const [scoreBumping, setScoreBumping] = useState(false);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);

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
    const { data: profile } = await supabase.from("profiles").select("last_quiz_attempt").eq("id", authUser.id).single();
    if (profile?.last_quiz_attempt) {
      const diff = (Date.now() - new Date(profile.last_quiz_attempt).getTime()) / 60000;
      if (diff < COOLDOWN_MINUTES) { setCooldownRemaining(Math.ceil(COOLDOWN_MINUTES - diff)); setCurrentStep("blocked"); return true; }
    }
    const { count } = await supabase.from("quiz_scores").select("*", { count: "exact", head: true }).eq("user_id", authUser.id).gte("created_at", new Date(Date.now() - 86400000).toISOString());
    const attempts = count || 0;
    setDailyAttempts(attempts);
    if (attempts >= 10) { setCurrentStep("limit"); return true; }
    return false;
  }, []);

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(authUser);
      if (authUser) { const blocked = await checkLimits(authUser); if (blocked) { setIsLoading(false); return; } }
      await fetchQuestions();
      setIsLoading(false);
    }
    loadData();
  }, [fetchQuestions, checkLimits]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentStep === "playing" && selectedOption === null && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(p => p - 1), 1000);
    } else if (timeLeft === 0 && currentStep === "playing" && selectedOption === null) {
      setCurrentStep("blocked"); setCooldownRemaining(COOLDOWN_MINUTES);
    }
    return () => clearInterval(timer);
  }, [currentStep, timeLeft, selectedOption]);

  async function startGame() {
    if (user && questions.length > 0) {
      const [saveResult] = await Promise.all([saveQuizScore(0, questions.length), setQuizCooldown()]);
      if (saveResult.success && saveResult.id) setActiveSessionId(saveResult.id);
    }
    setCardAnim("deal");
    setCurrentStep("playing"); setTimeLeft(QUESTION_TIME);
  }

  function handleAnswer(optionIndex: number) {
    if (selectedOption !== null || questions.length === 0) return;
    setSelectedOption(optionIndex);
    const correct = optionIndex === questions[currentQuestion].answer;
    setIsCorrect(correct);
    const finalScore = correct ? score + 1 : score;
    if (correct) {
      setScore(p => p + 1);
      setScoreBumping(true);
      setTimeout(() => setScoreBumping(false), 400);
    } else {
      setWrongIdx(optionIndex);
      setTimeout(() => setWrongIdx(null), 500);
    }
    setTimeout(() => setCardAnim("throw"), 900);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(p => p + 1); setSelectedOption(null); setIsCorrect(null);
        setTimeLeft(QUESTION_TIME); setCardAnim("deal");
      } else {
        finishGame(finalScore);
      }
    }, 1400);
  }

  async function finishGame(finalScore: number) {
    setCurrentStep("results");
    if (user && activeSessionId) await updateQuizScore(activeSessionId, finalScore);
  }

  const timerPct = (timeLeft / QUESTION_TIME) * 100;
  const timerUrgent = timeLeft <= 5;

  const grade = (s: number, total: number) => {
    const pct = s / total;
    if (pct === 1) return { label: "S", text: "Maestro literario" };
    if (pct >= 0.8) return { label: "A", text: "Gran nivel" };
    if (pct >= 0.6) return { label: "B", text: "Notable" };
    if (pct >= 0.4) return { label: "C", text: "Puedes mejorar" };
    return { label: "D", text: "Sigue leyendo" };
  };

  if (isLoading) {
    return (
      <div className="min-h-[80dvh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-foreground/30" />
      </div>
    );
  }

  /* ─── BLOCKED / LIMIT ─── */
  if (currentStep === "blocked" || currentStep === "limit") {
    return (
      <main className="min-h-[80dvh] flex items-center justify-center page-container py-12">
        <div className="w-full max-w-md border-2 border-foreground animate-in fade-in duration-300">
          <div className="invert-block px-8 py-5 flex items-center justify-between">
            <span className="label-sans text-background/60">
              {currentStep === "blocked" ? "Enfriamiento activo" : "Limite diario"}
            </span>
            <Timer className="h-4 w-4 text-background/40" />
          </div>
          <div className="p-8 text-center space-y-6">
            <p className="font-mono font-black text-7xl leading-none">
              {currentStep === "blocked" ? `~${cooldownRemaining}m` : "10/10"}
            </p>
            <p className="body-sans text-foreground/60">
              {currentStep === "blocked" ? "Espera antes de volver a jugar." : "Has completado el límite de hoy. Vuelve mañana."}
            </p>
            {currentStep === "limit" && (
              <div className="flex gap-1">
                {Array.from({length: 10}).map((_, i) => (
                  <div key={i} className={cn("flex-1 h-2", i < dailyAttempts ? "bg-foreground" : "bg-foreground/15")} />
                ))}
              </div>
            )}
            <Link href="/dashboard" className="btn-outline inline-flex">Ir al dashboard</Link>
          </div>
        </div>
      </main>
    );
  }

  /* ─── INTRO ─── */
  if (currentStep === "intro") {
    return (
      <main className="min-h-[80dvh] page-container py-12 flex items-center justify-center">
        <div className="w-full max-w-xl">

          {/* Dark splash header */}
          <div className="invert-block p-10 text-center space-y-2 border-2 border-foreground">
            <p className="label-mono text-background/40 mb-4">Librería Éter</p>
            <h1
              className="font-serif font-black italic text-background"
              style={{ fontSize: "clamp(52px,10vw,110px)", lineHeight: 0.87, letterSpacing: "-0.025em" }}
            >
              Trivial<br/>Literario
            </h1>
            <p className="font-serif italic text-background/50 text-lg mt-4">¿Cuanto sabes realmente de libros?</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-0 border-l-2 border-b-2 border-r-2 border-foreground">
            {[
              { value: "10", label: "preguntas" },
              { value: "15s", label: "por pregunta" },
              { value: user ? `${dailyAttempts}/10` : "∞", label: "partidas hoy" },
            ].map(({ value, label }, i) => (
              <div key={i} className={cn("p-5 text-center", i < 2 && "border-r border-foreground")}>
                <p className="font-mono font-black text-2xl">{value}</p>
                <p className="label-mono mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="border-l-2 border-b-2 border-r-2 border-foreground p-6 space-y-3">
            <button
              onClick={startGame}
              className="btn-primary w-full py-5 flex items-center justify-center gap-3"
              style={{ fontSize: "13px" }}
            >
              <Zap className="h-4 w-4" />
              Empezar a jugar
            </button>

            {!user && (
              <div className="border-soft p-4 space-y-3 mt-2">
                <p className="label-sans">Modo invitado</p>
                <p className="label-mono text-foreground/50">Tu progreso no se guardara. Inicia sesion para ganar puntos.</p>
                <div className="flex gap-2 mt-2">
                  <Link href="/login" className="btn-primary">Iniciar sesion</Link>
                  <Link href="/register" className="btn-outline">Crear cuenta</Link>
                </div>
              </div>
            )}

            {user && (
              <p className="label-mono text-center text-foreground/40">
                Suerte, {user.email?.split("@")[0]}.
              </p>
            )}
          </div>

        </div>
      </main>
    );
  }

  /* ─── RESULTS ─── */
  if (currentStep === "results") {
    const { label, text } = grade(score, questions.length);
    return (
      <main className="min-h-[80dvh] flex items-center justify-center page-container py-12">
        <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">

          {/* Grade block — inverted */}
          <div className="invert-block border-2 border-foreground p-10 text-center">
            <p className="label-mono text-background/40 mb-6">Rango obtenido</p>
            <span
              className="font-serif font-black italic text-background block"
              style={{ fontSize: "clamp(96px,20vw,180px)", lineHeight: 0.85 }}
            >
              {label}
            </span>
            <p className="font-serif italic text-background/60 text-xl mt-4">{text}</p>
          </div>

          {/* Score detail */}
          <div className="border-l-2 border-b-2 border-r-2 border-foreground p-8 space-y-6">
            <div className="flex items-baseline gap-3">
              <span className="font-mono font-black text-6xl">{score}</span>
              <span className="label-mono text-foreground/40">de {questions.length} correctas</span>
            </div>

            {/* Fill bar */}
            <div className="h-3 border border-foreground/20 overflow-hidden">
              <div
                className="h-full bg-foreground transition-all duration-1000 delay-200"
                style={{ width: `${(score / questions.length) * 100}%` }}
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => window.location.reload()} className="btn-primary flex items-center gap-2">
                <RotateCcw className="h-3.5 w-3.5" /> Jugar otra vez
              </button>
              <Link href="/dashboard" className="btn-outline">Ver progreso</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ─── PLAYING ─── */
  return (
    <main
      className="min-h-[80dvh] flex flex-col"
      style={{ backgroundColor: "#0F0F0D" }}
    >
      {/* Top HUD */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(245,240,232,0.1)" }}>
        {/* Progress dots */}
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-2 transition-all duration-300",
                i < currentQuestion ? "w-4 bg-[#F5F0E8]" : i === currentQuestion ? "w-6 bg-[#F5F0E8]/80" : "w-2 bg-[#F5F0E8]/20"
              )}
            />
          ))}
        </div>

        {/* Score */}
        <div className="flex items-center gap-2">
          <Star className="h-3.5 w-3.5" style={{ color: "rgba(245,240,232,0.3)" }} />
          <span
            key={score}
            className={cn("font-mono font-black text-base transition-all", scoreBumping && "quiz-score-bump")}
            style={{ color: "#F5F0E8" }}
          >
            {score}
          </span>
          <span className="label-mono" style={{ color: "rgba(245,240,232,0.3)" }}>pts</span>
        </div>
      </div>

      {/* Timer — large centred display */}
      <div className="flex items-center justify-center py-4">
        <span
          className={cn(
            "font-mono font-black transition-colors duration-300",
            timerUrgent && "quiz-timer-flash"
          )}
          style={{
            fontSize: "clamp(40px, 8vw, 80px)",
            lineHeight: 1,
            color: timerUrgent ? "#F5F0E8" : "rgba(245,240,232,0.25)",
          }}
        >
          {timeLeft}
        </span>
      </div>

      {/* Timer bar */}
      <div className="h-0.5 w-full" style={{ backgroundColor: "rgba(245,240,232,0.08)" }}>
        <div
          className="h-full transition-all duration-1000"
          style={{
            width: `${timerPct}%`,
            backgroundColor: timerUrgent ? "#F5F0E8" : "rgba(245,240,232,0.3)",
          }}
        />
      </div>

      {/* Card area — extra padding right+bottom for stack overflow */}
      <div className="flex-1 flex items-center justify-center px-4 pb-12 pt-4 pr-8">
        <div className="w-full max-w-2xl relative">

          {/* Card N+2 — furthest back, blank */}
          {currentQuestion + 2 < questions.length && (
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                transform: "translate(18px, 16px)",
                backgroundColor: "rgba(245,240,232,0.30)",
                border: "2px solid rgba(245,240,232,0.20)",
                zIndex: 1,
              }}
            />
          )}

          {/* Card N+1 — next question, dimmed behind */}
          {currentQuestion + 1 < questions.length && (
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                transform: "translate(9px, 8px)",
                backgroundColor: "#F5F0E8",
                border: "2px solid rgba(245,240,232,0.55)",
                opacity: 0.55,
                zIndex: 2,
              }}
            >
              <div className="px-10 py-10">
                <p className="label-mono text-foreground/30 mb-4 text-center">
                  Pregunta {currentQuestion + 2}
                </p>
                <p
                  className="font-serif font-bold text-center leading-tight text-foreground/40 line-clamp-3"
                  style={{ fontSize: "clamp(16px, 2.5vw, 26px)" }}
                >
                  {questions[currentQuestion + 1]?.question}
                </p>
              </div>
            </div>
          )}

          {/* Current card — on top */}
          <div
            key={currentQuestion}
            className={cn(
              "relative",
              cardAnim === "deal" && "quiz-card-deal",
              cardAnim === "throw" && "quiz-card-throw"
            )}
            style={{ backgroundColor: "#F5F0E8", border: "2px solid #0F0F0D", zIndex: 3 }}
          >
            {/* Question */}
            <div className="px-10 py-10 border-b border-foreground/20">
              <p className="label-mono text-foreground/40 mb-6 text-center">Pregunta {currentQuestion + 1}</p>
              <h2
                className="font-serif font-bold text-center leading-tight text-foreground"
                style={{ fontSize: "clamp(22px, 3.5vw, 38px)" }}
              >
                {questions[currentQuestion].question}
              </h2>
            </div>

            {/* Options */}
            <div>
              {(questions[currentQuestion].options as string[]).map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectAnswer = idx === questions[currentQuestion].answer;
                const revealed = selectedOption !== null;

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={revealed}
                    className={cn(
                      "w-full flex items-center gap-0 text-left transition-all duration-300",
                      idx < 3 && "border-b border-foreground/15",
                      !revealed && "hover:bg-foreground/5 cursor-pointer",
                      revealed && isCorrectAnswer && "bg-foreground text-background",
                      revealed && isSelected && !isCorrect && "opacity-40",
                      revealed && !isCorrectAnswer && !isSelected && "opacity-20",
                      isSelected && !isCorrect && wrongIdx === idx && "quiz-wrong-shake"
                    )}
                  >
                    <span
                      className={cn(
                        "shrink-0 w-14 h-full min-h-[56px] flex items-center justify-center label-sans border-r border-foreground/15 transition-colors",
                        revealed && isCorrectAnswer ? "text-background/50" : "text-foreground/25"
                      )}
                    >
                      {OPTION_LETTERS[idx]}
                    </span>
                    <span
                      className="flex-1 px-6 py-5 body-sans font-medium"
                      style={{ color: revealed && isCorrectAnswer ? "#F5F0E8" : "hsl(var(--foreground))" }}
                    >
                      {option}
                    </span>
                    {revealed && isCorrectAnswer && <CheckCircle2 className="shrink-0 mr-4 h-4 w-4 text-background/50" />}
                    {isSelected && !isCorrect && <XCircle className="shrink-0 mr-4 h-4 w-4 text-foreground/40" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
