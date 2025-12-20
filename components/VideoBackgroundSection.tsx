import Image from "next/image";

export default function VideoBackgroundSection() {
    return (
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

            {/* Overlay Content */}
            <div className="overlay">
                <div className="overlay-content">
                    <h2 className="overlay-title">Imagining Post-Colonial Worlds</h2>

                    <div className="logo-container">
                        <Image
                            src="/img/Logo-4k-v3.png"
                            alt="Logo"
                            width={400}
                            height={400}
                            priority
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
                </div>
            </div>
        </section>
    );
}
