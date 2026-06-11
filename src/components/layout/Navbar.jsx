import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Logo from '../common/Logo';
import { langOptions, langNames } from '../../data/translations';

function Hamburger({ open, onClick }) {
  const line = (width, delay) => (
    <span style={{
      display: 'block',
      height: 1.5,
      width,
      background: 'white',
      borderRadius: 2,
      transition: 'transform 0.3s ease, opacity 0.3s ease, width 0.3s ease',
    }} />
  );
  return (
    <button
      onClick={onClick}
      aria-label="Menu"
      style={{
        background: 'none',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 10,
        padding: '9px 11px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        alignItems: 'flex-end',
      }}
    >
      <span style={{
        display: 'block', height: 1.5, width: open ? 20 : 22, background: 'white', borderRadius: 2,
        transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
        transition: 'transform 0.32s cubic-bezier(0.16,1,0.3,1), width 0.2s',
      }} />
      <span style={{
        display: 'block', height: 1.5, width: 16, background: 'white', borderRadius: 2,
        opacity: open ? 0 : 1,
        transition: 'opacity 0.2s',
      }} />
      <span style={{
        display: 'block', height: 1.5, width: open ? 20 : 22, background: 'white', borderRadius: 2,
        transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
        transition: 'transform 0.32s cubic-bezier(0.16,1,0.3,1), width 0.2s',
      }} />
    </button>
  );
}

