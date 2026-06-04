import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function AdminLogin() {
  const { loginAdmin, navigate } = useApp();
  const [f, setF]       = useState({ email: '', password: '' });
  const [err, setErr]   = useState('');
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit() {
    setErr('');
    setLoading(true);
    const res = await loginAdmin(f.email, f.password);
    if (res.success) navigate('admin');
    else setErr(res.error || 'Adgang nægtet.');
    setLoading(false);
  }

  return (
    <section style={{ padding: '140px 5% 80px', background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1209 60%, #0f0f0f 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: 420, margin: '0 auto', width: '100%' }}>
        <div className="glass animate-fadeInScale" style={{ borderRadius: 24, padding: 36 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🔧</div>
            <span className="sans" style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700 }}>Administration</span>
            <h2 style={{ color: 'white', fontSize: 26, fontWeight: 700, marginTop: 8 }}>Admin login</h2>
            <p className="sans" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, marginTop: 6 }}>Administrér bilflåden</p>
          </div>
          {['email', 'password'].map((key) => (
            <div key={key} style={{ marginBottom: 14 }}>
              <label className="sans" style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: 10, marginBottom: 6, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                {key === 'email' ? 'E-mail' : 'Adgangskode'}
              </label>
              <input type={key} className="inp sans" value={f[key]} onChange={set(key)} onKeyDown={(e) => e.key === 'Enter' && submit()} style={{ width: '100%' }} />
            </div>
          ))}
          {err && <p className="sans" style={{ color: '#f87171', fontSize: 13, marginBottom: 10 }}>{err}</p>}
          <button className="btn-primary sans" onClick={submit} disabled={loading}
            style={{ width: '100%', padding: 14, marginTop: 6, opacity: loading ? 0.7 : 1 }}>
            {loading ? '⏳ Logger ind...' : 'Log ind'}
          </button>
          <p className="sans" style={{ color: 'rgba(255,255,255,0.22)', fontSize: 11, textAlign: 'center', marginTop: 14 }}>
            Demo: brug en hvilken som helst e-mail og adgangskode
          </p>
        </div>
      </div>
    </section>
  );
}
