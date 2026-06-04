import { useState } from 'react';
import { useApp } from '../context/AppContext';
import SectionHead from '../components/common/SectionHead';
import TrustBadges from '../components/common/TrustBadges';
import BookingWidget from '../components/booking/BookingWidget';
import CarCard from '../components/cars/CarCard';
import { destinations } from '../data/destinations';
import { faqs } from '../data/faqs';

const whyUs = [
  { icon: '✦', title: 'Ingen skjulte gebyrer',  desc: 'Det du ser er det du betaler. Altid.' },
  { icon: '↩', title: 'Gratis afbestilling',     desc: 'Afbestil op til 48 timer før uden beregning.' },
  { icon: '🇩🇰', title: 'Dansk kundeservice',   desc: 'Vi taler dansk – ring, skriv eller chat.' },
  { icon: '⚡', title: 'Hurtig afhentning',      desc: 'Din bil er klar på under 10 minutter.' },
  { icon: '🛡️', title: 'Forsikring inkluderet', desc: 'Basis kasko er altid inkluderet i prisen.' },
  { icon: '🌍', title: '500+ afhentningssteder', desc: 'Lufthavne, hoteller og bymidter i hele Spanien.' },
];

function DestGrid({ onPick }) {
  return (
    <div className="dest-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {destinations.map((d, i) => (
        <div key={i} className="dest-card" onClick={onPick} style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', height: i === 0 ? 300 : 200, gridColumn: i === 0 ? 'span 2' : 'span 1' }}>
          <div style={{ position: 'absolute', inset: 0, background: d.img }} />
          <div className="dest-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
          <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 22 }}>{d.emoji}</span>
              <div>
                <h3 style={{ color: 'white', fontSize: 20, fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{d.name}</h3>
                <p className="sans" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{d.desc}</p>
              </div>
              <span className="sans" style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: 'white', borderRadius: 100, padding: '3px 11px', fontSize: 12, fontWeight: 600 }}>{d.temp}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const { t, visibleCars, openBookingFlow, navigate } = useApp();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: '100vh', position: 'relative', background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1209 40%, #2d1f0a 70%, #0f0f0f 100%)', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Background patterns */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '8%', right: '-6%', width: 650, height: 650, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,150,60,0.1) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: '-12%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,150,60,0.07) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,150,60,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,150,60,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 5% 80px', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            {/* Left */}
            <div className="animate-fadeInUp">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,150,60,0.12)', border: '1px solid rgba(200,150,60,0.28)', borderRadius: 100, padding: '6px 16px', marginBottom: 28 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 8px var(--gold)', display: 'block' }} />
                <span className="sans" style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>{t.hero.badge}</span>
              </div>
              <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 700, color: 'white', lineHeight: 1.1, marginBottom: 16, letterSpacing: '-1px' }}>
                {t.hero.title}<br />
                <span className="shimmer-text">{t.hero.subtitle}</span>
              </h1>
              <p className="sans" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 40, letterSpacing: '0.5px' }}>{t.hero.trustBadge}</p>
              <BookingWidget />
            </div>

            {/* Right */}
            <div className="hide-mobile" style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{ width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,150,60,0.18) 0%, transparent 70%)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                <span className="hero-emoji" style={{ fontSize: 190, filter: 'drop-shadow(0 24px 48px rgba(200,150,60,0.35))' }}>🚗</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 32 }}>
                {[['500+', 'Biler'], ['50k+', 'Kunder'], ['4.9★', 'Rating']].map(([n, l]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div className="shimmer-text" style={{ fontSize: 24, fontWeight: 700, fontFamily: 'var(--font-serif)' }}>{n}</div>
                    <div className="sans" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CARS */}
      <section style={{ padding: 'var(--space-24) 5%', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionHead label={t.categories.label} title={t.categories.title} subtitle={t.categories.subtitle} />
          <div className="cars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
            {visibleCars.slice(0, 5).map((car) => (
              <CarCard key={car.id} car={car} t={t} onBook={() => openBookingFlow({ selectedCar: car })} />
            ))}
            {/* CTA card */}
            <div style={{ background: 'var(--dark)', borderRadius: 20, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
              <div>
                <span className="sans" style={{ color: 'var(--gold)', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700 }}>Eksklusiv oplevelse</span>
                <h3 style={{ color: 'white', fontSize: 'clamp(1.4rem,2vw,1.9rem)', fontWeight: 700, marginTop: 10, lineHeight: 1.25 }}>Chauffeur & Concierge Service</h3>
                <p className="sans" style={{ color: 'rgba(255,255,255,0.4)', marginTop: 10, lineHeight: 1.6, fontSize: 14 }}>Privat chauffør, luksusbil og personlig service fra ankomst til afrejse.</p>
              </div>
              <button className="btn-primary sans" onClick={() => navigate('contact')} style={{ width: '100%', padding: '13px 20px' }}>Kontakt os →</button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section style={{ padding: 'var(--space-24) 5%', background: 'var(--dark)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionHead label={t.why.label} title={t.why.title} subtitle={t.why.subtitle} light />
          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {whyUs.map((w, i) => (
              <div key={i} className="why-card glass" style={{ borderRadius: 20, padding: 28 }}>
                <div className="why-icon" style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(200,150,60,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 20, transition: 'background 0.3s' }}>{w.icon}</div>
                <h3 className="why-title" style={{ color: 'white', fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{w.title}</h3>
                <p className="why-desc sans" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.7 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES + REVIEWS */}
      <TrustBadges />

      {/* DESTINATIONS */}
      <section style={{ padding: 'var(--space-24) 5%', background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionHead label={t.destinations.label} title={t.destinations.title} subtitle={t.destinations.subtitle} />
          <DestGrid onPick={() => navigate('destinations')} />
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'var(--space-24) 5%', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <SectionHead label={t.faq.label} title={t.faq.title} subtitle={t.faq.subtitle} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {faqs.map((f, i) => (
              <div key={i} className="faq-item" style={{ background: 'white', borderRadius: 14, border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', background: 'none', border: 'none', padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{f.q}</span>
                  <span style={{ fontSize: 20, color: 'var(--gold)', transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none', marginLeft: 16 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 22px 18px' }}>
                    <p className="sans" style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: 15 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'var(--space-20) 5%', background: 'var(--dark)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,150,60,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,150,60,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 700, color: 'white', marginBottom: 16 }}>{t.cta.title}</h2>
          <p className="sans" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, marginBottom: 36, lineHeight: 1.6 }}>{t.cta.subtitle}</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary sans" onClick={() => openBookingFlow()} style={{ padding: '15px 36px', fontSize: 15 }}>{t.cta.primary}</button>
            <button className="btn-ghost sans" onClick={() => navigate('contact')} style={{ padding: '15px 36px', fontSize: 15 }}>{t.cta.secondary}</button>
          </div>
        </div>
      </section>
    </>
  );
}
