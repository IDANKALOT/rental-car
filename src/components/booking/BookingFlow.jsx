import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useBooking } from '../../hooks/useBooking';
import { createBooking } from '../../services/api';
import { EXTRAS, DISCOUNT_CODES, computeExtrasTotal } from '../../data/extras';
import { LOCATIONS, CATEGORIES, fmtDate, getEffectivePrice, lowestPrice } from '../../data/cars';

/* ── Shared sub-components ─────────────────────────────────────────────────── */

function ProgressBar({ steps, current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '0 24px' }}>
      {steps.map((s, i) => {
        const done   = current > s.id;
        const active = current === s.id;
        return (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: done ? 14 : 13, fontWeight: 700, transition: 'all 0.3s', background: done ? '#16a34a' : active ? 'var(--gold)' : 'rgba(255,255,255,0.1)', color: done || active ? (active ? '#0f0f0f' : 'white') : 'rgba(255,255,255,0.4)', border: done ? '2px solid #16a34a' : active ? '2px solid var(--gold)' : '2px solid rgba(255,255,255,0.15)' }}>
                {done ? '✓' : s.icon}
              </div>
              <span className="sans" style={{ fontSize: 9, color: active ? 'var(--gold)' : done ? '#16a34a' : 'rgba(255,255,255,0.35)', fontWeight: active ? 700 : 400, letterSpacing: '0.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done ? '#16a34a' : 'rgba(255,255,255,0.1)', transition: 'background 0.3s', margin: '0 4px', marginBottom: 20 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function PriceSummary({ state, pricing, t }) {
  const { carTotal, extrasTotal, discountAmount, grandTotal } = pricing;
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', borderLeft: '1px solid rgba(255,255,255,0.08)', padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="sans" style={{ color: 'var(--gold)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 4 }}>
        💰 {t.priceBreakdown?.total || 'Pris oversigt'}
      </div>
      {state.selectedCar && (
        <Row label={`${state.selectedCar.name} × ${state.days} dage`} value={`${carTotal} kr`} />
      )}
      {extrasTotal > 0 && <Row label={t.priceBreakdown?.extras || 'Ekstraudstyr'} value={`${extrasTotal} kr`} />}
      {discountAmount > 0 && <Row label={t.priceBreakdown?.discount || 'Rabat'} value={`-${discountAmount} kr`} green />}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 14, marginTop: 4 }}>
        <Row label={t.priceBreakdown?.total || 'I alt'} value={`${grandTotal} kr`} large />
        <p className="sans" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 8 }}>{t.priceBreakdown?.taxes || 'Inkl. moms og afgifter'}</p>
      </div>
      {state.selectedCar && (
        <div style={{ marginTop: 8 }}>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ height: 100, background: state.selectedCar.image ? '#f0f0ef' : `linear-gradient(135deg, ${state.selectedCar.color}20, ${state.selectedCar.color}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {state.selectedCar.image
                ? <img src={state.selectedCar.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: 44 }}>{state.selectedCar.emoji}</span>
              }
            </div>
            <div style={{ padding: '10px 12px' }}>
              <div className="sans" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{state.selectedCar.type}</div>
              <div className="sans" style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>{state.selectedCar.name}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, large, green }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
      <span className="sans" style={{ color: 'rgba(255,255,255,0.5)', fontSize: large ? 15 : 13, fontWeight: large ? 700 : 400 }}>{label}</span>
      <span className="sans" style={{ color: green ? '#4ade80' : large ? 'var(--gold)' : 'rgba(255,255,255,0.85)', fontSize: large ? 18 : 13, fontWeight: large ? 700 : 600 }}>{value}</span>
    </div>
  );
}

function StepTitle({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 36, marginBottom: 8 }}>{icon}</div>
      <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 700, color: 'white', marginBottom: 8 }}>{title}</h2>
      {subtitle && <p className="sans" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>{subtitle}</p>}
    </div>
  );
}

function LightInput({ label, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label className="sans" style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: 10, marginBottom: 6, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{label}{required && ' *'}</label>
      <input type={type} className="inp sans" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ width: '100%' }} />
    </div>
  );
}

/* ── Step 1: Location ──────────────────────────────────────────────────────── */
function Step1({ booking, t }) {
  const [sameReturn, setSameReturn] = useState(booking.state.sameReturn !== false);

  function handleLocation(key, val) {
    const pickup = key === 'pickup' ? val : booking.state.pickup;
    const ret = key === 'ret' ? val : (sameReturn ? pickup : booking.state.returnLoc);
    booking.setLocation(pickup, ret, sameReturn);
  }

  function toggleSame(same) {
    setSameReturn(same);
    booking.setLocation(booking.state.pickup, same ? booking.state.pickup : '', same);
  }

  return (
    <div className="step-enter">
      <StepTitle icon="📍" title={t.steps.location} subtitle={t.booking.placeholder} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div>
          <label className="sans" style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: 10, marginBottom: 6, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{t.booking.pickup}</label>
          <select className="inp sans" value={booking.state.pickup} onChange={(e) => handleLocation('pickup', e.target.value)}>
            <option value="" disabled>{t.booking.placeholder}</option>
            {LOCATIONS.map((l) => <option key={l} value={l} style={{ background: '#1a1a1a' }}>{l}</option>)}
          </select>
        </div>
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {[{ v: true, label: t.booking.sameReturn }, { v: false, label: t.booking.differentReturn }].map(({ v, label }) => (
              <button key={String(v)} onClick={() => toggleSame(v)} className="sans"
                style={{ flex: 1, background: sameReturn === v ? 'rgba(200,150,60,0.2)' : 'rgba(255,255,255,0.06)', border: `1px solid ${sameReturn === v ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`, color: sameReturn === v ? 'var(--gold)' : 'rgba(255,255,255,0.5)', borderRadius: 8, padding: '6px 8px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                {label}
              </button>
            ))}
          </div>
          {!sameReturn && (
            <select className="inp sans" value={booking.state.returnLoc} onChange={(e) => handleLocation('ret', e.target.value)}>
              <option value="" disabled>{t.booking.placeholder}</option>
              {LOCATIONS.map((l) => <option key={l} value={l} style={{ background: '#1a1a1a' }}>{l}</option>)}
            </select>
          )}
          {sameReturn && booking.state.pickup && (
            <div className="inp sans" style={{ color: 'rgba(255,255,255,0.4)', padding: '12px 14px', fontSize: 14 }}>{booking.state.pickup}</div>
          )}
        </div>
      </div>

      {/* Location cards */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
        {LOCATIONS.map((loc) => (
          <button key={loc} onClick={() => handleLocation('pickup', loc)} className="sans"
            style={{ background: booking.state.pickup === loc ? 'rgba(200,150,60,0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${booking.state.pickup === loc ? 'var(--gold)' : 'rgba(255,255,255,0.08)'}`, color: booking.state.pickup === loc ? 'var(--gold)' : 'rgba(255,255,255,0.6)', borderRadius: 10, padding: '8px 14px', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}>
            📍 {loc}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Step 2: Dates ─────────────────────────────────────────────────────────── */
function Step2({ booking, t }) {
  const today = new Date().toISOString().split('T')[0];
  return (
    <div className="step-enter">
      <StepTitle icon="📅" title={t.steps.dates} subtitle="Vælg afhentnings- og afleveringsdato" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div>
          <label className="sans" style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: 10, marginBottom: 8, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{t.booking.pickDate}</label>
          <input type="date" className="inp sans" min={today} value={booking.state.pickDate} onChange={(e) => booking.setDates(e.target.value, booking.state.returnDate)} style={{ fontSize: 15, padding: '14px' }} />
        </div>
        <div>
          <label className="sans" style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: 10, marginBottom: 8, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{t.booking.returnDate}</label>
          <input type="date" className="inp sans" min={booking.state.pickDate || today} value={booking.state.returnDate} onChange={(e) => booking.setDates(booking.state.pickDate, e.target.value)} style={{ fontSize: 15, padding: '14px' }} />
        </div>
      </div>
      {booking.state.days > 0 && booking.state.pickDate && booking.state.returnDate && (
        <div className="glass" style={{ borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 28 }}>📆</span>
          <div>
            <div className="sans" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Varighed</div>
            <div className="sans" style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>{booking.state.days} dage</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div className="sans" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{fmtDate(booking.state.pickDate)}</div>
            <div className="sans" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>→ {fmtDate(booking.state.returnDate)}</div>
          </div>
        </div>
      )}
      {booking.state.pickDate && new Date(booking.state.pickDate).getMonth() >= 6 && new Date(booking.state.pickDate).getMonth() <= 7 && (
        <div style={{ marginTop: 12, background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: 12, padding: '12px 16px' }}>
          <span className="sans" style={{ color: '#fb923c', fontSize: 13 }}>☀️ Du rejser i højsæson (juli–august) – visse biler har sæsonpris.</span>
        </div>
      )}
    </div>
  );
}

/* ── Step 3: Vehicle ───────────────────────────────────────────────────────── */
function Step3({ booking, t, visibleCars }) {
  const [catFilter, setCatFilter] = useState('all');
  const filtered = visibleCars.filter((c) => catFilter === 'all' || c.type === catFilter);

  return (
    <div className="step-enter">
      <StepTitle icon="🚗" title={t.steps.vehicle} subtitle={t.pages.carsSub} />
      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {['all', ...CATEGORIES].map((cat) => (
          <button key={cat} onClick={() => setCatFilter(cat)} className="sans"
            style={{ background: catFilter === cat ? 'var(--gold)' : 'rgba(255,255,255,0.06)', color: catFilter === cat ? '#0f0f0f' : 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
            {cat === 'all' ? t.pages.filterAll : cat}
          </button>
        ))}
      </div>
      {/* Car list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((car) => {
          const price = getEffectivePrice(car, booking.state.pickDate, booking.state.days);
          const total = price * booking.state.days;
          const selected = booking.state.selectedCar?.id === car.id;
          return (
            <div key={car.id} onClick={() => booking.selectCar(car)}
              style={{ background: selected ? 'rgba(200,150,60,0.12)' : 'rgba(255,255,255,0.04)', border: `2px solid ${selected ? 'var(--gold)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', transition: 'all 0.25s' }}>
              <div style={{ width: 72, height: 72, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: car.image ? '#f0f0ef' : `linear-gradient(135deg, ${car.color}20, ${car.color}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {car.image ? <img src={car.image} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: 32 }}>{car.emoji}</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div className="sans" style={{ fontSize: 10, color: car.color, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700 }}>{car.type}</div>
                <div style={{ fontWeight: 700, fontSize: 17, color: 'white', marginTop: 2 }}>{car.name}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                  {car.features.slice(0, 3).map((f) => (
                    <span key={f} className="sans" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.06)', borderRadius: 6, padding: '2px 7px' }}>{f}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div className="sans" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>{price} kr/dag</div>
                <div style={{ fontWeight: 700, fontSize: 20, color: selected ? 'var(--gold)' : 'white' }}>{total} kr</div>
                <div className="sans" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>i alt</div>
              </div>
              {selected && <div style={{ color: 'var(--gold)', fontSize: 22, flexShrink: 0 }}>✓</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Step 4: Extras ────────────────────────────────────────────────────────── */
function Step4({ booking, t }) {
  return (
    <div className="step-enter">
      <StepTitle icon="✨" title={t.extras.title} subtitle={t.extras.subtitle} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {EXTRAS.map((ex) => {
          const selected = booking.state.extras[ex.id];
          const labelKey = ex.id;
          const descKey = ex.id + 'Desc';
          return (
            <div key={ex.id} onClick={() => booking.toggleExtra(ex.id)}
              style={{ background: selected ? 'rgba(200,150,60,0.12)' : 'rgba(255,255,255,0.04)', border: `2px solid ${selected ? 'var(--gold)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 16, padding: '18px 16px', cursor: 'pointer', transition: 'all 0.25s', position: 'relative' }}>
              {selected && (
                <div style={{ position: 'absolute', top: 10, right: 10, width: 20, height: 20, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#0f0f0f', fontWeight: 700 }}>✓</div>
              )}
              <div style={{ fontSize: 28, marginBottom: 8 }}>{ex.icon}</div>
              <div className="sans" style={{ color: selected ? 'var(--gold)' : 'white', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{t.extras[labelKey]}</div>
              <div className="sans" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginBottom: 8, lineHeight: 1.4 }}>{t.extras[descKey]}</div>
              <div className="sans" style={{ color: selected ? 'var(--gold)' : 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: 14 }}>
                +{ex.price} kr{ex.type === 'daily' ? t.extras.perDay : ` ${t.extras.flat}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Step 5: Customer Details ──────────────────────────────────────────────── */
function Step5({ booking, t }) {
  const c = booking.state.customer;
  const set = (k) => (v) => booking.setCustomer({ [k]: v });
  const hasAirportPickup = booking.state.extras.airportPickup;
  return (
    <div className="step-enter">
      <StepTitle icon="👤" title={t.steps.details} subtitle="Fortæl os lidt om dig" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        <div style={{ paddingRight: 8 }}>
          <LightInput label={t.customerForm.name} value={c.name} onChange={set('name')} required />
          <LightInput label={t.customerForm.phone} type="tel" value={c.phone} onChange={set('phone')} required />
          {hasAirportPickup && <LightInput label={t.customerForm.flightNumber} value={c.flightNumber} onChange={set('flightNumber')} placeholder="SK203" />}
        </div>
        <div style={{ paddingLeft: 8 }}>
          <LightInput label={t.customerForm.email} type="email" value={c.email} onChange={set('email')} required />
          <div style={{ marginBottom: 14 }}>
            <label className="sans" style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: 10, marginBottom: 6, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{t.customerForm.country}</label>
            <select className="inp sans" value={c.country} onChange={(e) => set('country')(e.target.value)}>
              {['Danmark', 'Sverige', 'Norge', 'Finland', 'Tyskland', 'UK', 'Spanien', 'Andet'].map((c) => (
                <option key={c} value={c} style={{ background: '#1a1a1a' }}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label className="sans" style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: 10, marginBottom: 6, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{t.customerForm.requests}</label>
        <textarea className="inp sans" rows={3} value={c.requests} onChange={(e) => set('requests')(e.target.value)} style={{ resize: 'vertical' }} />
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
        <input type="checkbox" checked={c.newsletter} onChange={(e) => set('newsletter')(e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--gold)' }} />
        <span className="sans" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{t.customerForm.newsletter}</span>
      </label>
    </div>
  );
}

/* ── Step 6: Payment ───────────────────────────────────────────────────────── */
function Step6({ booking, t, pricing }) {
  const { grandTotal, discountAmount } = pricing;
  const p = booking.state.payment;
  const set = (k) => (v) => booking.setPayment({ [k]: v });
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');

  function applyCode() {
    const found = DISCOUNT_CODES.find((c) => c.code === codeInput.toUpperCase().trim());
    if (found) { booking.applyDiscount(found); setCodeInput(''); setCodeError(''); }
    else setCodeError(t.payment.invalidCode);
  }

  return (
    <div className="step-enter">
      <StepTitle icon="💳" title={t.payment.title} subtitle={t.payment.method} />
      {/* Payment method */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        {[{ id: 'card', label: `💳 ${t.payment.card}` }, { id: 'paypal', label: 'PayPal' }, { id: 'stripe', label: 'Stripe' }].map((m) => (
          <button key={m.id} onClick={() => set('method')(m.id)} className="sans"
            style={{ flex: 1, background: p.method === m.id ? 'rgba(200,150,60,0.18)' : 'rgba(255,255,255,0.05)', border: `2px solid ${p.method === m.id ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`, color: p.method === m.id ? 'var(--gold)' : 'rgba(255,255,255,0.6)', borderRadius: 12, padding: '12px 8px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            {m.label}
          </button>
        ))}
      </div>
      {/* Card form */}
      {p.method === 'card' && (
        <div style={{ marginBottom: 20 }}>
          <LightInput label={t.payment.cardNo} value={p.cardNumber} onChange={set('cardNumber')} placeholder="4242 4242 4242 4242" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <LightInput label={t.payment.expiry} value={p.expiry} onChange={set('expiry')} placeholder="12/27" />
            <LightInput label={t.payment.cvc} value={p.cvc} onChange={set('cvc')} placeholder="123" />
          </div>
        </div>
      )}
      {p.method !== 'card' && (
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '16px 20px', marginBottom: 20, textAlign: 'center' }}>
          <p className="sans" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Du sendes videre til {p.method === 'paypal' ? 'PayPal' : 'Stripe'} for sikker betaling.</p>
        </div>
      )}
      {/* Discount code */}
      <div style={{ marginBottom: 20 }}>
        <label className="sans" style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: 10, marginBottom: 6, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{t.payment.discount}</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <input className="inp sans" style={{ flex: 1 }} placeholder="SOMMER10" value={codeInput} onChange={(e) => setCodeInput(e.target.value)} />
          <button onClick={applyCode} className="sans" style={{ background: 'var(--gold)', border: 'none', color: '#0f0f0f', borderRadius: 10, padding: '0 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{t.payment.applyDiscount}</button>
        </div>
        {codeError && <p className="sans" style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{codeError}</p>}
        {p.discountApplied && <p className="sans" style={{ color: '#4ade80', fontSize: 12, marginTop: 4 }}>✓ {p.discountApplied.label}</p>}
      </div>
      {/* Terms */}
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 20 }}>
        <input type="checkbox" checked={p.termsAccepted} onChange={(e) => set('termsAccepted')(e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--gold)', marginTop: 2 }} />
        <span className="sans" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.5 }}>{t.payment.terms}</span>
      </label>
      {/* Total */}
      <div style={{ background: 'rgba(200,150,60,0.1)', border: '1px solid rgba(200,150,60,0.25)', borderRadius: 14, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="sans" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>{t.priceBreakdown?.total || 'I alt'}</span>
        <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--gold)' }}>{grandTotal} kr</span>
      </div>
    </div>
  );
}

/* ── Step 7: Confirmation ──────────────────────────────────────────────────── */
function Step7({ booking, t, onClose, onViewBookings }) {
  return (
    <div className="step-enter" style={{ textAlign: 'center', paddingTop: 20 }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 700, color: 'white', marginBottom: 12 }}>{t.payment.success}</h2>
      <p className="sans" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 8 }}>{t.payment.successSub}</p>
      <div className="glass" style={{ borderRadius: 14, padding: '14px 24px', display: 'inline-block', marginBottom: 28 }}>
        <span className="sans" style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 18, letterSpacing: '2px' }}>{booking.state.bookingRef}</span>
      </div>
      {booking.state.selectedCar && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 56 }}>{booking.state.selectedCar.emoji}</div>
          <div className="sans" style={{ color: 'white', fontWeight: 600, fontSize: 16, marginTop: 6 }}>{booking.state.selectedCar.name}</div>
          <div className="sans" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
            {booking.state.pickup} → {fmtDate(booking.state.pickDate)} – {fmtDate(booking.state.returnDate)}
          </div>
        </div>
      )}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn-primary sans" onClick={onViewBookings} style={{ padding: '12px 28px' }}>{t.payment.viewBookings}</button>
        <button className="sans" onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: 12, padding: '12px 24px', cursor: 'pointer', fontSize: 14 }}>{t.bookingModal.close}</button>
      </div>
    </div>
  );
}

/* ── Main BookingFlow component ────────────────────────────────────────────── */
export default function BookingFlow() {
  const { t, bookingFlow, closeBookingFlow, visibleCars, addBooking, user, navigate } = useApp();
  const booking = useBooking(bookingFlow.draft);
  const { pricing } = booking;
  const [paying, setPaying] = useState(false);

  const steps = [
    { id: 1, label: t.steps.location,     icon: '📍' },
    { id: 2, label: t.steps.dates,        icon: '📅' },
    { id: 3, label: t.steps.vehicle,      icon: '🚗' },
    { id: 4, label: t.steps.extras,       icon: '✨' },
    { id: 5, label: t.steps.details,      icon: '👤' },
    { id: 6, label: t.steps.payment,      icon: '💳' },
    { id: 7, label: t.steps.confirmation, icon: '✅' },
  ];

  function canProceed() {
    const s = booking.state;
    if (s.step === 1) return !!s.pickup;
    if (s.step === 2) return !!(s.pickDate && s.returnDate);
    if (s.step === 3) return !!s.selectedCar;
    if (s.step === 5) return !!(s.customer.name && s.customer.email && s.customer.phone);
    if (s.step === 6) return s.payment.termsAccepted;
    return true;
  }

  async function handleNext() {
    if (booking.state.step === 6) {
      if (!user) { closeBookingFlow(); navigate('login'); return; }
      setPaying(true);
      const ref = 'CDC-' + Math.floor(100000 + Math.random() * 900000);
      const newBooking = {
        id: ref,
        userId: user.id,
        car: booking.state.selectedCar,
        pickup: booking.state.pickup,
        dropoff: booking.state.returnLoc || booking.state.pickup,
        pickDate: booking.state.pickDate,
        returnDate: booking.state.returnDate,
        days: booking.state.days,
        extras: { ...booking.state.extras },
        customer: { ...booking.state.customer },
        paymentMethod: booking.state.payment.method,
        total: pricing.grandTotal,
        status: 'confirmed',
      };
      try {
        await createBooking(newBooking);
      } catch (_) { /* fall through – still confirm locally */ }
      addBooking(newBooking);
      booking.complete(ref);
      setPaying(false);
    } else {
      booking.nextStep();
    }
  }

  // Close on Escape
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') closeBookingFlow(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [closeBookingFlow]);

  function renderStep() {
    const s = booking.state.step;
    if (s === 1) return <Step1 booking={booking} t={t} />;
    if (s === 2) return <Step2 booking={booking} t={t} />;
    if (s === 3) return <Step3 booking={booking} t={t} visibleCars={visibleCars} />;
    if (s === 4) return <Step4 booking={booking} t={t} />;
    if (s === 5) return <Step5 booking={booking} t={t} />;
    if (s === 6) return <Step6 booking={booking} t={t} pricing={pricing} />;
    if (s === 7) return <Step7 booking={booking} t={t} onClose={closeBookingFlow} onViewBookings={() => { closeBookingFlow(); navigate('account'); }} />;
  }

  const isLastStep  = booking.state.step === 6;
  const isDone      = booking.state.step === 7;

  return (
    <div onClick={closeBookingFlow} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', zIndex: 10000, display: 'flex', alignItems: 'stretch', justifyContent: 'center', padding: '0' }}>
      <div onClick={(e) => e.stopPropagation()} className="modal-content" style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1209 50%, #0f0f0f 100%)', width: '100%', maxWidth: 960, display: 'flex', flexDirection: 'column', maxHeight: '100vh', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 20, color: 'white' }}>
            🌊 <span className="shimmer-text">Costa Drive Club</span>
          </div>
          <button onClick={closeBookingFlow} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: 'rgba(255,255,255,0.6)', borderRadius: '50%', width: 34, height: 34, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Progress */}
        {!isDone && (
          <div style={{ padding: '20px 24px 12px', flexShrink: 0 }}>
            <ProgressBar steps={steps} current={booking.state.step} />
          </div>
        )}

        {/* Body */}
        <div className="booking-flow-grid" style={{ display: 'grid', gridTemplateColumns: isDone ? '1fr' : '1fr 300px', flex: 1, overflow: 'hidden' }}>
          <div style={{ overflowY: 'auto', padding: '24px 28px' }}>
            {renderStep()}
          </div>
          {!isDone && (
            <div className="booking-flow-sidebar" style={{ overflowY: 'auto', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              <PriceSummary state={booking.state} pricing={pricing} t={t} />
            </div>
          )}
        </div>

        {/* Nav */}
        {!isDone && (
          <div style={{ padding: '16px 28px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            {booking.state.step > 1
              ? <button onClick={booking.prevStep} className="sans" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>← Tilbage</button>
              : <div />
            }
            <button onClick={handleNext} disabled={!canProceed() || paying} className="btn-primary sans"
              style={{ padding: '13px 32px', fontSize: 15, opacity: (canProceed() && !paying) ? 1 : 0.45, cursor: (canProceed() && !paying) ? 'pointer' : 'not-allowed' }}>
              {paying ? '⏳ Behandler...' : isLastStep ? `💳 Betal ${pricing.grandTotal} kr` : 'Fortsæt →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
