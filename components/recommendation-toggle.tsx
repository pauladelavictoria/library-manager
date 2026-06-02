"use client";
import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { toggleRecommendation } from "@/app/actions/books";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface RecommendationToggleProps {
  bookId: string;
  isRecommended: boolean;
}

export function RecommendationToggle({ bookId, isRecommended: initialIsRecommended }: RecommendationToggleProps) {
  const [isRecommended, setIsRecommended] = useState(initialIsRecommended);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    const result = await toggleRecommendation(bookId);

    if (result.success) {
      setIsRecommended(!isRecommended);
      toast.success(isRecommended ? "Recomendación eliminada" : "Libro recomendado");
    } else {
      toast.error(result.error);
    }
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={cn("p-sm rounded-full transition-all duration-300", isRecommended ? "text-yellow-500 bg-yellow-50 " : "text-slate-300 hover:text-yellow-500 hover:bg-yellow-50 ")}
      title={isRecommended ? "Quitar de recomendados" : "Marcar como recomendado (Máx 3)"}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Star className={cn("h-5 w-5", isRecommended && "fill-current")} />
      )}
    </button>
  );
}
