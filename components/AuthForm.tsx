
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig.ts';

export const AuthForm: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (err: any) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-dark-950">
            <div className="w-full max-w-md bg-dark-900 border border-dark-800 rounded-3xl p-10 shadow-2xl animate-fadeIn">
                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-bold mb-3 text-white tracking-tight italic">DAILY PLANNER</h2>
                    <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">
                        {isLogin ? 'Welcome back' : 'Join the elite'}
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-dark-800 border border-dark-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent transition-all placeholder-neutral-600"
                        placeholder="Email"
                        required
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-dark-800 border border-dark-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent transition-all placeholder-neutral-600"
                        placeholder="Password"
                        required
                    />
                    {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all active:scale-95 disabled:opacity-50"
                    >
                        {loading ? '...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>
                
                <div className="mt-8 text-center">
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-xs text-neutral-500 hover:text-white transition-colors font-bold uppercase tracking-widest"
                    >
                        {isLogin ? "Create an account" : "I have an account"}
                    </button>
                </div>
            </div>
        </div>
    );
};
