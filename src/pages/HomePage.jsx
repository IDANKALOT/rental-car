import { useState } from 'react';
import { useApp } from '../context/AppContext';
import SectionHead from '../components/common/SectionHead';
import TrustBadges from '../components/common/TrustBadges';
import BookingWidget from '../components/booking/BookingWidget';
import CarCard from '../components/cars/CarCard';
import { destinations } from '../data/destinations';
import { faqs } from '../data/faqs';

const HERO_IMG = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80';
const CTA_IMG  = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1920&q=80';

const whyFeatures = [
  {
    title: 'Sømløs afhentning — overalt i Spanien',
    desc: 'Fra lufthavn til hotel eller direkte til dig. Vi leverer din bil præcis der, hvor du har brug for den — med 10 minutters garanti.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
    stats: [{ n: '500+', l: 'Afhentningssteder' }, { n: '10 min', l: 'Garanteret' }],
  },
  {
    title: 'Premium bilflåde — fra byrunabout til eksklusiv SUV',
    desc: 'Alle biler er maksimalt 2 år gamle, fuldt servicede og rengjorte. Vælg mellem economy, SUV, cabriolet og luksusmodeller.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
    stats: [{ n: '500+', l: 'Biler' }, { n: '< 2 år', l: 'Gennemsnitsalder' }],
  },
  {
    title: 'Skandinavisk support — på dit eget sprog',
    desc: 'Vi taler dansk, norsk og svensk. Ring, skriv eller chat — vores team er klar 24/7, 365 dage om året fra Marbella.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80',
    stats: [{ n: '24/7', l: 'Support' }, { n: '4.9★', l: 'Google Rating' }],
  },
];

