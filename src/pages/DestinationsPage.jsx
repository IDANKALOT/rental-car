import { useApp } from '../context/AppContext';
import SectionHead from '../components/common/SectionHead';
import { destinations } from '../data/destinations';

export default function DestinationsPage() {
  const { t, navigate } = useApp();

  return (
    <section style={{ padding: '120px 5% 80px', background: 'white', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHead label={t.destinations.label} title={t.destinations.title} subtitle={t.destinations.subtitle} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 24 }}>
          {destinations.map((d, i) => (
            <div key={i} onClick={() => navigate('cars')} style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', height: i === 0 ? 380 : 260, cursor: 'pointer', transition: 'transform 0.4s ease', gridColumn: i === 0 ? 'span 2' : 'span 1' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{ position: 'absolute', inset: 0, background: d.img }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 28, marginBottom: 4 }}>{d.emoji}</div>
                    <h3 style={{ color: 'white', fontSize: i === 0 ? 32 : 24, fontWeight: 700, textShadow: '0 2px 12px rgba(0,0,0,0.5)', marginBottom: 4 }}>{d.name}</h3>
                    <p className="sans" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{d.desc}</p>
                    {d.highlight && <p className="sans" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 6 }}>{d.highlight}</p>}
                  </div>
                  <span className="sans" style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)', color: 'white', borderRadius: 100, padding: '6px 16px', fontSize: 14, fontWeight: 600, flexShrink: 0 }}>{d.temp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button className="btn-primary sans" onClick={() => navigate('cars')} style={{ padding: '15px 36px', fontSize: 15 }}>
            {t.pages.browseCars} →
          </button>
        </div>
      </div>
    </section>
  );
}
