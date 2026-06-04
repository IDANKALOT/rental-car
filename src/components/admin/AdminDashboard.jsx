import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, AVAILABILITY_STATES } from '../../data/cars';
import { DISCOUNT_CODES } from '../../data/extras';
import { AvailabilityBadge } from '../ui/Badge';

const EMOJI_CHOICES  = ['🚗','🚙','🏎️','🚐','✨','🚕','🛻','⚡'];
const COLOR_CHOICES  = ['#2563eb','#7c3aed','#db2777','#d97706','#059669','#0891b2','#dc2626','#0f172a'];
const emptyCar = { type: 'Economy', name: '', price: '', weeklyPrice: '', highSeasonPrice: '', emoji: '🚗', badge: '', color: '#2563eb', features: '', image: '', availability: 'available', featured: false };

function StatCard({ icon, label, value, sub, color = 'var(--gold)' }) {
  return (
    <div style={{ background: 'white', borderRadius: 16, padding: '20px 24px', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{icon}</div>
        <span className="sans" style={{ color: 'var(--muted)', fontSize: 13, fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, color: 'var(--dark)' }}>{value}</div>
      {sub && <div className="sans" style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Lf({ label, children, style = {} }) {
  return (
    <div style={{ marginBottom: 14, ...style }}>
      <label className="sans" style={{ display: 'block', color: 'var(--muted)', fontSize: 10, marginBottom: 6, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{label}</label>
      {children}
    </div>
  );
}

/* ── Overview Tab ────────────────────────────────────────────────────────────── */
function OverviewTab({ carList, bookings }) {
  const available   = carList.filter((c) => c.availability === 'available').length;
  const reserved    = carList.filter((c) => c.availability === 'reserved').length;
  const maintenance = carList.filter((c) => c.availability === 'maintenance').length;
  const revenue     = bookings.reduce((s, b) => s + (b.total || 0), 0);
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard icon="💰" label="Total omsætning"   value={`${revenue.toLocaleString()} kr`} sub={`${bookings.length} bookinger`} color="#16a34a" />
        <StatCard icon="🚗" label="Tilgængelige biler" value={available}   sub={`${carList.length} i alt`} />
        <StatCard icon="📅" label="Aktive reservationer" value={reserved} sub="Denne uge" color="#d97706" />
        <StatCard icon="⚙️" label="Under vedligeholdelse" value={maintenance} color="#dc2626" />
      </div>
      <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Seneste bookinger</h3>
        {bookings.length === 0 ? (
          <p className="sans" style={{ color: 'var(--muted)', textAlign: 'center', padding: '24px 0' }}>Ingen bookinger endnu.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {bookings.slice(0, 5).map((b) => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid #f4f4f0' }}>
                <span style={{ fontSize: 28 }}>{b.car?.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div className="sans" style={{ fontWeight: 600 }}>{b.car?.name}</div>
                  <div className="sans" style={{ color: 'var(--muted)', fontSize: 12 }}>{b.customer?.name || 'Kunde'} · {b.pickDate}</div>
                </div>
                <div className="sans" style={{ fontWeight: 700, color: '#16a34a' }}>{b.total} kr</div>
                <span className="sans" style={{ background: '#dcfce7', color: '#16a34a', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>✓ Bekræftet</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Fleet Tab ───────────────────────────────────────────────────────────────── */
function FleetTab({ carList, addCar, updateCar, deleteCar, setAvailability, toggleFeatured }) {
  const [form, setForm]         = useState(emptyCar);
  const [editingId, setEditingId] = useState(null);
  const [flash, setFlash]       = useState('');
  const [imgMode, setImgMode]   = useState('upload');
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  function flashMsg(m) { setFlash(m); setTimeout(() => setFlash(''), 3000); }
  function reset() { setForm(emptyCar); setEditingId(null); setImgMode('upload'); }

  function handleImg(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) { flashMsg('⚠️ Max 4 MB'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setForm((p) => ({ ...p, image: ev.target.result }));
    reader.readAsDataURL(file);
  }

  function save() {
    if (!form.name || !form.price) { flashMsg('⚠️ Navn og dagspris er påkrævet.'); return; }
    const payload = {
      ...form,
      price: Number(form.price),
      weeklyPrice: form.weeklyPrice ? Number(form.weeklyPrice) : null,
      highSeasonPrice: form.highSeasonPrice ? Number(form.highSeasonPrice) : null,
      badge: form.badge || form.type,
      features: typeof form.features === 'string' ? form.features.split(',').map((s) => s.trim()).filter(Boolean) : form.features,
    };
    if (editingId) { updateCar({ ...payload, id: editingId }); flashMsg('✅ Bil opdateret'); }
    else { addCar(payload); flashMsg('✅ Bil oprettet!'); }
    reset();
  }

  function startEdit(car) {
    setEditingId(car.id);
    setForm({ ...car, price: String(car.price), weeklyPrice: car.weeklyPrice ? String(car.weeklyPrice) : '', highSeasonPrice: car.highSeasonPrice ? String(car.highSeasonPrice) : '', features: Array.isArray(car.features) ? car.features.join(', ') : car.features });
    setImgMode(car.image && !car.image.startsWith('data:') ? 'url' : 'upload');
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }

  return (
    <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: 24, alignItems: 'start' }}>
      {/* Form */}
      <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)', position: 'sticky', top: 86 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>{editingId ? '✏️ Rediger bil' : '➕ Ny bil'}</h3>
        {flash && <div className="sans" style={{ background: flash.includes('✅') ? '#dcfce7' : '#fee2e2', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, fontWeight: 600 }}>{flash}</div>}

        <Lf label="Bilnavn"><input className="linp sans" value={form.name} onChange={set('name')} placeholder="fx Audi A3" /></Lf>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Lf label="Kategori"><select className="linp sans" value={form.type} onChange={set('type')}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></Lf>
          <Lf label="Badge"><input className="linp sans" value={form.badge} onChange={set('badge')} placeholder="Populær" /></Lf>
        </div>
        <Lf label="Udstyr (komma-adskilt)"><input className="linp sans" value={form.features} onChange={set('features')} placeholder="5 sæder, Automatik, A/C" /></Lf>

        {/* Pricing */}
        <div style={{ background: '#fffbf2', border: '1px solid rgba(200,150,60,0.25)', borderRadius: 12, padding: 14, marginBottom: 14 }}>
          <div className="sans" style={{ fontSize: 10, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: 10 }}>💰 Prisstyring</div>
          <Lf label="Dagspris (kr)*"><input type="number" className="linp sans" value={form.price} onChange={set('price')} placeholder="299" /></Lf>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Lf label="Ugepris/dag (7+ dage)"><input type="number" className="linp sans" value={form.weeklyPrice} onChange={set('weeklyPrice')} placeholder="valgfri" /></Lf>
            <Lf label="Højsæsonpris (jul-aug)"><input type="number" className="linp sans" value={form.highSeasonPrice} onChange={set('highSeasonPrice')} placeholder="valgfri" /></Lf>
          </div>
        </div>

        {/* Availability */}
        <Lf label="Tilgængelighed">
          <select className="linp sans" value={form.availability} onChange={set('availability')}>
            {AVAILABILITY_STATES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </Lf>

        {/* Image */}
        <div style={{ background: '#f8f8f5', borderRadius: 12, padding: 14, marginBottom: 14 }}>
          <div className="sans" style={{ fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: 10 }}>🖼️ Billede</div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            {['upload', 'url'].map((m) => (
              <button key={m} className="sans" onClick={() => setImgMode(m)} style={{ flex: 1, background: imgMode === m ? 'var(--gold)' : 'white', color: imgMode === m ? '#0f0f0f' : '#666', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8, padding: '7px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                {m === 'upload' ? '📂 Upload' : '🔗 URL'}
              </button>
            ))}
          </div>
          {imgMode === 'upload' ? (
            <label style={{ display: 'block', border: '2px dashed rgba(0,0,0,0.12)', borderRadius: 10, padding: 14, textAlign: 'center', cursor: 'pointer', background: 'white' }}>
              <input type="file" accept="image/*" onChange={handleImg} style={{ display: 'none' }} />
              {form.image?.startsWith('data:')
                ? <img src={form.image} alt="preview" style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 6 }} />
                : <span className="sans" style={{ fontSize: 12, color: 'var(--muted)' }}>📸 Klik for at vælge (max 4 MB)</span>}
            </label>
          ) : (
            <input className="linp sans" value={(!form.image || form.image.startsWith('data:')) ? '' : form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} placeholder="https://..." />
          )}
          {form.image && <button className="sans" onClick={() => setForm((p) => ({ ...p, image: '' }))} style={{ marginTop: 6, background: 'none', border: 'none', color: '#dc2626', fontSize: 12, cursor: 'pointer' }}>✕ Fjern billede</button>}
        </div>

        {/* Emoji & color */}
        <Lf label="Ikon">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {EMOJI_CHOICES.map((em) => <button key={em} onClick={() => setForm((p) => ({ ...p, emoji: em }))} style={{ fontSize: 18, width: 34, height: 34, borderRadius: 8, cursor: 'pointer', background: form.emoji === em ? 'rgba(200,150,60,0.2)' : '#f4f4f0', border: form.emoji === em ? '2px solid var(--gold)' : '2px solid transparent' }}>{em}</button>)}
          </div>
        </Lf>
        <Lf label="Kortfarve">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {COLOR_CHOICES.map((col) => <button key={col} onClick={() => setForm((p) => ({ ...p, color: col }))} style={{ width: 28, height: 28, borderRadius: '50%', background: col, border: form.color === col ? '3px solid #1a1a1a' : '3px solid transparent', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />)}
          </div>
        </Lf>

        <label className="sans" style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0', cursor: 'pointer', fontSize: 13, color: '#333' }}>
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} style={{ width: 16, height: 16, accentColor: 'var(--gold)' }} />
          ⭐ Featured bil (fremhæves på forsiden)
        </label>

        <button className="btn-primary sans" onClick={save} style={{ width: '100%', padding: 13 }}>{editingId ? '💾 Gem' : '✅ Opret bil'}</button>
        {editingId && <button className="sans" onClick={reset} style={{ width: '100%', marginTop: 8, background: '#f4f4f0', border: 'none', borderRadius: 12, padding: 12, cursor: 'pointer', fontWeight: 600 }}>Annullér</button>}
      </div>

      {/* Car list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {carList.length === 0 && <div className="sans" style={{ background: 'white', borderRadius: 16, padding: 40, textAlign: 'center', color: 'var(--muted)' }}>Ingen biler. Opret din første til venstre.</div>}
        {carList.map((car) => (
          <div key={car.id} style={{ background: 'white', borderRadius: 14, padding: '14px 18px', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', opacity: car.availability === 'hidden' ? 0.5 : 1, transition: 'opacity 0.2s' }}>
            <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: car.image ? '#f0f0ef' : `linear-gradient(135deg, ${car.color}20, ${car.color}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {car.image ? <img src={car.image} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: 26 }}>{car.emoji}</span>}
            </div>
            <div style={{ flex: 1, minWidth: 130 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{car.name}</span>
                <AvailabilityBadge status={car.availability} />
                {car.featured && <span className="sans" style={{ fontSize: 10, color: 'var(--gold)', fontWeight: 700 }}>⭐ Featured</span>}
              </div>
              <p className="sans" style={{ color: 'var(--muted)', fontSize: 12, marginTop: 2 }}>{car.type} · {car.price} kr/dag</p>
            </div>
            {/* Availability selector */}
            <select className="sans" value={car.availability} onChange={(e) => setAvailability(car.id, e.target.value)}
              style={{ background: '#f8f8f5', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              {AVAILABILITY_STATES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="sans" onClick={() => toggleFeatured(car.id)} style={{ background: car.featured ? 'rgba(200,150,60,0.15)' : '#f4f4f0', border: 'none', color: car.featured ? 'var(--gold)' : '#666', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>⭐</button>
              <button className="sans" onClick={() => startEdit(car)} style={{ background: '#f4f4f0', border: 'none', color: '#333', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>✏️</button>
              <button className="sans" onClick={() => { if (window.confirm(`Slet ${car.name}?`)) deleteCar(car.id); }} style={{ background: '#fee2e2', border: 'none', color: '#dc2626', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Bookings Tab ────────────────────────────────────────────────────────────── */
function BookingsTab({ bookings }) {
  return (
    <div>
      {bookings.length === 0 ? (
        <div style={{ background: 'white', borderRadius: 16, padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
          <p className="sans" style={{ color: 'var(--muted)' }}>Ingen bookinger endnu.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {bookings.map((b) => (
            <div key={b.id} style={{ background: 'white', borderRadius: 14, padding: '18px 20px', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 36 }}>{b.car?.emoji}</span>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{b.car?.name}</span>
                  <span className="sans" style={{ background: '#dcfce7', color: '#16a34a', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>✓ Bekræftet</span>
                </div>
                <p className="sans" style={{ color: 'var(--muted)', fontSize: 12, marginTop: 3 }}>{b.customer?.name || 'Kunde'} · {b.customer?.email}</p>
                <p className="sans" style={{ color: 'var(--muted)', fontSize: 12 }}>📍 {b.pickup} · 📅 {b.pickDate} → {b.returnDate}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, color: '#16a34a', fontSize: 18 }}>{b.total} kr</div>
                <div className="sans" style={{ color: 'var(--muted)', fontSize: 11 }}>#{b.id}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Revenue Tab ─────────────────────────────────────────────────────────────── */
function RevenueTab({ bookings, carList }) {
  const totalRevenue = bookings.reduce((s, b) => s + (b.total || 0), 0);
  const avgBooking   = bookings.length ? Math.round(totalRevenue / bookings.length) : 0;
  const carRevenue   = useMemo(() => {
    const map = {};
    bookings.forEach((b) => {
      if (!b.car) return;
      map[b.car.name] = (map[b.car.name] || 0) + (b.total || 0);
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [bookings]);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard icon="💰" label="Total omsætning"  value={`${totalRevenue.toLocaleString()} kr`} color="#16a34a" />
        <StatCard icon="📊" label="Gns. booking"     value={`${avgBooking.toLocaleString()} kr`} color="#8b5cf6" />
        <StatCard icon="🎫" label="Antal bookinger"  value={bookings.length} color="#0891b2" />
      </div>
      <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Top biler efter omsætning</h3>
        {carRevenue.length === 0 ? (
          <p className="sans" style={{ color: 'var(--muted)', textAlign: 'center', padding: '20px 0' }}>Ingen data endnu.</p>
        ) : (
          carRevenue.map(([name, rev], i) => {
            const pct = totalRevenue > 0 ? Math.round((rev / totalRevenue) * 100) : 0;
            return (
              <div key={name} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span className="sans" style={{ fontWeight: 600, fontSize: 14 }}>#{i + 1} {name}</span>
                  <span className="sans" style={{ color: '#16a34a', fontWeight: 700 }}>{rev.toLocaleString()} kr</span>
                </div>
                <div style={{ height: 8, background: '#f4f4f0', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, var(--gold), var(--gold-light))', borderRadius: 4, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ── Settings Tab ────────────────────────────────────────────────────────────── */
function SettingsTab() {
  const [codes] = useState(DISCOUNT_CODES);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>🏷️ Aktive rabatkoder</h3>
        {codes.map((c) => (
          <div key={c.code} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #f4f4f0' }}>
            <code className="sans" style={{ background: '#f4f4f0', borderRadius: 8, padding: '4px 10px', fontWeight: 700, fontSize: 13 }}>{c.code}</code>
            <span className="sans" style={{ flex: 1, color: 'var(--muted)', fontSize: 13 }}>{c.label}</span>
          </div>
        ))}
        <p className="sans" style={{ color: 'var(--muted)', fontSize: 12, marginTop: 12 }}>Tilslut til backend (Firebase/Supabase) for at administrere koder dynamisk.</p>
      </div>
      <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>⚙️ System</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[['🔥 Firebase', 'Tilslut til Firebase Firestore'], ['🗄️ Supabase', 'Tilslut til Supabase DB'], ['💳 Stripe', 'Konfigurér Stripe betalinger'], ['📊 Google Analytics', 'Tilslut GA4'], ['📱 Meta Pixel', 'Konfigurér Meta Pixel']].map(([label, desc]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#f8f8f5', borderRadius: 10 }}>
              <span className="sans" style={{ fontWeight: 600, fontSize: 13, flex: 1 }}>{label}</span>
              <span className="sans" style={{ color: 'var(--muted)', fontSize: 12 }}>{desc}</span>
              <span className="sans" style={{ fontSize: 10, color: '#d97706', fontWeight: 700, background: '#fef3c7', padding: '2px 8px', borderRadius: 100 }}>Klar til opsætning</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main AdminDashboard ─────────────────────────────────────────────────────── */
const TABS = [
  { id: 'overview',  label: '📊 Oversigt' },
  { id: 'fleet',     label: '🚗 Flåde' },
  { id: 'bookings',  label: '📅 Bookinger' },
  { id: 'revenue',   label: '💰 Omsætning' },
  { id: 'settings',  label: '⚙️ Indstillinger' },
];

export default function AdminDashboard() {
  const { carList, addCar, updateCar, deleteCar, setAvailability, toggleFeatured, bookings, navigate, logout } = useApp();
  const [tab, setTab] = useState('overview');

  return (
    <section style={{ padding: '110px 5% 80px', background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <span className="sans" style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700 }}>🔧 Administration</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 700, marginTop: 4 }}>Admin Dashboard</h2>
            <p className="sans" style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>{carList.length} biler i flåden · {bookings.length} bookinger</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="sans" onClick={() => navigate('home')} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)', color: '#333', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>← Se siden</button>
            <button className="sans" onClick={() => { logout(); navigate('home'); }} style={{ background: '#fee2e2', border: 'none', color: '#dc2626', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Log ud</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'white', borderRadius: 14, padding: 6, boxShadow: 'var(--shadow-sm)', flexWrap: 'wrap' }}>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className="sans"
              style={{ flex: 1, minWidth: 100, background: tab === t.id ? 'var(--dark)' : 'transparent', color: tab === t.id ? 'var(--gold)' : 'var(--muted)', border: 'none', borderRadius: 10, padding: '10px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'overview' && <OverviewTab carList={carList} bookings={bookings} />}
        {tab === 'fleet'    && <FleetTab carList={carList} addCar={addCar} updateCar={updateCar} deleteCar={deleteCar} setAvailability={setAvailability} toggleFeatured={toggleFeatured} />}
        {tab === 'bookings' && <BookingsTab bookings={bookings} />}
        {tab === 'revenue'  && <RevenueTab bookings={bookings} carList={carList} />}
        {tab === 'settings' && <SettingsTab />}
      </div>
    </section>
  );
}