export default function Navbar() {
  const { t, view, navigate, lang, setLang, user, logout } = useApp();
  const [scrolled, setScrolled]     = useState(false);
  const [langOpen, setLangOpen]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navItems = [
    { k: 'home',         label: t.nav.home },
    { k: 'cars',         label: t.nav.cars },
    { k: 'destinations', label: t.nav.destinations },
    { k: 'contact',      label: t.nav.contact },
  ];

  function goTo(page) {
    navigate(page);
    setMobileOpen(false);
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: mobileOpen ? 1001 : 1000,
        background: scrolled || mobileOpen ? 'rgba(10,10,11,0.98)' : 'rgba(10,10,11,0.45)',
        backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
        borderBottom: (scrolled && !mobileOpen) ? '1px solid rgba(200,150,60,0.14)' : '1px solid transparent',
        transition: 'background 0.4s, border-color 0.4s',
        padding: '0 5%',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <Logo onClick={() => goTo('home')} size="lg" />

          {/* Desktop nav links */}
          <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {navItems.map((it) => (
              <a key={it.k} href="#"
                className={`nav-link sans${view === it.k ? ' active' : ''}`}
                onClick={(e) => { e.preventDefault(); navigate(it.k); }}
                style={{
                  color: view === it.k ? 'var(--gold)' : 'rgba(255,255,255,0.65)',
                  textDecoration: 'none', fontSize: 13,
                  fontWeight: view === it.k ? 600 : 400,
                  letterSpacing: '0.3px',
                }}
              >
                {it.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* User / Login (desktop) */}
            <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {user ? (
                <>
                  <button className="cta-btn sans" onClick={() => navigate('account')}
                    style={{ background: 'rgba(200,150,60,0.12)', border: '1px solid rgba(200,150,60,0.28)', color: 'var(--gold)', borderRadius: 'var(--r)', padding: '7px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                    {user.name.split(' ')[0]}
                  </button>
                  <button className="sans" onClick={() => { logout(); navigate('home'); }}
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', borderRadius: 'var(--r)', padding: '7px 12px', fontSize: 12, cursor: 'pointer' }}>
                    {t.nav.logout}
                  </button>
                </>
              ) : (
                <button className="cta-btn sans" onClick={() => navigate('login')}
                  style={{ background: 'var(--gold)', border: 'none', color: '#0f0f10', borderRadius: 'var(--r)', padding: '8px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                  {t.nav.login}
                </button>
              )}
            </div>

            {/* Language selector (desktop) */}
            <div className="nav-links-desktop" style={{ position: 'relative' }}>
              <button className="lang-trigger sans" onClick={() => setLangOpen((o) => !o)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'white', borderRadius: 'var(--r)', padding: '7px 11px', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.5px' }}>
                <span style={{ fontSize: 15 }}>{langNames[lang].flag}</span>
                <span style={{ textTransform: 'uppercase' }}>{lang}</span>
                <span style={{ fontSize: 8, opacity: 0.5, transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
              </button>
              {langOpen && (
                <>
                  <div onClick={() => setLangOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 1 }} />
                  <div className="lang-menu glass-dark" style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 2, borderRadius: 'var(--r-lg)', padding: 6, minWidth: 170, boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}>
                    {langOptions.map((l) => (
                      <button key={l} className="sans lang-item" onClick={() => { setLang(l); setLangOpen(false); }}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', background: lang === l ? 'rgba(200,150,60,0.15)' : 'transparent', border: 'none', color: lang === l ? 'var(--gold)' : 'rgba(255,255,255,0.75)', borderRadius: 10, padding: '9px 12px', fontSize: 14, fontWeight: lang === l ? 600 : 400, cursor: 'pointer', textAlign: 'left' }}>
                        <span style={{ fontSize: 16 }}>{langNames[l].flag}</span>
                        <span style={{ flex: 1 }}>{langNames[l].label}</span>
                        {lang === l && <span style={{ color: 'var(--gold)' }}>✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <div className="hide-desktop">
              <Hamburger open={mobileOpen} onClick={() => setMobileOpen((o) => !o)} />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Full-screen mobile menu overlay ── */}
      {mobileOpen && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: '#0a0a0b',
            display: 'flex', flexDirection: 'column',
            padding: '0 7% 44px',
            overflowY: 'auto',
          }}
        >
          {/* Top spacer (behind navbar) */}
          <div style={{ height: 72, flexShrink: 0 }} />

          {/* Gold divider */}
          <div style={{ width: '100%', height: 1, background: 'rgba(200,150,60,0.18)', marginBottom: 48 }} />

          {/* Nav items — large typography */}
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>
            {navItems.map((it, i) => (
              <a
                key={it.k}
                href="#"
                className="mobile-menu-item"
                onClick={(e) => { e.preventDefault(); goTo(it.k); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  color: view === it.k ? 'var(--gold)' : 'white',
                  textDecoration: 'none',
                  fontSize: 'clamp(2rem, 8vw, 3rem)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  fontStyle: view === it.k ? 'italic' : 'normal',
                  padding: '18px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  animationDelay: `${i * 55 + 80}ms`,
                  transition: 'color 0.2s',
                }}
              >
                {it.label}
                <span style={{ fontSize: 20, opacity: view === it.k ? 1 : 0.18, color: view === it.k ? 'var(--gold)' : 'white' }}>→</span>
              </a>
            ))}
          </nav>

          {/* Bottom section */}
          <div style={{ paddingTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Login / account */}
            {user ? (
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="sans" onClick={() => goTo('account')}
                  style={{ flex: 1, background: 'rgba(200,150,60,0.12)', border: '1px solid rgba(200,150,60,0.28)', color: 'var(--gold)', borderRadius: 'var(--r)', padding: '14px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                  {user.name.split(' ')[0]} — {t.nav.account}
                </button>
                <button className="sans" onClick={() => { logout(); goTo('home'); }}
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', borderRadius: 'var(--r)', padding: '14px 18px', fontSize: 14, cursor: 'pointer' }}>
                  {t.nav.logout}
                </button>
              </div>
            ) : (
              <button className="btn-primary sans" onClick={() => goTo('login')}
                style={{ width: '100%', padding: 16, fontSize: 16, borderRadius: 'var(--r-lg)' }}>
                {t.nav.login} →
              </button>
            )}

            {/* Language picker */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {langOptions.map((l) => (
                <button key={l} className="sans" onClick={() => setLang(l)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    background: lang === l ? 'rgba(200,150,60,0.15)' : 'rgba(255,255,255,0.05)',
                    border: lang === l ? '1px solid rgba(200,150,60,0.35)' : '1px solid rgba(255,255,255,0.1)',
                    color: lang === l ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
                    borderRadius: 100, padding: '8px 14px', fontSize: 13,
                    fontWeight: lang === l ? 700 : 400, cursor: 'pointer',
                  }}>
                  <span style={{ fontSize: 16 }}>{langNames[l].flag}</span>
                  <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{l}</span>
                </button>
              ))}
            </div>

            {/* Contact strip */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="sans" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>
                Soluxe · Marbella
              </span>
              <span className="sans" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>
                +34 600 000 000
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
