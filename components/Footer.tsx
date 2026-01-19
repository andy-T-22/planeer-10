
import React from 'react';

interface FooterProps {
  notes: string;
  setNotes: (v: string) => void;
  todo: string[];
  setTodo: (v: string[]) => void;
}

export const Footer: React.FC<FooterProps> = ({ notes, setNotes, todo, setTodo }) => {
  const handleTodoChange = (index: number, value: string) => {
    const newTodo = [...todo];
    newTodo[index] = value;
    setTodo(newTodo);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 border-t border-dark-800 pt-8 mt-4">
      <div className="flex-[3] border border-dark-700 bg-dark-800/20 p-4 h-44 relative rounded-2xl">
        <label className="absolute -top-3 left-3 bg-dark-900 px-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Memo / Reflection</label>
        <textarea
          className="w-full h-full resize-none text-sm font-medium bg-transparent focus:outline-none text-white placeholder-neutral-700"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Thoughts for tomorrow..."
        />
      </div>
      
      <div className="flex-[2] space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600">Quick Items</h4>
        <div className="space-y-3">
          {todo.map((item, i) => (
            <div key={i} className="flex items-center gap-3 border-b border-dark-800 pb-1">
              <div className="w-2 h-2 rounded-full border border-dark-600" />
              <input
                type="text"
                value={item}
                onChange={(e) => handleTodoChange(i, e.target.value)}
                className="flex-1 text-sm font-medium bg-transparent focus:outline-none text-neutral-300 placeholder-neutral-800"
                placeholder="..."
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
