
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User, signOut } from 'firebase/auth';
import { doc, onSnapshot, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from './firebaseConfig.ts';
import { PlannerState, Task } from './types.ts';
import { COLORS, HOURS, INTERVALS, DAYS_OF_WEEK } from './constants.ts';
import { Header } from './components/Header.tsx';
import { TaskSection } from './components/TaskSection.tsx';
import { TimeGrid } from './components/TimeGrid.tsx';
import { Footer } from './components/Footer.tsx';

interface AppProps {
  user: User;
}

const App: React.FC<AppProps> = ({ user }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(COLORS[0].hex);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<PlannerState>({
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    dayOfWeek: DAYS_OF_WEEK[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1],
    goal: '',
    tasks: Array.from({ length: 12 }, (_, i) => ({
      id: `task-${i}`,
      completed: false,
      description: '',
      details: '',
      colorId: null,
    })),
    timeGrid: {},
    notes: '',
    todo: ['', '', '', ''],
  });

  // Suscripción a los datos del usuario en Firestore
  useEffect(() => {
    const docRef = doc(db, 'planners', user.uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setState(prev => ({ ...prev, ...docSnap.data() }));
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user.uid]);

  // Guardar cambios en Firestore (Debounced o por acción)
  const saveToFirebase = useCallback(async (newState: PlannerState) => {
    try {
      await setDoc(doc(db, 'planners', user.uid), {
        ...newState,
        lastUpdated: Timestamp.now()
      });
    } catch (e) {
      console.error("Error saving state", e);
    }
  }, [user.uid]);

  const updateState = (updates: Partial<PlannerState>) => {
    const newState = { ...state, ...updates };
    setState(newState);
    saveToFirebase(newState);
  };

  const handleTaskChange = (id: string, updates: Partial<Task>) => {
    const newTasks = state.tasks.map(t => (t.id === id ? { ...t, ...updates } : t));
    updateState({ tasks: newTasks });
  };

  const toggleTimeBlock = (hour: string, interval: number) => {
    const key = `${hour}:${interval}`;
    const newGrid = { ...state.timeGrid };
    if (selectedColor === null) {
      delete newGrid[key];
    } else {
      newGrid[key] = selectedColor;
    }
    updateState({ timeGrid: newGrid });
  };

  const colorSummary = useMemo(() => {
    const summary: Record<string, number> = {};
    Object.values(state.timeGrid).forEach((hex) => {
      summary[hex] = (summary[hex] || 0) + 10;
    });
    return summary;
  }, [state.timeGrid]);

  const totalMinutes = useMemo(() => {
    return Object.keys(state.timeGrid).length * 10;
  }, [state.timeGrid]);

  if (loading) return null;

  return (
    <div className="min-h-screen p-4 md:p-8 flex justify-center bg-dark-950">
      <div className="w-full max-w-[1000px] bg-dark-900 shadow-2xl border border-dark-800 p-6 md:p-10 flex flex-col gap-8 rounded-3xl animate-fadeIn">
        
        <div className="flex justify-between items-start">
            <Header 
              state={state} 
              updateState={updateState} 
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              totalMinutes={totalMinutes}
              colorSummary={colorSummary}
            />
            <button 
                onClick={() => signOut(auth)}
                className="text-[10px] uppercase tracking-widest font-bold text-neutral-600 hover:text-white transition-colors border-b border-transparent hover:border-white"
            >
                Logout
            </button>
        </div>

        <div className="border border-dark-700 bg-dark-800/50 p-4 h-24 relative rounded-xl">
          <label className="absolute -top-3 left-3 bg-dark-900 px-2 text-[10px] font-bold text-accent uppercase tracking-widest">Main Goal</label>
          <textarea 
            className="w-full h-full resize-none text-sm font-medium bg-transparent focus:outline-none text-white placeholder-neutral-600"
            value={state.goal}
            onChange={(e) => updateState({ goal: e.target.value })}
            placeholder="Focus on what matters..."
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-[3]">
            <TaskSection 
              tasks={state.tasks} 
              onTaskChange={handleTaskChange}
              selectedPaletteColor={selectedColor}
            />
          </div>
          <div className="flex-[2] border-l border-dark-800 pl-0 lg:pl-10">
            <TimeGrid 
              timeGrid={state.timeGrid} 
              onBlockClick={toggleTimeBlock}
            />
          </div>
        </div>

        <Footer 
          notes={state.notes}
          setNotes={(v) => updateState({ notes: v })}
          todo={state.todo}
          setTodo={(v) => updateState({ todo: v })}
        />
      </div>
    </div>
  );
};

export default App;
