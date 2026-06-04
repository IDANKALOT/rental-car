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
      links: [['FAQ', () => navigate('home')], ['Kontakt', () => navigate('contact')], ['Vilkår', () => navigate('home')], ['GDPR', () => navigate('home')], ['🔧 Admin', () => navigate('admin')]],
    },
  ];

  return (
    <footer style={{ background: '#070707', padding: '60px 5% 30px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ marginBottom: 20 }}><Logo onClick={() => navigate('home')} /></div>
            <p className="sans" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>{t.footer.tagline}</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {['🌐', '📘', '📸', '▶'].map((icon, i) => (
                <button key={i} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', cursor: 'pointer', fontSize: 14 }}>{icon}</button>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="sans" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 20 }}>{col.title}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(([label, fn]) => (
                  <a key={label} href="#" onClick={(e) => { e.preventDefault(); fn(); }} className="sans foot-link"
                    style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, textDecoration: 'none' }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span className="sans" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>
            © 2025 Costa Drive Club. {t.footer.rights}. CVR: DK-XXXXXXXX
          </span>
          <div style={{ display: 'flex', gap: 16 }}>
            {['🔒 GDPR', '🛡️ SSL', '💳 PCI DSS'].map((b) => (
              <span key={b} className="sans" style={{ color: 'rgba(255,255,255,0.18)', fontSize: 11, letterSpacing: '0.5px' }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
