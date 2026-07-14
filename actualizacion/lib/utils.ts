import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const designTokens = {
  glassPanel: "bg-[#141414]/80 backdrop-blur-3xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)]",
  glassPill: "bg-[#141414]/80 backdrop-blur-3xl shadow-[0_0_0_1px_rgba(0,0,0,0.8),0_20px_40px_-10px_rgba(0,0,0,1),inset_0_1px_1px_rgba(255,255,255,0.06)]",
  glassWindow: "bg-[#101214]/90 backdrop-blur-3xl border border-white/10 shadow-2xl",
}
