'use client';

import { useRef, useState, type ReactNode } from 'react';
import { roles as allRoles, CONTACT_EMAIL, PROJECT_BLURB, type Role } from '../data/roles';

// roles marked draft: true in roles.ts are hidden
const roles = allRoles.filter((r) => !r.draft);

const font = 'system-ui, -apple-system, "Segoe UI", sans-serif';

// Title font. Put the file in public/fonts/ and set its exact filename here.
const TITLE_FONT_FILE = '/fonts/BaronNeue.otf';
const TITLE_FONT = '"Baron Neue", system-ui, -apple-system, "Segoe UI", sans-serif';
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

function mailtoFor(role: Role) {
    const subject = encodeURIComponent(`Application: ${role.title}`);
    const body = encodeURIComponent(role.emailBody ?? `Hi,\n\nI'm applying for the ${role.title} role.\n\n`);
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

/** Smoothly animates height (0 -> auto) and fades content in/out. */
function Collapse({ open, children, ms = 400 }: { open: boolean; children: ReactNode; ms?: number }) {
    return (
        <div
            className="qag-collapse"
            style={{
                display: 'grid',
                gridTemplateRows: open ? '1fr' : '0fr',
                opacity: open ? 1 : 0,
                // hides collapsed content from keyboard/screen readers once the close animation ends
                visibility: open ? 'visible' : 'hidden',
                transition: `grid-template-rows ${ms}ms ${EASE}, opacity ${ms}ms ${EASE}, visibility 0s linear ${open ? 0 : ms}ms`,
            }}
        >
            <div style={{ overflow: 'hidden', minHeight: 0 }}>{children}</div>
        </div>
    );
}

const heading: React.CSSProperties = {
    margin: '0 0 10px',
    fontSize: 20,
    fontFamily: TITLE_FONT,
    fontWeight: 700,
    color: '#f1f5f9',
    textDecoration: 'underline',
    textDecorationThickness: '2px',
    textUnderlineOffset: '5px',
};
const list: React.CSSProperties = {
    margin: 0,
    paddingLeft: 22,
    listStyleType: 'disc',
    listStylePosition: 'outside',
    lineHeight: 1.6,
    color: '#e2e8f0',
};
const outlineBtn: React.CSSProperties = {
    border: '1px solid #475569', color: '#e2e8f0', padding: '10px 16px', borderRadius: 8, fontSize: 14, textDecoration: 'none',
};

function Section({ title, items, note }: { title: string; items: string[]; note?: string }) {
    return (
        <div>
            <h4 style={heading}>{title}</h4>
            <ul style={list}>
                {items.map((item) => (
                    <li key={item} style={{ marginBottom: 6 }}>{item}</li>
                ))}
            </ul>
            {note && <p style={{ margin: '8px 0 0', color: '#94a3b8', fontSize: 14 }}>{note}</p>}
        </div>
    );
}

function Chevron({ open }: { open: boolean }) {
    return (
        <svg
            width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"
            style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: `transform 300ms ${EASE}` }}
        >
            <path d="M5 7.5l5 5 5-5" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function RoleCard({ role, expanded, onToggle }: { role: Role; expanded: boolean; onToggle: () => void }) {
    return (
        <article
            style={{
                border: `1px solid ${expanded ? '#64748b' : '#334155'}`,
                borderRadius: 10,
                background: 'rgba(15, 23, 42, 0.82)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                overflow: 'hidden',
                transition: `border-color 300ms ${EASE}`,
            }}
        >
            <button
                type="button"
                className="qag-card-header"
                onClick={onToggle}
                aria-expanded={expanded}
                aria-controls={`role-${role.id}`}
                style={{ all: 'unset', boxSizing: 'border-box', display: 'block', width: '100%', padding: 16, cursor: 'pointer', fontFamily: font }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 12, rowGap: 2, alignItems: 'baseline' }}>
                        <span style={{ fontFamily: TITLE_FONT, fontSize: 21, fontWeight: 700, color: '#f1f5f9' }}>{role.title}</span>
                        <span style={{ fontSize: 13, color: '#94a3b8' }}>{role.type}, {role.location}</span>
                    </div>
                    <Chevron open={expanded} />
                </div>
                <Collapse open={!expanded} ms={250}>
                    <p style={{ margin: '6px 0 0', color: '#94a3b8', lineHeight: 1.5, fontSize: 14 }}>{role.summary}</p>
                </Collapse>
            </button>

            <Collapse open={expanded} ms={450}>
                <div id={`role-${role.id}`} style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 18, fontSize: 15 }}>
                    <dl style={{ margin: 0, display: 'grid', gap: 6 }}>
                        {role.details.map((d) => (
                            <div key={d.label}>
                                <dt style={{ display: 'inline', fontWeight: 600, color: '#cbd5e1' }}>{d.label}: </dt>
                                <dd style={{ display: 'inline', margin: 0, color: '#e2e8f0' }}>{d.value}</dd>
                            </div>
                        ))}
                    </dl>

                    <div>
                        <h4 style={heading}>Overview</h4>
                        <p style={{ margin: 0, lineHeight: 1.6, color: '#e2e8f0' }}>{role.about}</p>
                    </div>

                    <Section title="Responsibilities" items={role.responsibilities} note={role.responsibilityNote} />
                    <Section title="Qualifications" items={role.requirements} />

                    <div>
                        <h4 style={heading}>How to apply</h4>
                        <p style={{ margin: 0, lineHeight: 1.6, color: '#e2e8f0' }}>{role.howToApply}</p>
                        {role.bonusQuestion && (
                            <p style={{ margin: '8px 0 0', lineHeight: 1.6, color: '#e2e8f0' }}>
                                <strong style={{ color: '#cbd5e1' }}>Bonus question:</strong> {role.bonusQuestion}
                            </p>
                        )}
                        {role.applyBy && (
                            <p style={{ margin: '8px 0 0', color: '#e2e8f0' }}>
                                <strong style={{ color: '#cbd5e1' }}>Applications due:</strong> {role.applyBy}
                            </p>
                        )}
                    </div>

                    <figure style={{ margin: 0 }}>
                        <img
                            src="/img/OmnivoresRule_ArmorDissolve_16x9.png"
                            alt="Gameplay screenshot: a skeletal android figure outlined in white floats before a large circular disc, beside a bare branching tree."
                            loading="lazy"
                            style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 8, border: '1px solid #334155' }}
                        />
                        <figcaption style={{ marginTop: 6, fontSize: 13, color: '#94a3b8' }}>
                            Gameplay screenshot: armor dissolve sequence
                        </figcaption>
                    </figure>

                    <div>
                        <h4 style={heading}>About the project</h4>
                        <p style={{ margin: 0, lineHeight: 1.6, color: '#e2e8f0' }}>{PROJECT_BLURB}</p>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        <a
                            href={mailtoFor(role)}
                            style={{ background: '#e2e8f0', color: '#0f172a', padding: '10px 16px', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
                        >
                            Apply by email
                        </a>
                        {role.links?.map((l) => (
                            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" style={outlineBtn}>
                                {l.label}
                            </a>
                        ))}
                        {role.pdf && (
                            <a href={role.pdf} target="_blank" rel="noopener noreferrer" style={outlineBtn}>
                                Open PDF
                            </a>
                        )}
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: '#94a3b8' }}>
                        Or email <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#93c5fd' }}>{CONTACT_EMAIL}</a> directly.
                    </p>
                </div>
            </Collapse>
        </article>
    );
}

