import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LOCATIONS } from '../../data/cars';

function Field({ label, children }) {
  return (
    <div>
      <label className="sans" style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: 10, marginBottom: 6, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>
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
    <div className="glass" style={{ borderRadius: 20, padding: 24 }}>
      <div className="booking-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <Field label={t.booking.pickup}>
          <select className="inp sans" value={draft.pickup} onChange={set('pickup')}>
            <option value="" disabled>{t.booking.placeholder}</option>
            {LOCATIONS.map((l) => <option key={l} value={l} style={{ background: '#1a1a1a' }}>{l}</option>)}
          </select>
        </Field>
        <Field label={t.booking.return}>
          <select className="inp sans" value={draft.returnLoc} onChange={set('returnLoc')}>
            <option value="" disabled>{t.booking.placeholder}</option>
            {LOCATIONS.map((l) => <option key={l} value={l} style={{ background: '#1a1a1a' }}>{l}</option>)}
          </select>
        </Field>
        <Field label={t.booking.pickDate}>
          <input type="date" className="inp sans" value={draft.pickDate} onChange={set('pickDate')} />
        </Field>
        <Field label={t.booking.returnDate}>
          <input type="date" className="inp sans" value={draft.returnDate} onChange={set('returnDate')} />
        </Field>
      </div>
      <button className="btn-primary sans" onClick={handleSearch} style={{ width: '100%', padding: 15, fontSize: 15 }}>
        <span>⚡</span> {t.booking.search}
      </button>
    </div>
  );
}
