import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fmtDate } from '../data/cars';

export default function AccountPage() {
  const { t, user, bookings, navigate } = useApp();

  useEffect(() => {
    if (!user) navigate('login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <section style={{ padding: '120px 5% 80px', background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Profile header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 40 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f0f0f', fontWeight: 700, fontSize: 24, flexShrink: 0 }}>
            {user.name[0].toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700 }}>{user.name}</h2>
            <p className="sans" style={{ color: 'var(--muted)', fontSize: 14 }}>{user.email}</p>
          </div>
        </div>

        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>{t.pages.bookingHistory}</h3>

        {bookings.length === 0 ? (
          <div style={{ background: 'white', borderRadius: 20, padding: 48, textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🗓️</div>
            <p className="sans" style={{ color: 'var(--muted)', marginBottom: 20 }}>{t.pages.noBookings}</p>
            <button className="btn-primary sans" onClick={() => navigate('cars')} style={{ padding: '12px 28px' }}>{t.pages.browseCars}</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {bookings.map((b) => (
              <div key={b.id} style={{ background: 'white', borderRadius: 18, padding: 24, boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ fontSize: 46 }}>{b.car?.emoji}</div>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                    <h4 style={{ fontSize: 18, fontWeight: 700 }}>{b.car?.name}</h4>
                    <span className="sans" style={{ background: '#dcfce7', color: '#16a34a', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100, textTransform: 'uppercase' }}>✓ {t.status.confirmed}</span>
                  </div>
                  <p className="sans" style={{ color: 'var(--muted)', fontSize: 13 }}>📍 {b.pickup} → {b.dropoff}</p>
                  <p className="sans" style={{ color: 'var(--muted)', fontSize: 13 }}>🗓️ {fmtDate(b.pickDate)} → {fmtDate(b.returnDate)} · {b.days} {t.bookingModal.days}</p>
                  <p className="sans" style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4 }}>#{b.id} · 💳 {b.paymentMethod}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--gold)' }}>{b.total} kr</div>
                  <div className="sans" style={{ color: 'var(--muted)', fontSize: 12 }}>{b.days} dage</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