function WhyPanel({ feature, idx }) {
  const isReversed = idx % 2 === 1;
  return (
    <div
      className="why-feature"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        minHeight: 460,
        direction: isReversed ? 'rtl' : 'ltr',
      }}
    >
      {/* Image side */}
      <div style={{ position: 'relative', overflow: 'hidden', direction: 'ltr', minHeight: 360 }}>
        <img
          src={feature.image}
          alt={feature.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div className="overlay-dark" style={{ position: 'absolute', inset: 0 }} />
      </div>

      {/* Text side */}
      <div style={{
        direction: 'ltr',
        background: 'var(--surface)',
        padding: 'clamp(40px,6vw,88px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 24,
      }}>
        <span className="sans" style={{ color: 'var(--gold)', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700 }}>
          0{idx + 1}
        </span>
        <h3 style={{
          color: 'white',
          fontSize: 'clamp(1.4rem,2.4vw,2rem)',
          fontWeight: 400,
          lineHeight: 1.2,
          fontStyle: 'italic',
          fontFamily: 'var(--font-serif)',
        }}>
          {feature.title}
        </h3>
        <p className="sans" style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.8 }}>
          {feature.desc}
        </p>
        <div style={{ display: 'flex', gap: 36, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {feature.stats.map((s) => (
            <div key={s.l}>
              <div style={{ color: 'var(--sand)', fontSize: 26, fontWeight: 700, fontFamily: 'var(--font-serif)' }}>{s.n}</div>
              <div className="sans" style={{ color: 'var(--text-subtle)', fontSize: 11, letterSpacing: '0.5px', marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DestGrid({ onPick }) {
  return (
    <div
      className="dest-grid"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, gridAutoRows: '220px' }}
    >
      {destinations.map((d, i) => (
        <div
          key={i}
          className="dest-card"
          onClick={onPick}
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            position: 'relative',
            gridColumn: i === 0 ? 'span 2' : 'span 1',
            gridRow: i === 0 ? 'span 2' : 'span 1',
          }}
        >
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

          <div className="dest-overlay overlay-bottom" style={{ position: 'absolute', inset: 0 }} />

          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: i === 0 ? '28px 28px' : '18px 20px' }}>
            <h3 style={{
              color: 'white',
              fontSize: i === 0 ? 30 : 18,
              fontWeight: 400,
              marginBottom: 5,
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              textShadow: '0 2px 12px rgba(0,0,0,0.4)',
            }}>
              {d.name}
            </h3>
            <p className="sans" style={{ color: 'rgba(255,255,255,0.68)', fontSize: i === 0 ? 13 : 11, marginBottom: 10 }}>
              {d.desc}
            </p>
            <span className="sans" style={{
              background: 'rgba(200,150,60,0.88)', color: '#0f0f10',
              borderRadius: 100, padding: '3px 11px', fontSize: 11, fontWeight: 700,
            }}>
              {d.temp}
            </span>
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
      {/* ══════════════════════════════════════════════
          HERO — Cinematic full-screen
      ══════════════════════════════════════════════ */}
      <section style={{ minHeight: '100vh', position: 'relative', background: '#0a0a0b', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

        {/* Background photo with slow pan */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <img
            src={HERO_IMG}
            alt="Luxury car on Spanish coastline"
            className="hero-img-pan"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transformOrigin: 'center center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.52) 55%, rgba(0,0,0,0.22) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
        </div>

        {/* Content */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '140px 5% 120px', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 660 }}>
            <div className="animate-fadeInUp">
              {/* Eyebrow */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
                <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'block' }} />
                <span className="sans" style={{ color: 'var(--gold)', fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                  {t.hero.badge}
                </span>
              </div>

              {/* Headline */}
              <h1
                className="hero-title"
                style={{
                  fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                  fontWeight: 400,
                  color: 'white',
                  lineHeight: 1.0,
                  letterSpacing: '-0.025em',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  marginBottom: 22,
                }}
              >
                Experience Spain<br />
                <span style={{ color: 'var(--sand)', fontStyle: 'normal', fontWeight: 300 }}>Behind the Wheel</span>
              </h1>

              {/* Sub */}
              <p className="sans" style={{ color: 'rgba(255,255,255,0.58)', fontSize: 'clamp(14px,1.4vw,17px)', marginBottom: 44, lineHeight: 1.75, maxWidth: 460 }}>
                Premium Car Rental for Scandinavian Travellers.<br />
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{t.hero.trustBadge}</span>
              </p>
            </div>

            {/* Booking widget */}
            <div className="animate-fadeInUp" style={{ animationDelay: '80ms' }}>
              <BookingWidget />
            </div>
          </div>
        </div>

        {/* Stats strip at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(20px)',
          padding: '18px 5%',
        }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'center' }}>
            {[['500+', 'Biler i flåden'], ['50,000+', 'Tilfredse kunder'], ['4.9', 'Google rating'], ['24/7', 'Dansk support']].map(([n, l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: 'var(--sand)', fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-serif)' }}>{n}</span>
                <span className="sans" style={{ color: 'rgba(255,255,255,0.32)', fontSize: 12, lineHeight: 1.3 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED CARS
      ══════════════════════════════════════════════ */}
      <section style={{ padding: 'var(--space-24) 5%', background: 'var(--dark)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionHead label={t.categories.label} title={t.categories.title} subtitle={t.categories.subtitle} light />
          <div className="cars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {visibleCars.slice(0, 5).map((car) => (
              <CarCard key={car.id} car={car} t={t} onBook={() => openBookingFlow({ selectedCar: car })} />
            ))}

            {/* Concierge CTA card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(200,150,60,0.1) 0%, rgba(200,150,60,0.03) 100%)',
              border: '1px solid rgba(200,150,60,0.18)',
              borderRadius: 'var(--r-xl)',
              padding: '36px 28px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24,
            }}>
              <div>
                <span style={{ display: 'block', width: 36, height: 1, background: 'var(--gold)', marginBottom: 22, opacity: 0.7 }} />
                <span className="sans" style={{ color: 'var(--gold)', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700 }}>
                  Eksklusivt
                </span>
                <h3 style={{
                  color: 'white', fontSize: 'clamp(1.3rem,2vw,1.7rem)', fontWeight: 400,
                  marginTop: 14, lineHeight: 1.2, fontStyle: 'italic', fontFamily: 'var(--font-serif)',
                }}>
                  Chauffeur &amp;<br />Concierge Service
                </h3>
                <p className="sans" style={{ color: 'var(--text-dim)', marginTop: 14, lineHeight: 1.8, fontSize: 14 }}>
                  Privat chauffør, luksusbil og personlig service fra ankomst til afrejse.
                </p>
              </div>
              <button className="btn-ghost sans" onClick={() => navigate('contact')} style={{ textAlign: 'center', justifyContent: 'center' }}>
                Kontakt os →
              </button>
            </div>
          </div>

          {/* View all link */}
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button
              className="sans"
              onClick={() => navigate('cars')}
              style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: 14, cursor: 'pointer', letterSpacing: '0.3px' }}
            >
              Se hele flåden →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHY US — Alternating image-text panels
      ══════════════════════════════════════════════ */}
      <section style={{ background: 'var(--dark)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 5% 0' }}>
          <SectionHead label={t.why.label} title={t.why.title} subtitle={t.why.subtitle} light />
        </div>
        {whyFeatures.map((feature, idx) => (
          <WhyPanel key={idx} feature={feature} idx={idx} />
        ))}
        <div style={{ height: 'var(--space-24)' }} />
      </section>

      {/* ══════════════════════════════════════════════
          TRUST & REVIEWS
      ══════════════════════════════════════════════ */}
      <TrustBadges />

      {/* ══════════════════════════════════════════════
          DESTINATIONS
      ══════════════════════════════════════════════ */}
      <section style={{ padding: 'var(--space-24) 5%', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionHead label={t.destinations.label} title={t.destinations.title} subtitle={t.destinations.subtitle} />
          <DestGrid onPick={() => navigate('destinations')} />
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <button
              className="sans"
              onClick={() => navigate('destinations')}
              style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 14, cursor: 'pointer' }}
            >
              Se alle destinationer →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════ */}
      <section style={{ padding: 'var(--space-24) 5%', background: 'var(--cream-2)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <SectionHead label={t.faq.label} title={t.faq.title} subtitle={t.faq.subtitle} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faqs.map((f, i) => (
              <div key={i} className="faq-item" style={{ background: 'white', borderRadius: 14, border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', background: 'none', border: 'none', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 16, fontWeight: 500, fontFamily: 'var(--font-serif)', color: 'var(--dark)' }}>{f.q}</span>
                  <span style={{ fontSize: 20, color: 'var(--gold)', transition: 'transform 0.28s', transform: openFaq === i ? 'rotate(45deg)' : 'none', marginLeft: 20, flexShrink: 0, lineHeight: 1 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px' }}>
                    <p className="sans" style={{ color: 'var(--muted)', lineHeight: 1.78, fontSize: 15 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA — Full-bleed image
      ══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 440, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src={CTA_IMG}
            alt="Luxury vehicle"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.72)' }} />
        </div>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', padding: '80px 5%', position: 'relative', zIndex: 1, width: '100%' }}>
          <span className="sans" style={{ color: 'var(--gold)', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700 }}>
            Klar til afgang?
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 400, color: 'white',
            marginTop: 18, marginBottom: 18, fontStyle: 'italic', fontFamily: 'var(--font-serif)', lineHeight: 1.1,
          }}>
            {t.cta.title}
          </h2>
          <p className="sans" style={{ color: 'rgba(255,255,255,0.48)', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
            {t.cta.subtitle}
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary sans" onClick={() => openBookingFlow()} style={{ padding: '15px 36px', fontSize: 15 }}>
              Book din bil →
            </button>
            <button className="btn-ghost sans" onClick={() => navigate('contact')} style={{ padding: '15px 36px', fontSize: 15 }}>
              Kontakt os
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
