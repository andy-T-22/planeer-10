
// Task interface used by the planner application
export interface Task {
  id: string;
  completed: boolean;
  description: string;
  details: string;
  colorId: string | null;
}

// Main state interface for the planner
export interface PlannerState {
  month: number;
  day: number;
  dayOfWeek: string;
  goal: string;
  tasks: Task[];
  timeGrid: Record<string, string>;
  notes: string;
  todo: string[];
}
