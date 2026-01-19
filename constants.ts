
export const STORAGE_KEY = 'daily-planner-firebase-v1';

// Colors for task categorization and time grid highlighting
export const COLORS = [
  { name: 'Red', hex: '#FFADAD' },
  { name: 'Orange', hex: '#FFD6A5' },
  { name: 'Yellow', hex: '#FDFFB6' },
  { name: 'Green', hex: '#CAFFBF' },
  { name: 'Blue', hex: '#9BF6FF' },
  { name: 'Indigo', hex: '#A0C4FF' },
  { name: 'Purple', hex: '#BDB2FF' },
  { name: 'Pink', hex: '#FFC6FF' },
];

// Time grid hour labels from 6 AM to 11 PM
export const HOURS = Array.from({ length: 18 }, (_, i) => {
  const h = i + 6;
  return h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;
});

// Time block intervals in minutes (every 10 mins)
export const INTERVALS = [0, 10, 20, 30, 40, 50];

// Days of the week labels
export const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
