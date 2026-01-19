
import React from 'react';
import { HOURS, INTERVALS } from '../constants.ts';

interface TimeGridProps {
  timeGrid: Record<string, string>;
  onBlockClick: (hour: string, interval: number) => void;
}

export const TimeGrid: React.FC<TimeGridProps> = ({ timeGrid, onBlockClick }) => {
  return (
    <div className="min-w-[200px]">
      <div className="flex text-[9px] font-black text-neutral-600 mb-4 uppercase tracking-widest">
        <div className="w-12" />
        {INTERVALS.map((int) => (
          <div key={int} className="flex-1 text-center">{int}m</div>
        ))}
      </div>
      <div className="space-y-1.5">
        {HOURS.map((hour) => (
          <div key={hour} className="flex items-center gap-3 group">
            <span className="w-12 text-[10px] font-bold text-neutral-500 text-right">{hour}</span>
            <div className="flex-1 flex gap-1 h-5">
              {INTERVALS.map((int) => {
                const key = `${hour}:${int}`;
                const color = timeGrid[key];
                return (
                  <button
                    key={int}
                    onClick={() => onBlockClick(hour, int)}
                    className={`flex-1 rounded-sm transition-all hover:brightness-125 ${
                      !color ? 'bg-dark-800 border border-dark-700/50' : 'shadow-inner'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
