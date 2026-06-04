import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Logo from '../components/common/Logo';
import { isSupabaseReady } from '../lib/supabase';

export default function LoginPage() {
  const { t, login, register, navigate } = useApp();
  const [mode, setMode]     = useState('login');
  const [f, setF]           = useState({ name: '', email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit() {
    setError('');
    setLoading(true);
    if (mode === 'login') {
      const res = await login(f.email, f.password);
      if (res.success) navigate('account');
      else setError(res.error || 'Noget gik galt. Prøv igen.');
    } else {
      const res = await register(f.name, f.email, f.password);
      if (res.success && res.needsConfirmation) setRegistered(true);
      else if (res.success) navigate('account');
      else setError(res.error || 'Kunne ikke oprette konto.');
    }
    setLoading(false);
  }

  function handleKey(e) { if (e.key === 'Enter') submit(); }

  const fields = [
    ...(mode === 'register' ? [{ key: 'name',     label: t.login.name,     type: 'text'     }] : []),
    { key: 'email',    label: t.login.email,    type: 'email'    },
    { key: 'password', label: t.login.password, type: 'password' },
  ];

  return (
    <section style={{ padding: '140px 5% 80px', background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1209 60%, #0f0f0f 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: 420, margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Logo light size="lg" onClick={() => navigate('home')} />
        </div>

        <div className="glass animate-fadeInScale" style={{ borderRadius: 24, padding: 36 }}>

          {/* Email confirmation message */}
          {registered ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 52, marginBottom: 14 }}>📧</div>
              <h3 style={{ color: 'white', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Bekræft din e-mail</h3>
              <p className="sans" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6 }}>
                Vi har sendt et bekræftelseslink til <strong style={{ color: 'var(--gold)' }}>{f.email}</strong>. Klik på linket og log derefter ind.
              </p>
              <button className="sans" onClick={() => { setRegistered(false); setMode('login'); }}
                style={{ marginTop: 20, background: 'none', border: 'none', color: 'var(--gold)', fontSize: 14, cursor: 'pointer' }}>
                → Gå til login
              </button>
            </div>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <span className="sans" style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700 }}>
                  {mode === 'login' ? t.pages.loginTitle : t.pages.register}
                </span>
                <h2 style={{ color: 'white', fontSize: 26, fontWeight: 700, marginTop: 8 }}>
                  {mode === 'login' ? t.pages.loginTitle : t.pages.register}
                </h2>
                <p className="sans" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 6 }}>{t.pages.loginSub}</p>
              </div>

              {fields.map(({ key, label, type }) => (
                <div key={key} style={{ marginBottom: 14 }}>
                  <label className="sans" style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: 10, marginBottom: 6, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{label}</label>
                  <input type={type} className="inp sans" value={f[key]} onChange={set(key)} onKeyDown={handleKey} style={{ width: '100%' }} />
                </div>
              ))}

              {error && (
                <div style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 12 }}>
                  <p className="sans" style={{ color: '#f87171', fontSize: 13 }}>{error}</p>
                </div>
              )}

              <button className="btn-primary sans" onClick={submit} disabled={loading}
                style={{ width: '100%', padding: '14px', marginTop: 8, fontSize: 15, opacity: loading ? 0.7 : 1 }}>
                {loading ? '⏳ Vent...' : (mode === 'login' ? t.login.submit : t.login.createSubmit)}
              </button>

              {!isSupabaseReady && (
                <p className="sans" style={{ color: 'rgba(255,255,255,0.22)', fontSize: 11, textAlign: 'center', marginTop: 12 }}>
                  {t.login.demo}
                </p>
              )}

              <button className="sans" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                style={{ width: '100%', background: 'none', border: 'none', color: 'var(--gold)', fontSize: 13, cursor: 'pointer', marginTop: 14, padding: '4px' }}>
                {mode === 'login' ? t.login.noAccount : t.login.haveAccount}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
