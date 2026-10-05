import type { Metadata } from 'next';
import FixedVideoBackground from '../../components/FixedVideoBackground';
import { CONTACT_EMAIL } from '../../data/roles';

// Unlisted page: not linked anywhere on the site, and hidden from search engines.
export const metadata: Metadata = {
    title: 'Production overview | omnivoOres Rule',
    robots: { index: false, follow: false, nocache: true },
};

// ---- EDIT THESE ----
const PDF_PATH = '/pdf/Omnivores_Rule_Production_One_Pager.pdf';
const PREVIEW_PATH = '/img/production-one-pager-preview.jpg';   // file in /public/img
const NOTION_URL = 'https://app.notion.com/p/connortwall/Omnivores-Rule-Game-Design-Document-External-Oct-2026-3e418bca5827806a9112f3fdf5cb5ea3?source=copy_link';  // paste your Notion share link here; the Notion card stays hidden while empty
// --------------------

const font = 'system-ui, -apple-system, "Segoe UI", sans-serif';
const TITLE_FONT_BASE = '/fonts/baron/baron-neue.regular';
const TITLE_FONT = '"Baron Neue", system-ui, -apple-system, "Segoe UI", sans-serif';

const card: React.CSSProperties = {
    background: 'rgba(15, 23, 42, 0.82)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    border: '1px solid #334155',
    borderRadius: 12,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
};

const h2: React.CSSProperties = {
    margin: 0,
    fontFamily: TITLE_FONT,
    fontSize: 22,
    fontWeight: 700,
    color: '#f1f5f9',
    textDecoration: 'underline',
    textDecorationThickness: '2px',
    textUnderlineOffset: '5px',
};

const primaryBtn: React.CSSProperties = {
    background: '#e2e8f0', color: '#0f172a', padding: '10px 18px', borderRadius: 8,
    fontWeight: 600, fontSize: 14, textDecoration: 'none',
};
const outlineBtn: React.CSSProperties = {
    border: '1px solid #64748b', color: '#e2e8f0', padding: '10px 18px', borderRadius: 8,
    fontSize: 14, textDecoration: 'none',
};

export default function ProductionBriefPage() {
    return (
        <main style={{ position: 'relative', minHeight: '100vh', fontFamily: font, color: '#e2e8f0' }}>
            <style>{`
        @font-face {
          font-family: 'Baron Neue';
          src: url('${TITLE_FONT_BASE}.woff2') format('woff2'),
               url('${TITLE_FONT_BASE}.woff') format('woff'),
               url('${TITLE_FONT_BASE}.ttf') format('truetype');
          font-weight: 100 900;
          font-display: swap;
        }
        .qag-prev:hover { border-color: #94a3b8 !important; }
        a:focus-visible { outline: 2px solid #93c5fd; outline-offset: 2px; }
      `}</style>

            <FixedVideoBackground />

            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    maxWidth: 820,
                    margin: '0 auto',
                    padding: '56px 16px 72px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                }}
            >
                <header style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8' }}>
            Quantum Aether Games
          </span>
                    <h1 style={{ margin: 0, fontFamily: TITLE_FONT, fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 700, color: '#f8fafc', lineHeight: 1.1 }}>
                        omnivOres Rule: Production overview
                    </h1>
                    <p style={{ margin: 0, lineHeight: 1.6, color: '#cbd5e1', fontSize: 16 }}>
                        Check out these resources for production details.
                    </p>
                </header>

                <section style={card} aria-labelledby="onepager-title">
                    <h2 id="onepager-title" style={h2}>Production one-pager</h2>
                    <p style={{ margin: 0, lineHeight: 1.6, color: '#cbd5e1' }}>
                        One page covering the game, the production timeline, and the team structure.
                    </p>
                    <a href={PDF_PATH} target="_blank" rel="noopener noreferrer" aria-label="Open the production one-pager PDF">
                        <img
                            className="qag-prev"
                            src={PREVIEW_PATH}
                            alt="Preview of the Omnivores Rule production one-pager PDF"
                            loading="lazy"
                            style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 8, border: '1px solid #334155', background: '#fff' }}
                        />
                    </a>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        <a href={PDF_PATH} target="_blank" rel="noopener noreferrer" style={primaryBtn}>Open PDF</a>
                        <a href={PDF_PATH} download style={outlineBtn}>Download</a>
                    </div>
                </section>

                {NOTION_URL && (
                    <section style={card} aria-labelledby="notion-title">
                        <h2 id="notion-title" style={h2}>Abbreviated Game Design Document</h2>
                        <p style={{ margin: 0, lineHeight: 1.6, color: '#cbd5e1' }}>
                            Summary of production timeline, game design, visuals, etc.
                        </p>
                        <div>
                            <a href={NOTION_URL} target="_blank" rel="noopener noreferrer" style={{ ...primaryBtn, display: 'inline-block' }}>
                                Open in Notion/Web
                            </a>
                        </div>
                    </section>
                )}

                <footer style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, fontSize: 14, color: '#94a3b8' }}>
          <span>
            Questions? Email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#93c5fd' }}>{CONTACT_EMAIL}</a>
          </span>
                    <a href="/" style={{ color: '#93c5fd' }}>Back to site</a>
                </footer>
            </div>
        </main>
    );
}