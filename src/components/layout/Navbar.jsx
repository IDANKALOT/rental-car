import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Logo from '../common/Logo';
import { langOptions, langNames } from '../../data/translations';

export default function Navbar() {
  const { t, view, navigate, lang, setLang, user, logout } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
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
      background: scrolled ? 'rgba(12,12,12,0.97)' : 'rgba(12,12,12,0.55)',
      backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      borderBottom: scrolled ? '1px solid rgba(200,150,60,0.18)' : '1px solid transparent',
      transition: 'background 0.4s ease, border-color 0.4s ease',
      padding: '0 5%',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
        <Logo onClick={() => navigate('home')} />

        {/* Desktop links */}
        <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {navItems.map((it) => (
            <a key={it.k} className="nav-link sans" href="#" onClick={(e) => { e.preventDefault(); navigate(it.k); }}
              style={{ color: view === it.k ? 'var(--gold)' : 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: 14, fontWeight: 500, letterSpacing: '0.3px' }}>
              {it.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* User / Login */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button className="cta-btn sans" onClick={() => navigate('account')}
                style={{ background: 'rgba(200,150,60,0.18)', border: '1px solid var(--gold)', color: 'var(--gold)', borderRadius: 10, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                👤 {user.name.split(' ')[0]}
              </button>
              <button className="sans" onClick={() => { logout(); navigate('home'); }} title={t.nav.logout}
                style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: 'white', borderRadius: 10, padding: '7px 10px', fontSize: 13, cursor: 'pointer' }}>
                ⏻
              </button>
            </div>
          ) : (
            <button className="cta-btn sans" onClick={() => navigate('login')}
              style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', border: 'none', color: '#0f0f0f', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              {t.nav.login}
            </button>
          )}

          {/* Language selector */}
          <div style={{ position: 'relative' }}>
            <button className="lang-trigger sans" onClick={() => setLangOpen((o) => !o)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', color: 'white', borderRadius: 10, padding: '7px 10px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              <span style={{ fontSize: 15 }}>{langNames[lang].flag}</span>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{lang}</span>
              <span style={{ fontSize: 9, opacity: 0.6, transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
            </button>

            {langOpen && (
              <>
                <div onClick={() => setLangOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 1 }} />
                <div className="lang-menu glass-dark" style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 2, borderRadius: 14, padding: 6, minWidth: 170, boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
                  {langOptions.map((l) => (
                    <button key={l} className="sans lang-item" onClick={() => { setLang(l); setLangOpen(false); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', background: lang === l ? 'rgba(200,150,60,0.2)' : 'transparent', border: 'none', color: lang === l ? 'var(--gold)' : 'rgba(255,255,255,0.8)', borderRadius: 9, padding: '9px 12px', fontSize: 14, fontWeight: lang === l ? 600 : 400, cursor: 'pointer', textAlign: 'left' }}>
                      <span style={{ fontSize: 17 }}>{langNames[l].flag}</span>
                      <span style={{ flex: 1 }}>{langNames[l].label}</span>
                      {lang === l && <span style={{ fontSize: 12 }}>✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="hide-desktop" onClick={() => setMobileOpen((o) => !o)}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 18 }}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass-dark" style={{ padding: '16px 5% 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {navItems.map((it) => (
            <a key={it.k} href="#" className="sans" onClick={(e) => { e.preventDefault(); navigate(it.k); setMobileOpen(false); }}
              style={{ display: 'block', color: view === it.k ? 'var(--gold)' : 'rgba(255,255,255,0.8)', padding: '12px 0', fontSize: 16, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {it.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
