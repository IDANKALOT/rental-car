import { useState } from 'react';
import { useApp } from '../context/AppContext';
import SectionHead from '../components/common/SectionHead';
import { sendContactForm } from '../services/api';

function InfoRow({ icon, label, value, last }) {
  return (
    <div style={{ display: 'flex', gap: 14, paddingBottom: last ? 0 : 16, marginBottom: last ? 0 : 16, borderBottom: last ? 'none' : '1px solid #f0f0f0' }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <div>
        <div className="sans" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 2 }}>{label}</div>
        <div className="sans" style={{ fontSize: 15, color: 'var(--dark)' }}>{value}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { t, setShowWhatsApp } = useApp();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSend() {
    setLoading(true);
    await sendContactForm(form);
    setLoading(false);
    setSent(true);
  }

  return (
    <section style={{ padding: '120px 5% 80px', background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHead label="Kontakt" title={t.pages.contactTitle} subtitle={t.pages.contactSub} />

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          {/* Form */}
          <div style={{ background: 'white', borderRadius: 20, padding: 32, boxShadow: 'var(--shadow-sm)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                <p className="sans" style={{ fontSize: 17, color: '#333' }}>{t.contact.sent}</p>
              </div>
            ) : (
              <>
                {[
                  { label: t.contact.name,    key: 'name',    type: 'text' },
                  { label: t.contact.email,   key: 'email',   type: 'email' },
                  { label: t.contact.phone,   key: 'phone',   type: 'tel' },
                ].map(({ label, key, type }) => (
                  <div key={key} style={{ marginBottom: 14 }}>
                    <label className="sans" style={{ display: 'block', color: 'var(--muted)', fontSize: 10, marginBottom: 6, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{label}</label>
                    <input type={type} className="linp sans" value={form[key]} onChange={set(key)} />
                  </div>
                ))}
                <div style={{ marginBottom: 16 }}>
                  <label className="sans" style={{ display: 'block', color: 'var(--muted)', fontSize: 10, marginBottom: 6, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{t.contact.message}</label>
                  <textarea className="linp sans" rows={4} value={form.message} onChange={set('message')} style={{ resize: 'vertical' }} />
                </div>
                <button className="btn-primary sans" onClick={handleSend} disabled={loading} style={{ width: '100%', padding: 14, opacity: loading ? 0.7 : 1 }}>
                  {loading ? '⏳ Sender...' : t.contact.send}
                </button>
              </>
            )}
          </div>

          {/* Info + Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
              <InfoRow icon="📍" label={t.contact.address} value="Avenida del Mar 24, 29602 Marbella, España" />
              <InfoRow icon="📞" label="Telefon" value="+34 600 000 000" />
              <InfoRow icon="✉️" label="E-mail" value="hej@costadriveclub.es" />
              <InfoRow icon="🕒" label={t.contact.openHours} value={t.contact.hours} last />
              <button className="sans" onClick={() => setShowWhatsApp(true)}
                style={{ width: '100%', background: '#25D366', border: 'none', color: 'white', borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 16 }}>
                💬 WhatsApp
              </button>
            </div>
            <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-sm)', flex: 1, minHeight: 240 }}>
              <iframe title="map" width="100%" height="100%" style={{ border: 0, display: 'block', minHeight: 240 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Marbella,Spain&z=12&output=embed" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
