import { useApp } from '../../context/AppContext';
import SectionHead from './SectionHead';

const googleReviews = [
  {
    name: 'Mette H.', city: 'Aarhus', stars: 5,
    text: 'Fantastisk service! Bilen var ren og klar da vi ankom til Málaga. Intet bøvl, ingen overraskelser — præcis som lovet.',
    initials: 'MH', color: '#7c3aed',
  },
  {
    name: 'Lars K.', city: 'Stockholm', stars: 5,
    text: 'Bookede online på 3 minutter. Modtog bilen i Barcelona og havde en perfekt uge på Costa Brava. Kommer helt sikkert igen.',
    initials: 'LK', color: '#059669',
  },
  {
    name: 'Sarah B.', city: 'Oslo', stars: 5,
    text: 'Dansk kundeservice var guld værd. Ringte med et spørgsmål og fik svar med det samme. Professionelt til fingerspidserne.',
    initials: 'SB', color: '#dc2626',
  },
  {
    name: 'Thomas M.', city: 'København', stars: 5,
    text: 'Tredje gang vi lejer bil hos dem. Prisen er uslåelig og servicen er top. Vi ses næste sommer i Marbella!',
    initials: 'TM', color: '#d97706',
  },
];

function Stars({ count = 5, size = 14 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#f59e0b', fontSize: size }}>★</span>
      ))}
    </div>
  );
}

export default function TrustBadges() {
  const { t } = useApp();

  return (
    <section style={{ padding: 'var(--space-24) 5%', background: 'var(--dark)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHead label={t.trust.label} title={t.trust.title} subtitle={t.trust.subtitle} light />

        {/* ── Large stat row ── */}
        <div
          className="trust-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, marginBottom: 72, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 'var(--r-xl)', overflow: 'hidden' }}
        >
          {[
            { n: '4.9', label: 'Google Rating', sub: t.trust.googleSub },
            { n: '50k+', label: t.trust.customersLabel, sub: t.trust.customersSub },
            { n: '98%', label: t.trust.recommendLabel, sub: t.trust.recommendSub },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'var(--surface)',
              padding: '40px 32px',
              textAlign: 'center',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}>
              <div style={{ fontSize: 'clamp(2.5rem,4vw,4rem)', fontWeight: 400, color: 'var(--sand)', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
                {s.n}
              </div>
              <div className="sans" style={{ color: 'white', fontSize: 15, fontWeight: 600, marginTop: 10 }}>{s.label}</div>
              <div className="sans" style={{ color: 'var(--text-subtle)', fontSize: 12, marginTop: 5 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Reviews ── */}
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <Stars count={5} size={22} />
          <p className="sans" style={{ color: 'var(--text-dim)', fontSize: 14, marginTop: 8 }}>{t.reviews.rating}</p>
        </div>

        <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, marginBottom: 56 }}>
          {googleReviews.map((r, i) => (
            <div
              key={i}
              className="review-card"
              style={{
                background: 'var(--surface)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 'var(--r-lg)',
                padding: '28px 28px 24px',
              }}
            >
              <Stars count={r.stars} />
              <p className="sans" style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 15,
                lineHeight: 1.75,
                margin: '16px 0 22px',
                fontStyle: 'italic',
              }}>
                "{r.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: `${r.color}22`,
                  border: `1px solid ${r.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: r.color, fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-sans)', flexShrink: 0,
                }}>
                  {r.initials}
                </div>
                <div>
                  <div className="sans" style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                  <div className="sans" style={{ color: 'var(--text-subtle)', fontSize: 12 }}>{r.city}</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <span className="sans" style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700 }}>
                    {t.reviews.verified}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Trust badge strip ── */}
        <div style={{
          paddingTop: 32,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
          flexWrap: 'wrap',
        }}>
          {[
            ['SSL', t.trust.stripPayment],
            ['PCI DSS', t.trust.stripCard],
            ['Kasko', t.trust.stripInsurance],
            ['IATA', t.trust.stripAccred],
            ['Trustpilot', t.trust.stripTrustpilot],
          ].map(([a, b]) => (
            <div key={a} style={{ textAlign: 'center' }}>
              <div className="sans" style={{ color: 'rgba(255,255,255,0.22)', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{a}</div>
              <div className="sans" style={{ color: 'rgba(255,255,255,0.13)', fontSize: 10, marginTop: 2 }}>{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
