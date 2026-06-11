import { useApp } from '../../context/AppContext';
import Logo from '../common/Logo';

export default function Footer() {
  const { t, navigate } = useApp();

  const cols = [
    {
      title: t.footer.services,
      links: [['Economy', () => navigate('cars')], ['SUV', () => navigate('cars')], ['Cabriolet', () => navigate('cars')], ['Luxury', () => navigate('cars')], ['Family Van', () => navigate('cars')]],
    },
    {
      title: t.footer.dest,
      links: [['Málaga', () => navigate('destinations')], ['Alicante', () => navigate('destinations')], ['Barcelona', () => navigate('destinations')], ['Mallorca', () => navigate('destinations')], ['Marbella', () => navigate('destinations')]],
    },
    {
      title: t.footer.support,
      links: [['FAQ', () => navigate('home')], ['Kontakt', () => navigate('contact')], ['Vilkår', () => navigate('home')], ['GDPR', () => navigate('home')], ['Administration', () => navigate('admin')]],
    },
  ];

  return (
    <footer style={{ background: '#07070a', padding: '64px 5% 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>

          {/* Brand column */}
          <div>
            <div style={{ marginBottom: 22 }}>
              <Logo onClick={() => navigate('home')} />
            </div>
            <p className="sans" style={{ color: 'rgba(255,255,255,0.28)', fontSize: 14, lineHeight: 1.8, maxWidth: 280 }}>
              {t.footer.tagline}
            </p>

            {/* Contact info */}
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="sans" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>Avenida del Mar 24, Marbella</div>
              <div className="sans" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>info@soluxecars.com</div>
              <div className="sans" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>+34 600 000 000</div>
            </div>

            {/* Social links — text only, no icons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
              {['Instagram', 'Facebook', 'YouTube'].map((s) => (
                <span key={s} className="sans" style={{
                  padding: '5px 12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 100,
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: 11,
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  transition: 'border-color 0.2s, color 0.2s',
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="sans" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 22 }}>
                {col.title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {col.links.map(([label, fn]) => (
                  <a
                    key={label}
                    href="#"
                    onClick={(e) => { e.preventDefault(); fn(); }}
                    className="sans foot-link"
                    style={{ color: 'rgba(255,255,255,0.28)', fontSize: 14, textDecoration: 'none', letterSpacing: '0.2px' }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <span className="sans" style={{ color: 'rgba(255,255,255,0.16)', fontSize: 12 }}>
            © 2025 Soluxe. {t.footer.rights}.
          </span>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {['SSL', 'GDPR', 'PCI DSS'].map((b) => (
              <span key={b} className="sans" style={{ color: 'rgba(255,255,255,0.14)', fontSize: 11, letterSpacing: '1px', fontWeight: 700, textTransform: 'uppercase' }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
