import { useApp } from '../context/AppContext';
import SectionHead from '../components/common/SectionHead';
import { destinations } from '../data/destinations';

export default function DestinationsPage() {
  const { t, navigate } = useApp();

  return (
    <section style={{ padding: '120px 5% 80px', background: 'var(--dark)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHead label={t.destinations.label} title={t.destinations.title} subtitle={t.destinations.subtitle} light />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
          {destinations.map((d, i) => (
            <div
              key={i}
              onClick={() => navigate('cars')}
              className="dest-card"
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                position: 'relative',
                height: i === 0 ? 420 : 280,
                cursor: 'pointer',
                gridColumn: i === 0 ? 'span 2' : 'span 1',
              }}
            >
              {/* Photo or gradient fallback */}
              {d.photo ? (
                <img
                  src={d.photo}
                  alt={d.name}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div style={{ position: 'absolute', inset: 0, background: d.img }} />
              )}

              {/* Gradient overlay */}
              <div
                className="dest-overlay overlay-bottom"
                style={{ position: 'absolute', inset: 0 }}
              />

              {/* Content */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: i === 0 ? '32px 32px' : '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <h3 style={{
                      color: 'white',
                      fontSize: i === 0 ? 36 : 24,
                      fontWeight: 400,
                      fontStyle: 'italic',
                      fontFamily: 'var(--font-serif)',
                      textShadow: '0 2px 16px rgba(0,0,0,0.5)',
                      marginBottom: 6,
                    }}>
                      {d.name}
                    </h3>
                    <p className="sans" style={{ color: 'rgba(255,255,255,0.7)', fontSize: i === 0 ? 14 : 12, marginBottom: 6 }}>
                      {d.desc}
                    </p>
                    {d.highlight && (
                      <p className="sans" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.2px' }}>
                        {d.highlight}
                      </p>
                    )}
                  </div>
                  <span className="sans" style={{
                    background: 'rgba(200,150,60,0.88)',
                    color: '#0f0f10',
                    borderRadius: 100,
                    padding: '5px 14px',
                    fontSize: 13,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {d.temp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button
            className="btn-primary sans"
            onClick={() => navigate('cars')}
            style={{ padding: '15px 40px', fontSize: 15 }}
          >
            {t.pages.browseCars} →
          </button>
        </div>
      </div>
    </section>
  );
}
