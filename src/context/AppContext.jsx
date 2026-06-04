import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { translations } from '../data/translations';
import { useAuth } from '../hooks/useAuth';
import { useCars } from '../hooks/useCars';
import { fetchUserBookings } from '../services/api';

const AppContext = createContext(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

export function AppProvider({ children }) {
  const [lang, setLang]             = useState('da');
  const [view, setView]             = useState('home');
  const [bookings, setBookings]     = useState([]);
  const [bookingFlow, setBookingFlow] = useState({ open: false, draft: null });
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [pwaPrompt, setPwaPrompt]   = useState(null);

  const auth = useAuth();
  const fleet = useCars();

  const t = useMemo(() => translations[lang] || translations.da, [lang]);

  // Load user's bookings from Supabase whenever the logged-in user changes
  useEffect(() => {
    if (!auth.user?.id) { setBookings([]); return; }
    fetchUserBookings(auth.user.id).then((data) => {
      if (data.length) setBookings(data);
    });
  }, [auth.user?.id]);

  const navigate = useCallback((v) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openBookingFlow = useCallback((draft = null) => {
    setBookingFlow({ open: true, draft });
  }, []);

  const closeBookingFlow = useCallback(() => {
    setBookingFlow({ open: false, draft: null });
  }, []);

  const addBooking = useCallback((booking) => {
    setBookings((b) => [booking, ...b]);
  }, []);

  const value = useMemo(() => ({
    lang, setLang, t, view, navigate,
    ...auth,
    ...fleet,
    bookings, addBooking,
    bookingFlow, openBookingFlow, closeBookingFlow,
    showWhatsApp, setShowWhatsApp,
    pwaPrompt, setPwaPrompt,
  }), [
    lang, t, view,
    auth, fleet,
    bookings, bookingFlow, showWhatsApp, pwaPrompt,
    navigate, openBookingFlow, closeBookingFlow, addBooking,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
