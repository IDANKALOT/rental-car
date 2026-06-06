import { memo, useState } from 'react';
import { lowestPrice } from '../../data/cars';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatPrice';

const CarCard = memo(function CarCard({ car, t, onBook }) {
  const { lang } = useApp();
  const [imgError, setImgError] = useState(false);
  const low = lowestPrice(car);
  const hasWeekly = car.weeklyPrice && Number(car.weeklyPrice) < Number(car.price);
  const img = car.image || car.defaultImage;
  const showImg = img && !imgError;

  const availBadge = {
    reserved:    { label: 'Reserveret',      bg: 'rgba(217,119,6,0.85)'  },
    maintenance: { label: 'Vedligeholdelse', bg: 'rgba(220,38,38,0.85)' },
  }[car.availability];

  return (
    <div
      className="luxury-card"
      style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface)', position: 'relative' }}
    >
      {/* ── Image ── */}
      <div className="img-wrap" style={{ position: 'relative', height: 230, background: showImg ? '#111' : `linear-gradient(135deg, ${car.color}22, ${car.color}44)`, flexShrink: 0 }}>
        {showImg ? (
          <img
            src={img}
            alt={car.name}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <span style={{ fontSize: 72, opacity: 0.65 }}>{car.emoji}</span>
          </div>
        )}

        {showImg && <div className="overlay-bottom" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />}

        {/* Category + featured badge */}
        <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span className="sans" style={{
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)',
            color: 'rgba(255,255,255,0.82)', fontSize: 10, fontWeight: 600,
            padding: '4px 10px', borderRadius: 100, letterSpacing: '1px',
            textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.13)',
          }}>
            {car.type}
          </span>
          {car.featured && (
            <span className="sans" style={{
              background: 'rgba(200,150,60,0.88)', backdropFilter: 'blur(12px)',
              color: '#0f0f10', fontSize: 10, fontWeight: 700,
              padding: '4px 10px', borderRadius: 100, letterSpacing: '0.5px',
            }}>
              {car.badge}
            </span>
          )}
        </div>

        {/* Availability badge */}
        {availBadge && (
          <div style={{ position: 'absolute', top: 14, right: 14 }}>
            <span className="sans" style={{
              background: availBadge.bg, color: 'white', fontSize: 10,
              fontWeight: 600, padding: '4px 10px', borderRadius: 100, backdropFilter: 'blur(12px)',
            }}>
              {availBadge.label}
            </span>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '22px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: 'white', fontSize: 19, fontWeight: 500, marginBottom: 6, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
          {car.name}
        </h3>

        {/* Specs row */}
        <div className="sans" style={{ display: 'flex', gap: 10, color: 'var(--text-dim)', fontSize: 12, marginBottom: 14, flexWrap: 'wrap' }}>
          <span>{car.year}</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>{car.fuel}</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>{car.transmission}</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>{car.doors} døre</span>
        </div>

        {/* Feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 18 }}>
          {car.features.slice(0, 4).map((f) => (
            <span key={f} className="sans" style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 100, padding: '3px 10px', fontSize: 11, color: 'rgba(255,255,255,0.55)',
            }}>
              {f}
            </span>
          ))}
        </div>

        {/* Weekly deal */}
        {hasWeekly && (
          <div style={{ marginBottom: 14 }}>
            <span className="sans" style={{
              background: 'rgba(22,163,74,0.13)', color: '#4ade80',
              fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 100,
              border: '1px solid rgba(22,163,74,0.22)',
            }}>
              {formatPrice(car.weeklyPrice, lang)}{t.perDay} · 7+ days
            </span>
          </div>
        )}

        {/* Price + CTA */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div>
            <div className="sans" style={{ color: 'var(--text-subtle)', fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 3 }}>
              {t.from}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: 'white', fontFamily: 'var(--font-serif)' }}>{formatPrice(low, lang)}</span>
              <span className="sans" style={{ color: 'var(--text-dim)', fontSize: 12 }}>{t.perDay}</span>
            </div>
          </div>
          <button
            className="cta-btn sans"
            onClick={onBook}
            disabled={car.availability !== 'available'}
            style={{
              background: car.availability === 'available' ? 'var(--gold)' : 'rgba(255,255,255,0.07)',
              border: 'none',
              color: car.availability === 'available' ? '#0f0f10' : 'rgba(255,255,255,0.25)',
              borderRadius: 'var(--r)',
              padding: '10px 20px', fontSize: 13, fontWeight: 700,
              cursor: car.availability === 'available' ? 'pointer' : 'not-allowed',
              letterSpacing: '0.2px',
            }}
          >
            {car.availability === 'available' ? t.book : '—'}
          </button>
        </div>
      </div>
    </div>
  );
});

export default CarCard;
