"use client";

import { useEffect, useRef, useState } from 'react';

type Props = { src: string; poster?: string };

type FsElement = HTMLDivElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
};
type FsDocument = Document & {
    webkitFullscreenElement?: Element | null;
    webkitExitFullscreen?: () => Promise<void> | void;
};
type FsVideo = HTMLVideoElement & {
    webkitEnterFullscreen?: () => void;
};

const iconBtn =
    'absolute bottom-3 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900/90 text-white flex items-center justify-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300';

export default function TrailerPlayer({ src, poster }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const onChange = () => {
            const d = document as FsDocument;
            setIsFullscreen(Boolean(d.fullscreenElement || d.webkitFullscreenElement));
        };
        document.addEventListener('fullscreenchange', onChange);
        document.addEventListener('webkitfullscreenchange', onChange);
        return () => {
            document.removeEventListener('fullscreenchange', onChange);
            document.removeEventListener('webkitfullscreenchange', onChange);
        };
    }, []);

    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) v.play();
        else v.pause();
    };

    const toggleFullscreen = () => {
        const wrap = wrapRef.current as FsElement | null;
        const video = videoRef.current as FsVideo | null;
        const d = document as FsDocument;
        if (!wrap || !video) return;

        if (d.fullscreenElement || d.webkitFullscreenElement) {
            if (d.exitFullscreen) d.exitFullscreen();
            else d.webkitExitFullscreen?.();
        } else if (wrap.requestFullscreen) {
            wrap.requestFullscreen();
        } else if (wrap.webkitRequestFullscreen) {
            wrap.webkitRequestFullscreen();
        } else if (video.webkitEnterFullscreen) {
            // iPhone Safari only allows fullscreen on the video element itself
            video.webkitEnterFullscreen();
        }
    };

    return (
        <div
            ref={wrapRef}
            className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-700 bg-black"
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                preload="metadata"
                playsInline
                onClick={togglePlay}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                className="w-full h-full object-contain cursor-pointer"
            />

            {/* Play / pause */}
            <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? 'Pause trailer' : 'Play trailer'}
                className={
                    playing
                        ? `${iconBtn} left-3`
                        : 'absolute inset-0 m-auto w-16 h-16 rounded-full bg-slate-900/70 hover:bg-slate-900/90 text-white flex items-center justify-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300'
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

            {/* Full screen */}
            <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit full screen' : 'Full screen'}
                className={`${iconBtn} right-3`}
            >
                {isFullscreen ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
                    </svg>
                ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                    </svg>
                )}
            </button>
        </div>
    );
}