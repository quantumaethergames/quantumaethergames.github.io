"use client";

import { useState } from 'react';

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
            <section className="relative min-h-screen w-full overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 w-full h-full">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        src="/videos/cinematic.mp4"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Overlay Content */}
                <div className="relative z-10 bg-black/50 min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
                    <div className="w-full max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white px-4">
                            Imagining Post-Colonial Worlds
                        </h2>

                        <div className="flex justify-center px-4">
                            <img
                                src="/img/Logo-4k-v3.png"
                                alt="Logo"
                                className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
                                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.7))" }}
                            />
                        </div>

                        {/* Steam Widget - Hidden on small mobile */}
                        <div className="hidden sm:flex justify-center px-4">
                            <iframe
                                src="https://store.steampowered.com/widget/3221630/"
                                width="646"
                                height="190"
                                className="w-full max-w-2xl rounded-lg shadow-xl"
                                title="Steam"
                            />
                        </div>

                        {/* Mobile-friendly Steam link for small screens */}
                        <div className="sm:hidden px-4">
                            <a
                                href="https://store.steampowered.com/app/3221630/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full max-w-sm px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all"
                            >
                                View on Steam
                            </a>
                        </div>

                        {/* Demo Button */}
                        <button
                            onClick={() => setShowPasswordModal(true)}
                            className="w-full max-w-sm mx-auto px-6 py-4 sm:px-8 sm:py-4 bg-cyan-600 hover:bg-cyan-500 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
                        >
                            Try Private Demo
                        </button>
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