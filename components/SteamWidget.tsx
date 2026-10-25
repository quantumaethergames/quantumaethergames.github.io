"use client";

import { useEffect, useRef, useState } from 'react';

// Steam's widget is a fixed 646x190 design. On narrow screens we scale the whole
// thing down (instead of hiding it) so the wishlist UI looks the same, just smaller.
const WIDGET_W = 646;
const WIDGET_H = 190;

type Props = { appId?: string };

export default function SteamWidget({ appId = '3221630' }: Props) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const update = () => setScale(Math.min(1, el.clientWidth / WIDGET_W));
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return (
        <div ref={wrapRef} className="w-full max-w-2xl mx-auto">
            {/* Box takes the scaled size so layout below doesn't leave a gap */}
            <div style={{ width: WIDGET_W * scale, height: WIDGET_H * scale, margin: '0 auto' }}>
                <iframe
                    src={`https://store.steampowered.com/widget/${appId}/`}
                    width={WIDGET_W}
                    height={WIDGET_H}
                    title="Steam"
                    className="rounded-lg shadow-xl border-0"
                    style={{
                        width: WIDGET_W,
                        height: WIDGET_H,
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                    }}
                />
            </div>
        </div>
    );
}