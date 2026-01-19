
import React from 'react';
import { Task } from '../types.ts';

interface TaskSectionProps {
  tasks: Task[];
  onTaskChange: (id: string, updates: Partial<Task>) => void;
  selectedPaletteColor: string | null;
}

export const TaskSection: React.FC<TaskSectionProps> = ({ tasks, onTaskChange, selectedPaletteColor }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-[10px] font-black border-b border-dark-800 pb-2 uppercase tracking-[0.3em] text-neutral-600">Daily Schedule</h3>
      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start gap-4 group">
            <button
              onClick={() => onTaskChange(task.id, { colorId: selectedPaletteColor })}
              className="w-5 h-5 mt-1 rounded-md border border-dark-700 flex-shrink-0 transition-all hover:scale-110 shadow-lg"
              style={{ backgroundColor: task.colorId || 'transparent' }}
            />
            <div className="flex-1 flex flex-col border-b border-dark-800 pb-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => onTaskChange(task.id, { completed: e.target.checked })}
                  className="w-4 h-4 accent-accent bg-dark-800 border-dark-700 rounded"
                />
                <input
                  type="text"
                  value={task.description}
                  onChange={(e) => onTaskChange(task.id, { description: e.target.value })}
                  className={`flex-1 text-sm bg-transparent focus:outline-none font-medium transition-all ${task.completed ? 'line-through text-neutral-600' : 'text-neutral-200'}`}
                  placeholder="Task..."
                />
              </div>
              <input
                type="text"
                value={task.details}
                onChange={(e) => onTaskChange(task.id, { details: e.target.value })}
                className="text-[10px] text-neutral-500 bg-transparent focus:outline-none pl-7 mt-1"
                placeholder="Details..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
