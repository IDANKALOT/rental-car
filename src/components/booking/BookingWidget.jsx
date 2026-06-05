import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LOCATIONS } from '../../data/cars';

function Field({ label, children }) {
  return (
    <div>
      <label className="sans" style={{
        display: 'block',
        color: 'rgba(255,255,255,0.38)',
        fontSize: 9,
        marginBottom: 7,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        fontWeight: 700,
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function BookingWidget({ onSearch }) {
  const { t, openBookingFlow } = useApp();
  const [draft, setDraft] = useState({ pickup: '', returnLoc: '', pickDate: '', returnDate: '' });
  const set = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.value }));

  function handleSearch() {
    openBookingFlow(draft);
    if (onSearch) onSearch(draft);
  }

  return (
    <div
      className="glass"
      style={{
        borderRadius: 'var(--r-xl)',
        padding: '24px 24px 20px',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
      }}
    >
      <div className="booking-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
        <Field label={t.booking.pickup}>
          <select className="inp sans" value={draft.pickup} onChange={set('pickup')}>
            <option value="" disabled>{t.booking.placeholder}</option>
            {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </Field>
        <Field label={t.booking.return}>
          <select className="inp sans" value={draft.returnLoc} onChange={set('returnLoc')}>
            <option value="" disabled>{t.booking.placeholder}</option>
            {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </Field>
        <Field label={t.booking.pickDate}>
          <input type="date" className="inp sans" value={draft.pickDate} onChange={set('pickDate')} />
        </Field>
        <Field label={t.booking.returnDate}>
          <input type="date" className="inp sans" value={draft.returnDate} onChange={set('returnDate')} />
        </Field>
      </div>
      <button
        className="btn-primary sans"
        onClick={handleSearch}
        style={{ width: '100%', padding: '15px', fontSize: 14, letterSpacing: '0.5px' }}
      >
        {t.booking.search} →
      </button>
    </div>
  );
}
