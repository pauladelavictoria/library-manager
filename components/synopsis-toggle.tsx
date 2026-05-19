"use client";

import { useState } from "react";

interface SynopsisToggleProps {
  description: string | null;
}

export function SynopsisToggle({ description }: SynopsisToggleProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const maxLength = 250;

  if (!description) {
    return (
      <p className="text-xl">
        Este libro no cuenta con una descripción detallada en este momento. Sin embargo, es una de las obras más buscadas de su categoría.
      </p>
    );
  }

  if (description.length <= maxLength) {
    return <p className="text-xl leading-relaxed">{description}</p>;
  }

  const displayedText = isExpanded
    ? description
    : `${description.slice(0, maxLength)}...`;

  return (
    <div className="space-y-3">
      <p className="text-xl leading-relaxed transition-all duration-300">
        {displayedText}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-primary hover:text-primary/80 font-bold text-lg underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all focus:outline-none"
      >
        {isExpanded ? "Leer menos" : "Leer más"}
      </button>
    </div>
  );
}