export default function JobPostingToggle({ children }: { children?: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    const toggle = () => {
        const next = !open;
        setOpen(next);
        if (!next) setExpandedId(null);
        if (next) {
            // bring the button to the top of the screen so the roles are in view
            setTimeout(() => wrapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
        }
    };

    return (
        <div
            ref={wrapRef}
            style={{
                width: '100%',
                maxWidth: 720,
                margin: '0 auto',
                fontFamily: font,
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                scrollMarginTop: 24,
            }}
        >
            <style>{`
        @font-face {
          font-family: 'Baron Neue';
          src: url('${TITLE_FONT_FILE}');
          font-weight: 100 900;
          font-display: swap;
        }
        .qag-card-header:focus-visible, .qag-toggle:focus-visible { outline: 2px solid #93c5fd; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .qag-collapse, .qag-collapse * { transition: none !important; }
        }
      `}</style>

            <button
                type="button"
                className="qag-toggle"
                onClick={toggle}
                aria-expanded={open}
                aria-controls="open-roles"
                style={{
                    background: open ? 'rgba(15, 23, 42, 0.6)' : '#e2e8f0',
                    color: open ? '#e2e8f0' : '#0f172a',
                    border: open ? '1px solid #94a3b8' : '1px solid transparent',
                    padding: '12px 22px',
                    borderRadius: 999,
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: `background 300ms ${EASE}, color 300ms ${EASE}, border-color 300ms ${EASE}`,
                }}
            >
                {open ? 'Hide open roles' : `Now Hiring (${roles.length} open ${roles.length === 1 ? 'role' : 'roles'})`}
            </button>

            <div id="open-roles" style={{ width: '100%' }}>
                <Collapse open={open} ms={500}>
                    <div style={{ paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {roles.map((role) => (
                            <RoleCard
                                key={role.id}
                                role={role}
                                expanded={expandedId === role.id}
                                onToggle={() => setExpandedId(expandedId === role.id ? null : role.id)}
                            />
                        ))}
                    </div>
                </Collapse>
            </div>
        </div>
    );
}