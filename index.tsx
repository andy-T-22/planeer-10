
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebaseConfig.ts';
import App from './App.tsx';
import { AuthForm } from './components/AuthForm.tsx';

const RootApp: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-900">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-neutral-500 text-xs font-bold tracking-widest uppercase">Initializing</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {user ? <App user={user} /> : <AuthForm />}
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<RootApp />);
}
