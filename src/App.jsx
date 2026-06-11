import { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Layout
import GlobalStyle from './components/common/GlobalStyle';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Common
import WhatsApp from './components/common/WhatsApp';

// Booking flow
import BookingFlow from './components/booking/BookingFlow';

// Pages
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import DestinationsPage from './pages/DestinationsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';

function AppShell() {
  const { view, bookingFlow, pwaPrompt, setPwaPrompt } = useApp();

  // Capture PWA install prompt
  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setPwaPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [setPwaPrompt]);

  return (
    <div style={{ fontFamily: 'var(--font-serif)', background: 'var(--cream)', color: 'var(--dark)', minHeight: '100vh', overflowX: 'hidden' }}>
      <GlobalStyle />
      <Navbar />

      {/* Pages */}
      {view === 'home'         && <HomePage />}
      {view === 'cars'         && <CarsPage />}
      {view === 'destinations' && <DestinationsPage />}
      {view === 'contact'      && <ContactPage />}
      {view === 'login'        && <LoginPage />}
      {view === 'account'      && <AccountPage />}
      {view === 'admin'        && <AdminPage />}

      <Footer />

      {/* 7-step booking flow modal */}
      {bookingFlow.open && <BookingFlow />}

      {/* WhatsApp + call widget */}
      <WhatsApp />

      {/* PWA install banner */}
      {pwaPrompt && (
        <div className="sans" style={{ position: 'fixed', bottom: 96, left: 24, right: 24, maxWidth: 380, margin: '0 auto', background: 'rgba(15,15,15,0.97)', backdropFilter: 'blur(20px)', border: '1px solid rgba(200,150,60,0.3)', borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, zIndex: 9998, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', animation: 'slideUp 0.3s ease' }}>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 2 }}>📱 Installér Soluxe</div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>Hurtig adgang fra din startskærm</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button onClick={() => setPwaPrompt(null)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: 'rgba(255,255,255,0.5)', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', fontSize: 12 }}>Nej tak</button>
            <button onClick={() => { pwaPrompt.prompt(); setPwaPrompt(null); }}
              style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', border: 'none', color: '#0f0f0f', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>
              Installér
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
