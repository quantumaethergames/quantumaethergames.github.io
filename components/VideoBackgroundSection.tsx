"use client";

import { useState } from 'react';
import JobPostingToggle from './JobPostingToggle';
import FixedVideoBackground from './FixedVideoBackground';
import TrailerPlayer from './TrailerPlayer';
import SteamWidget from './SteamWidget';

const SHOW_DEMO = process.env.NEXT_PUBLIC_SHOW_DEMO === 'true';
const PRESS_KIT_URL =
    'https://drive.google.com/drive/folders/1fi3LLX8VNoJErcJmpGym8Gu0c1HudtcT?usp=drive_link';

export default function VideoBackgroundSection() {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handlePasswordSubmit = () => {
        if (password === '0mnivore') {
            // Navigate to the game page
            window.location.href = '/game';
        } else {
            setError('Incorrect password. Try again.');
            setPassword('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handlePasswordSubmit();
        }
    };

    return (
        <>
            <section className="relative min-h-screen w-full">
                {/* Video Background (fixed, doesn't scroll) */}
                <FixedVideoBackground />

                {/* Overlay Content */}
                <div className="relative z-10 min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 md:px-8">
                    <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center gap-4 sm:gap-5">
                        {/* 1. Title */}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white px-4 mb-6 sm:mb-10">
                            Imagining Post-Colonial Worlds
                        </h2>

                        {/* 2. Trailer */}
                        <div className="px-4 w-full">
                            <div className="w-full max-w-3xl mx-auto text-left rounded-xl border border-slate-700 bg-slate-900/80 backdrop-blur-sm p-4 sm:p-5 space-y-3">
                                <h3
                                    className="text-xl font-bold text-slate-100 underline decoration-2 underline-offset-[5px] text-center"
                                    style={{ fontFamily: '"Baron Neue", system-ui, -apple-system, "Segoe UI", sans-serif' }}
                                >
                                    Trailer (Sept 2026)
                                </h3>
                                <TrailerPlayer src="/videos/trailer.mp4" poster="/img/trailer-poster.jpg" />
                            </div>
                        </div>

                        {/* 3. Steam widget (scales down on mobile) */}
                        <div className="px-4 w-full">
                            <SteamWidget />
                        </div>

                        {/* Demo Button (toggle with NEXT_PUBLIC_SHOW_DEMO in .env.local) */}
                        {SHOW_DEMO && (
                            <button
                                onClick={() => setShowPasswordModal(true)}
                                className="w-full max-w-sm mx-auto px-6 py-4 sm:px-8 sm:py-4 bg-cyan-600 hover:bg-cyan-500 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
                            >
                                Try Private Demo
                            </button>
                        )}

                        {/* 4. Open roles (bigger gap above) */}
                        <div className="px-4 w-full mt-8 sm:mt-12">
                            <JobPostingToggle>
                                <a
                                    href={PRESS_KIT_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-6 py-3 rounded-full font-semibold text-[15px] text-slate-200 border border-slate-400 bg-slate-900/60 hover:bg-slate-900/80 transition-colors no-underline"
                                >
                                    Press kit
                                </a>
                            </JobPostingToggle>
                        </div>

                        {/* 5. Logo at the foot of the page (biggest gap above) */}
                        <div className="flex justify-center px-4 mt-12 sm:mt-20 pb-6">
                            <img
                                src="/img/Logo-4k-v3.png"
                                alt="Logo"
                                className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
                                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.7))" }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Password Modal */}
            {showPasswordModal && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 sm:p-8"
                    onClick={() => {
                        setShowPasswordModal(false);
                        setPassword('');
                        setError('');
                    }}
                >
                    <div
                        className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full p-6 sm:p-8"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-2">
                            Enter Demo Password
                        </h2>
                        <p className="text-slate-400 mb-6 text-sm">
                            This demo is password protected
                        </p>

                        <div className="space-y-4">
                            <div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter password"
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-base"
                                    autoFocus
                                />
                                {error && (
                                    <p className="text-red-400 text-sm mt-2">{error}</p>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handlePasswordSubmit}
                                    className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-semibold rounded-xl transition-all"
                                >
                                    Enter Demo
                                </button>
                                <button
                                    onClick={() => {
                                        setShowPasswordModal(false);
                                        setPassword('');
                                        setError('');
                                    }}
                                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-300 font-semibold rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}