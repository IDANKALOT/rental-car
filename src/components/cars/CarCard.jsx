import { memo } from 'react';
import { lowestPrice } from '../../data/cars';

const CarCard = memo(function CarCard({ car, t, onBook, draft }) {
  const low = lowestPrice(car);
  const hasWeekly = car.weeklyPrice && Number(car.weeklyPrice) < Number(car.price);
  const hasHighSeason = car.highSeasonPrice && Number(car.highSeasonPrice) > Number(car.price);

  return (
    <div className="car-card" style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
      {/* Image / emoji */}
      <div style={{ position: 'relative', height: 190, background: car.image ? '#f0f0ef' : `linear-gradient(135deg, ${car.color}14, ${car.color}28)`, overflow: 'hidden' }}>
        {car.image
          ? <img src={car.image} alt={car.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 76 }}>{car.emoji}</div>
        }
        <span className="sans" style={{ position: 'absolute', top: 12, left: 12, background: car.color, color: 'white', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 100, letterSpacing: '0.5px' }}>
          {car.badge}
        </span>
        {car.featured && (
          <span className="sans" style={{ position: 'absolute', top: 12, right: 12, background: 'var(--gold)', color: '#0f0f0f', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 100 }}>
            ⭐ Featured
          </span>
        )}
        {hasHighSeason && (
          <span className="sans" style={{ position: 'absolute', bottom: 12, right: 12, background: '#f97316', color: 'white', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 100 }}>
            ☀️ Højsæson
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: 22 }}>
        <div className="sans" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 4, fontWeight: 600 }}>{car.type}</div>
        <h3 style={{ fontSize: 21, fontWeight: 700, marginBottom: 10 }}>{car.name}</h3>

        {/* Features */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
          {car.features.map((f) => (
            <span key={f} className="sans" style={{ background: '#f4f4f0', borderRadius: 8, padding: '3px 9px', fontSize: 11, color: 'var(--muted)' }}>{f}</span>
          ))}
        </div>

        {/* Price tiers */}
        {(hasWeekly || hasHighSeason) && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
            {hasWeekly && (
              <span className="sans" style={{ background: '#dcfce7', color: '#16a34a', fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 100 }}>
                🗓️ {car.weeklyPrice} kr/dag v. 7+ dage
              </span>
            )}
            {hasHighSeason && (
              <span className="sans" style={{ background: '#fff7ed', color: '#c2410c', fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 100 }}>
                ☀️ {car.highSeasonPrice} kr jul-aug
              </span>
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
          <div>
            <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-sans)' }}>{t.from}</span>
            <div>
              <span style={{ fontSize: 26, fontWeight: 700, color: car.color }}>{low}</span>
              <span className="sans" style={{ color: 'var(--muted)', fontSize: 12 }}> kr{t.perDay}</span>
            </div>
          </div>
          <button className="cta-btn sans" onClick={onBook}
            style={{ background: car.color, border: 'none', color: 'white', borderRadius: 12, padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            {t.book}
          </button>
        </div>
      </div>
    </div>
  );
});

export default CarCard;
