"use client";

import { useRef, useState } from 'react';

type Props = { src: string; poster?: string };

export default function TrailerPlayer({ src, poster }: Props) {
    const ref = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);

    const toggle = () => {
        const v = ref.current;
        if (!v) return;
        if (v.paused) v.play();
        else v.pause();
    };

    return (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-700 bg-black">
            <video
                ref={ref}
                src={src}
                poster={poster}
                preload="metadata"
                playsInline
                onClick={toggle}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                className="w-full h-full object-contain cursor-pointer"
            />
            <button
                type="button"
                onClick={toggle}
                aria-label={playing ? 'Pause trailer' : 'Play trailer'}
                className={
                    playing
                        ? 'absolute bottom-3 left-3 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900/90 text-white flex items-center justify-center transition'
                        : 'absolute inset-0 m-auto w-16 h-16 rounded-full bg-slate-900/70 hover:bg-slate-900/90 text-white flex items-center justify-center transition'
                }
            >
                {playing ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                ) : (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                    </svg>
                )}
            </button>
        </div>
    );
}