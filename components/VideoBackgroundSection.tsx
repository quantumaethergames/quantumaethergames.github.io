"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // or 'next/router' if using pages directory
import Image from "next/image";

export default function VideoBackgroundSection() {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === '0mnivore') {
            router.push('/game');
        } else {
            setError('Incorrect password. Try again.');
            setPassword('');
        }
    };

    return (
        <>
            <section className="video-background-section">
                {/* Video Background */}
                <div className="video-wrapper">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        src="/videos/cinematic.mp4"
                    />
                </div>

                {/* Overlay Content */}         {/* Try Demo Button */}
                                                               <button
                                                                   onClick={() => setShowPasswordModal(true)}
                                                                   className="demo-button"
                                                               >
                                                                   Private Demo
                                                               </button>
                <div className="overlay">
                    <div className="overlay-content">
                        <h2 className="overlay-title">Imagining Post-Colonial Worlds</h2>

                        <div className="logo-container">
                            <img
                                src="/img/Logo-4k-v3.png"
                                alt="Logo"
                                width={400}
                                height={400}
                                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.7))" }}
                            />
                        </div>

                        <iframe
                            src="https://store.steampowered.com/widget/3221630/"
                            width="646"
                            height="190"
                            className="overlay-iframe"
                            title="Steam"
                        />

                                 {/* Try Demo Button */}
                                                <button
                                                    onClick={() => setShowPasswordModal(true)}
                                                    className="demo-button"
                                                >
                                                    Try Private Demo
                                                </button>
                    </div>
                </div>
            </section>

            {/* Password Modal */}
            {showPasswordModal && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8"
                    onClick={() => {
                        setShowPasswordModal(false);
                        setPassword('');
                        setError('');
                    }}
                >
                    <div
                        className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full p-8"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Enter Demo Password</h2>
                        <p className="text-slate-400 mb-6 text-sm">This demo is password protected</p>

                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="Enter password"
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                    autoFocus
                                />
                                {error && (
                                    <p className="text-red-400 text-sm mt-2">{error}</p>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-all"
                                >
                                    Enter Demo
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPasswordModal(false);
                                        setPassword('');
                                        setError('');
                                    }}
                                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}