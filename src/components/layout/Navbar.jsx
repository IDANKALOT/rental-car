import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Logo from '../common/Logo';
import { langOptions, langNames } from '../../data/translations';

export default function Navbar() {
  const { t, view, navigate, lang, setLang, user, logout } = useApp();
  const [scrolled, setScrolled]   = useState(false);
  const [langOpen, setLangOpen]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navItems = [
    { k: 'home',         label: t.nav.home },
    { k: 'cars',         label: t.nav.cars },
    { k: 'destinations', label: t.nav.destinations },
    { k: 'contact',      label: t.nav.contact },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(10,10,11,0.97)' : 'rgba(10,10,11,0.45)',
      backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
      borderBottom: scrolled ? '1px solid rgba(200,150,60,0.14)' : '1px solid transparent',
      transition: 'background 0.4s ease, border-color 0.4s ease',
      padding: '0 5%',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <Logo onClick={() => navigate('home')} />

        {/* Desktop nav */}
        <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {navItems.map((it) => (
            <a
              key={it.k}
              href="#"
              className={`nav-link sans${view === it.k ? ' active' : ''}`}
              onClick={(e) => { e.preventDefault(); navigate(it.k); }}
              style={{
                color: view === it.k ? 'var(--gold)' : 'rgba(255,255,255,0.65)',
                textDecoration: 'none', fontSize: 13, fontWeight: view === it.k ? 600 : 400,
                letterSpacing: '0.3px',
              }}
            >
              {it.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* User / Login */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                className="cta-btn sans"
                onClick={() => navigate('account')}
                style={{ background: 'rgba(200,150,60,0.12)', border: '1px solid rgba(200,150,60,0.3)', color: 'var(--gold)', borderRadius: 'var(--r)', padding: '7px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                {user.name.split(' ')[0]}
              </button>
              <button
                className="sans"
                onClick={() => { logout(); navigate('home'); }}
                title={t.nav.logout}
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)', borderRadius: 'var(--r)', padding: '7px 12px', fontSize: 12, cursor: 'pointer' }}
              >
                {t.nav.logout}
              </button>
            </div>
          ) : (
            <button
              className="cta-btn sans"
              onClick={() => navigate('login')}
              style={{ background: 'var(--gold)', border: 'none', color: '#0f0f10', borderRadius: 'var(--r)', padding: '8px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
            >
              {t.nav.login}
            </button>
          )}

          {/* Language selector */}
          <div style={{ position: 'relative' }}>
            <button
              className="lang-trigger sans"
              onClick={() => setLangOpen((o) => !o)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'white', borderRadius: 'var(--r)', padding: '7px 11px', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.5px' }}
            >
              <span style={{ fontSize: 15 }}>{langNames[lang].flag}</span>
              <span style={{ textTransform: 'uppercase' }}>{lang}</span>
              <span style={{ fontSize: 8, opacity: 0.5, transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
            </button>

            {langOpen && (
              <>
                <div onClick={() => setLangOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 1 }} />
                <div className="lang-menu glass-dark" style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 2, borderRadius: 'var(--r-lg)', padding: 6, minWidth: 170, boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}>
                  {langOptions.map((l) => (
                    <button
                      key={l}
                      className="sans lang-item"
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', background: lang === l ? 'rgba(200,150,60,0.15)' : 'transparent', border: 'none', color: lang === l ? 'var(--gold)' : 'rgba(255,255,255,0.75)', borderRadius: 10, padding: '9px 12px', fontSize: 14, fontWeight: lang === l ? 600 : 400, cursor: 'pointer', textAlign: 'left' }}
                    >
                      <span style={{ fontSize: 16 }}>{langNames[l].flag}</span>
                      <span style={{ flex: 1 }}>{langNames[l].label}</span>
                      {lang === l && <span style={{ fontSize: 12, color: 'var(--gold)' }}>✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="hide-desktop"
            onClick={() => setMobileOpen((o) => !o)}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.18)', color: 'white', borderRadius: 'var(--r)', padding: '6px 11px', cursor: 'pointer', fontSize: 16 }}
          >
            {mobileOpen ? '✕' : '≡'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass-dark" style={{ padding: '14px 5% 20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {navItems.map((it) => (
            <a
              key={it.k}
              href="#"
              className="sans"
              onClick={(e) => { e.preventDefault(); navigate(it.k); setMobileOpen(false); }}
              style={{ display: 'block', color: view === it.k ? 'var(--gold)' : 'rgba(255,255,255,0.75)', padding: '13px 0', fontSize: 16, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)', letterSpacing: '0.3px' }}
            >
              {it.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
