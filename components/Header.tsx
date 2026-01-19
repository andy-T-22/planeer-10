
import React from 'react';
import { PlannerState } from '../types.ts';
import { COLORS } from '../constants.ts';

interface HeaderProps {
  state: PlannerState;
  updateState: (updates: Partial<PlannerState>) => void;
  selectedColor: string | null;
  setSelectedColor: (color: string | null) => void;
  totalMinutes: number;
  colorSummary: Record<string, number>;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  selectedColor,
  setSelectedColor,
  totalMinutes,
  colorSummary
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-5xl font-black text-white italic leading-none">
            {state.month.toString().padStart(2, '0')}.{state.day.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] font-black text-accent tracking-[0.4em] uppercase">{state.dayOfWeek}</span>
        </div>
        <div className="h-12 w-[1px] bg-dark-700 mx-2" />
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => setSelectedColor(c.hex)}
              className={`w-7 h-7 rounded-full border-2 transition-all ${
                selectedColor === c.hex ? 'border-white scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <button
            onClick={() => setSelectedColor(null)}
            className={`w-7 h-7 rounded-full border-2 border-dashed flex items-center justify-center text-[10px] transition-all ${
              selectedColor === null ? 'border-white scale-110' : 'border-dark-700 text-neutral-600'
            }`}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500 overflow-x-auto pb-2">
        {COLORS.map(c => (
          <div key={c.hex} className="flex items-center gap-2 whitespace-nowrap">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.hex }} />
            <span>{colorSummary[c.hex] || 0}m</span>
          </div>
        ))}
        <div className="border-l border-dark-700 pl-4 ml-2 text-white">Total: {totalMinutes}m</div>
      </div>
    </div>
  );
};
