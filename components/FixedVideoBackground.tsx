"use client";

// Full-screen video that stays put while the page scrolls over it.
// Change the video, dimming, or fit here without touching the page content.

type Props = {
    src?: string;
    dim?: number; // 0 = no dimming, 1 = black
};

export default function FixedVideoBackground({ src = '/videos/cinematic.mp4', dim = 0.5 }: Props) {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
            <video
                autoPlay
                muted
                loop
                playsInline
                src={src}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ backgroundColor: `rgba(0, 0, 0, ${dim})` }} />
        </div>
    );
}