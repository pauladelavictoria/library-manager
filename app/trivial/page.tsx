"use client";

import { useState, useEffect } from "react";
import { Trophy, HelpCircle, RotateCcw, LogIn, UserPlus, Star, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { saveQuizScore } from "@/app/actions/quiz";
import { createClient } from "@/supabase/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState<"intro" | "playing" | "results">("intro");
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function loadData() {
      const [{ data: { user: authUser } }, { data: dbQuestions }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from("quiz_questions").select("*")
      ]);

      setUser(authUser);
      if (dbQuestions) {
        const shuffled = [...dbQuestions].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 10));
      }
      setIsLoading(false);
    }

    loadData();
  }, []);

  function handleAnswer(optionIndex: number) {
    if (selectedOption !== null || questions.length === 0) return;

    setSelectedOption(optionIndex);
    const correct = optionIndex === questions[currentQuestion].answer;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        finishGame();
      }
    }, 1500);
  }

  async function finishGame() {
    setCurrentStep("results");
    if (user && questions.length > 0) {
      await saveQuizScore(score, questions.length);
    }
  }

  useEffect(() => {
    if (currentStep === "results" && user && questions.length > 0) {
      saveQuizScore(score, questions.length);
    }
  }, [currentStep, user, questions.length, score]);

  function restart() {
    setIsLoading(true);
    const supabase = createClient();
    supabase.from("quiz_questions").select("*").then(({ data }) => {
      if (data) {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 10));
      }
      setCurrentStep("intro");
      setCurrentQuestion(0);
      setScore(0);
      setSelectedOption(null);
      setIsCorrect(null);
      setIsLoading(false);
    });
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

        {currentStep === "intro" && (
          <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
            <CardContent className="p-12 text-center space-y-8">
              <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-bounce">
                <HelpCircle className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-tight">Trivia Literario</h1>
                <p className="text-slate-500 font-medium text-lg italic">¿Cuánto sabes realmente de libros?</p>
              </div>
              <div className="flex flex-col gap-4 pt-4">
                <Button onClick={() => setCurrentStep("playing")} className="h-16 rounded-2xl bg-primary text-white text-xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all">
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
              <div className="flex items-center gap-2 font-black text-slate-400">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>{score} Puntos</span>
              </div>
            </div>

            <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-white dark:bg-slate-900">
              <div className="h-2 bg-slate-100 dark:bg-slate-800 w-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
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
