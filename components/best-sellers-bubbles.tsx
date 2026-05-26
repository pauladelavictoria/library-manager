"use client";

import { useMemo, useState } from "react";
import { pack, hierarchy } from "d3-hierarchy";
import { Card } from "@/components/ui/card";
import type { Book } from "@/lib/types";

interface BestSellersBubblesProps {
  data: Book[];
  groupBy?: "category" | "author" | "book";
}

interface AggregatedData {
  id: string;
  title: string;
  sold_count: number;
}

// A curated palette of muted, earthy hues (different colors but with a warm, desaturated undertone)
const BUBBLE_COLORS = [
  "#B5655D", // Dusty Rose
  "#617A8A", // Muted Slate Blue
  "#C49A45", // Mustard Yellow
  "#7B8A68", // Sage Green
  "#96634F", // Terra Cotta
  "#836E85", // Muted Mauve
  "#4B827E", // Earthy Teal
  "#B88A64", // Warm Caramel
  "#8C5765", // Warm Plum
  "#94886E", // Khaki/Olive
];

export function BestSellersBubbles({ data, groupBy = "category" }: BestSellersBubblesProps) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; data: AggregatedData } | null>(null);

  const { nodes, width, height } = useMemo(() => {
    const width = 800;
    const height = 350;
    const packLayout = pack<any>().size([width, height]).padding(8);
    
    let aggregatedData: AggregatedData[] = [];

    if (groupBy === "book") {
      aggregatedData = (data || []).map(book => ({
        id: book.id,
        title: book.title,
        sold_count: Number(book.sold_count) || 0
      }));
    } else {
      const categoryMap: Record<string, number> = {};
      
      if (data && data.length > 0) {
        data.forEach(book => {
          const count = Number(book.sold_count) || 0;
          if (groupBy === "author") {
            if (book.authors && book.authors.length > 0) {
              book.authors.forEach(auth => {
                categoryMap[auth] = (categoryMap[auth] || 0) + count;
              });
            } else {
              categoryMap["Autor Desconocido"] = (categoryMap["Autor Desconocido"] || 0) + count;
            }
          } else {
            if (book.categories && book.categories.length > 0) {
              book.categories.forEach(cat => {
                categoryMap[cat] = (categoryMap[cat] || 0) + count;
              });
            } else {
              categoryMap["Sin categoría"] = (categoryMap["Sin categoría"] || 0) + count;
            }
          }
        });
      }

      aggregatedData = Object.entries(categoryMap).map(([name, count]) => ({
        id: name,
        title: name,
        sold_count: count
      }));
    }

    const root = hierarchy({ children: aggregatedData })
      .sum((d: any) => {
        if (d.children) return 0;
        return Math.max(1, d.sold_count);
      })
      .sort((a, b) => (b.value || 0) - (a.value || 0));
    
    const nodes = packLayout(root).leaves();
    return { nodes, width, height };
  }, [data, groupBy]);

  if (!data || data.length === 0) {
    return <div className="h-[350px] w-full flex items-center justify-center text-slate-500">No data available</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<SVGGElement>, item: AggregatedData) => {
    const svgRect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
    if (svgRect) {
      setTooltip({
        x: e.clientX - svgRect.left,
        y: e.clientY - svgRect.top,
        data: item,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className="relative w-full h-[350px]">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        {nodes.map((node, index) => {
          const { x, y, r, data: item } = node;
          const color = BUBBLE_COLORS[index % BUBBLE_COLORS.length];
          return (
            <g 
              key={item.id || index}
              transform={`translate(${x},${y})`}
              className="cursor-pointer transition-all hover:brightness-110 duration-300"
              onMouseMove={(e) => handleMouseMove(e, item)}
              onMouseLeave={handleMouseLeave}
            >
              <circle
                r={r}
                fill={color}
                className="drop-shadow-md transition-opacity hover:opacity-90"
              />
              {r > 20 && (
                <text
                  textAnchor="middle"
                  dy=".3em"
                  className="fill-white font-bold pointer-events-none drop-shadow-sm"
                  style={{ fontSize: Math.max(10, Math.min(r / 3.5, 14)) }}
                >
                  {item.title.length > 15 ? item.title.substring(0, 12) + "..." : item.title}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {tooltip && (
        <div 
          className="absolute pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full pb-3"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <Card className="p-3 border-slate-200 shadow-xl bg-white/95 backdrop-blur-md rounded-xl border whitespace-nowrap">
            <p className="font-black text-sm mb-1">{tooltip.data.title}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              {tooltip.data.sold_count} unidades vendidas
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
