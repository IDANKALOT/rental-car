import { useState } from 'react';
import { useApp } from '../context/AppContext';
import SectionHead from '../components/common/SectionHead';
import CarCard from '../components/cars/CarCard';
import { CATEGORIES } from '../data/cars';
import { CarCardSkeleton } from '../components/ui/Skeleton';

export default function CarsPage() {
  const { t, visibleCars, openBookingFlow } = useApp();
  const [catFilter, setCatFilter] = useState('all');
  const [loading] = useState(false);

  const filtered = visibleCars.filter((c) => catFilter === 'all' || c.type === catFilter);

  return (
    <section style={{ padding: '120px 5% 80px', background: 'var(--dark)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHead label={t.categories.label} title={t.pages.carsTitle} subtitle={t.pages.carsSub} light />

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 52 }}>
          {['all', ...CATEGORIES].map((c) => (
            <button
              key={c}
              className="sans cta-btn"
              onClick={() => setCatFilter(c)}
              style={{
                background: catFilter === c ? 'var(--gold)' : 'rgba(255,255,255,0.07)',
                color: catFilter === c ? '#0f0f10' : 'rgba(255,255,255,0.55)',
                border: catFilter === c ? 'none' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 100,
                padding: '8px 22px',
                fontSize: 13,
                fontWeight: catFilter === c ? 700 : 500,
                cursor: 'pointer',
                letterSpacing: '0.3px',
                boxShadow: catFilter === c ? 'var(--shadow-gold)' : 'none',
              }}
            >
              {c === 'all' ? t.pages.filterAll : c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="cars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <CarCardSkeleton key={i} />)
            : filtered.map((car) => (
                <CarCard key={car.id} car={car} t={t} onBook={() => openBookingFlow({ selectedCar: car })} />
              ))
          }
        </div>

        {filtered.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '72px 0' }}>
            <div className="sans" style={{ color: 'var(--text-dim)', fontSize: 16 }}>
              Ingen biler fundet i denne kategori.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
