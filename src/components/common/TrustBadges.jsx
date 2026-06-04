import { useApp } from '../../context/AppContext';
import SectionHead from './SectionHead';

const badges = [
  { icon: '⭐', key: 'google',    color: '#f59e0b' },
  { icon: '🏆', key: 'trustpilot', color: '#00b67a' },
  { icon: '🔒', key: 'secure',    color: '#3b82f6' },
  { icon: '🛡️', key: 'insurance', color: '#8b5cf6' },
  { icon: '🇩🇰', key: 'support',  color: '#c8963c' },
  { icon: '✅', key: 'verified',  color: '#059669' },
];

const googleReviews = [
  { name: 'Mette H.', city: 'Aarhus', stars: 5, text: 'Fantastisk service! Bilen var ren og klar da vi ankom til Málaga. Intet bøvl, ingen overraskelser.' },
  { name: 'Lars K.', city: 'Stockholm', stars: 5, text: 'Bookede online på 3 minutter. Modtog bilen i Barcelona og havde en perfekt uge på Costa Brava.' },
  { name: 'Sarah B.', city: 'Oslo', stars: 5, text: 'Dansk kundeservice var guld værd. Ringte med et spørgsmål og fik svar med det samme. 5 stjerner!' },
  { name: 'Thomas M.', city: 'København', stars: 5, text: 'Tredje gang vi lejer bil hos dem. Prisen er uslåelig og servicen er top. Ses næste sommer!' },
];

function Stars({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#f59e0b', fontSize: 14 }}>★</span>
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

        {/* Trust badge grid */}
        <div className="trust-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 64 }}>
          {badges.map((b) => (
            <div key={b.key} className="glass" style={{ borderRadius: 'var(--radius)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${b.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                {b.icon}
              </div>
              <span className="sans" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>
                {t.trust[b.key]}
              </span>
            </div>
          ))}
        </div>

        {/* Google Reviews */}
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#f59e0b', fontSize: 20 }}>★</span>)}
          </div>
          <span className="sans" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>{t.reviews.rating}</span>
        </div>

        <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {googleReviews.map((r, i) => (
            <div key={i} className="review-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius)', padding: 24 }}>
              <Stars count={r.stars} />
              <p className="sans" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.7, margin: '14px 0 18px', fontStyle: 'italic' }}>
                "{r.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f0f0f', fontWeight: 700, fontSize: 15 }}>
                  {r.name[0]}
                </div>
                <div>
                  <div className="sans" style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                  <div className="sans" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{r.city}</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <span className="sans" style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700 }}>
                    ✓ {t.reviews.verified}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secure payment strip */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          {['🔒 SSL', '💳 PCI DSS', '🛡️ Kasko', '✈️ IATA', '🌍 Trustpilot'].map((b) => (
            <span key={b} className="sans" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, letterSpacing: '1px', fontWeight: 600 }}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
