import { supabase, isSupabaseReady } from '../lib/supabase';

// ── Bookings ──────────────────────────────────────────────────────────────────

export async function createBooking(payload) {
  if (!isSupabaseReady) {
    await new Promise((r) => setTimeout(r, 1400)); // simulate network
    return { id: payload.id };
  }
  const { data, error } = await supabase.from('bookings').insert({
    id:             payload.id,
    user_id:        payload.userId,
    car_data:       payload.car,
    pickup:         payload.pickup,
    dropoff:        payload.dropoff,
    pick_date:      payload.pickDate,
    return_date:    payload.returnDate,
    days:           payload.days,
    extras:         payload.extras,
    customer:       payload.customer,
    payment_method: payload.paymentMethod,
    total:          payload.total,
    status:         'confirmed',
  }).select().single();

  if (error) throw new Error(error.message);
  return data;
}

export async function fetchUserBookings(userId) {
  if (!isSupabaseReady || !userId) return [];
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) return [];
  return (data || []).map((b) => ({
    id:            b.id,
    car:           b.car_data,
    pickup:        b.pickup,
    dropoff:       b.dropoff,
    pickDate:      b.pick_date,
    returnDate:    b.return_date,
    days:          b.days,
    extras:        b.extras,
    customer:      b.customer,
    paymentMethod: b.payment_method,
    total:         b.total,
    status:        b.status,
  }));
}

export async function fetchAllBookings() {
  if (!isSupabaseReady) return [];
  const { data } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });
  return data || [];
}

// ── Contact ───────────────────────────────────────────────────────────────────

export async function sendContactForm(data) {
  if (!isSupabaseReady) {
    await new Promise((r) => setTimeout(r, 800));
    return { success: true };
  }
  const { error } = await supabase.from('contact_messages').insert(data);
  return { success: !error };
}

// ── Payments ──────────────────────────────────────────────────────────────────

export async function processPayment(_payload) {
  // Replace with real Stripe PaymentIntent when ready:
  // const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  // ...
  await new Promise((r) => setTimeout(r, 1400));
  return { success: true, transactionId: 'TXN-' + Date.now() };
}

// ── Analytics ─────────────────────────────────────────────────────────────────

export function trackEvent(event, params = {}) {
  if (typeof window !== 'undefined') {
    if (window.gtag) window.gtag('event', event, params);
    if (window.fbq)  window.fbq('track', event, params);
  }
}
