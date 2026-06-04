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
    <section style={{ padding: '120px 5% 80px', background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHead label={t.categories.label} title={t.pages.carsTitle} subtitle={t.pages.carsSub} />

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          {['all', ...CATEGORIES].map((c) => (
            <button key={c} className="sans cta-btn" onClick={() => setCatFilter(c)}
              style={{ background: catFilter === c ? 'var(--gold)' : 'white', color: catFilter === c ? '#0f0f0f' : 'var(--muted)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 100, padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: catFilter === c ? 'var(--shadow-gold)' : 'none' }}>
              {c === 'all' ? t.pages.filterAll : c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="cars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <CarCardSkeleton key={i} />)
            : filtered.map((car) => (
                <CarCard key={car.id} car={car} t={t} onBook={() => openBookingFlow({ selectedCar: car })} />
              ))
          }
        </div>

        {filtered.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🚗</div>
            <p className="sans">Ingen biler fundet i denne kategori.</p>
          </div>
        )}
      </div>
    </section>
  );
}
