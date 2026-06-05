import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function WhatsApp() {
  const { t, showWhatsApp, setShowWhatsApp } = useApp();
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'call'

  const phoneNumber = '34600000000';
  const quickActions = t.wa.quickActions || [];

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>

      {/* Panel */}
      {showWhatsApp && (
        <div className="wa-panel glass-dark" style={{ borderRadius: 20, overflow: 'hidden', width: 320, boxShadow: '0 12px 48px rgba(0,0,0,0.4)' }}>
          {/* Header */}
          <div style={{ background: '#128C7E', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
            <button onClick={() => setShowWhatsApp(false)} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', borderRadius: '50%', width: 26, height: 26, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>👨‍💼</div>
            <div>
              <div className="sans" style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>{t.wa.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'block', boxShadow: '0 0 6px #4ade80' }} />
                <span className="sans" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>{t.wa.online}</span>
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {['chat', 'call'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className="sans" style={{ flex: 1, background: activeTab === tab ? 'rgba(200,150,60,0.15)' : 'transparent', border: 'none', color: activeTab === tab ? 'var(--gold)' : 'rgba(255,255,255,0.5)', padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', borderBottom: activeTab === tab ? '2px solid var(--gold)' : '2px solid transparent' }}>
                {tab === 'chat' ? '💬 Chat' : '📞 Ring'}
              </button>
            ))}
          </div>

          <div style={{ padding: 16 }}>
            {activeTab === 'chat' ? (
              <>
                {/* Greeting bubble */}
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px 12px 12px 0', padding: '12px 14px', marginBottom: 16 }}>
                  <p className="sans" style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55 }}>{t.wa.greeting}</p>
                </div>

                {/* Quick actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                  {quickActions.map((action, i) => (
                    <a key={i} href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(action)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <div className="sans" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: 'rgba(255,255,255,0.8)', cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                        onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}>
                        → {action}
                      </div>
                    </a>
                  ))}
                </div>

                <a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(t.wa.auto)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                  <button className="sans" style={{ width: '100%', background: '#25D366', border: 'none', color: 'white', borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    {t.wa.chat}
                  </button>
                </a>
              </>
            ) : (
              <>
                <div style={{ textAlign: 'center', padding: '12px 0 16px' }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>📞</div>
                  <p className="sans" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 16 }}>+34 600 000 000</p>
                  <p className="sans" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginBottom: 20 }}>Man–Søn 08:00–22:00</p>
                </div>
                <a href={`tel:+${phoneNumber}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <button className="sans" style={{ width: '100%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', border: 'none', color: '#0f0f0f', borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                    {t.wa.call}
                  </button>
                </a>
              </>
            )}
          </div>
        </div>
      )}

      {/* WhatsApp floating button */}
      <button className="wa-btn pulse" onClick={() => setShowWhatsApp((s) => !s)} style={{ width: 56, height: 56, borderRadius: '50%', background: '#25D366', border: 'none', cursor: 'pointer', fontSize: 26, boxShadow: '0 4px 20px rgba(37,211,102,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        💬
      </button>
    </div>
  );
}
