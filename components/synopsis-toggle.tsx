"use client";

import { useState } from "react";

interface SynopsisToggleProps {
  description: string | null;
}

export function SynopsisToggle({ description }: SynopsisToggleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 300;

  if (!description) {
    return (
      <p className="body-sans text-foreground/60">
        Sin descripcion disponible.
      </p>
    );
  }

  if (description.length <= maxLength) {
    return <p className="body-sans leading-relaxed">{description}</p>;
  }

  return (
    <div className="space-y-4">
      <p className="body-sans leading-relaxed">
        {isExpanded ? description : `${description.slice(0, maxLength)}...`}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="btn-ghost"
      >
        {isExpanded ? "Leer menos" : "Leer mas"}
      </button>
    </div>
  );
}
