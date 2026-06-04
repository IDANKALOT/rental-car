import { useReducer, useCallback } from 'react';
import { EXTRAS, computeExtrasTotal } from '../data/extras';
import { daysBetween, getEffectivePrice } from '../data/cars';

const emptyExtras = Object.fromEntries(EXTRAS.map((e) => [e.id, false]));

export const initialBookingState = {
  step: 1,
  pickup: '',
  returnLoc: '',
  sameReturn: true,
  pickDate: '',
  returnDate: '',
  days: 1,
  selectedCar: null,
  extras: { ...emptyExtras },
  customer: { name: '', email: '', phone: '', country: 'Danmark', flightNumber: '', requests: '', newsletter: false },
  payment: { method: 'card', cardNumber: '', expiry: '', cvc: '', discountCode: '', discountApplied: null, termsAccepted: false },
  bookingRef: null,
  completed: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step };
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, 7) };
    case 'PREV_STEP':
      return { ...state, step: Math.max(state.step - 1, 1) };
    case 'SET_LOCATION':
      return {
        ...state,
        pickup: action.pickup,
        sameReturn: action.sameReturn,
        returnLoc: action.sameReturn ? action.pickup : (action.returnLoc || state.returnLoc),
      };
    case 'SET_DATES': {
      const days = daysBetween(action.pickDate, action.returnDate);
      return { ...state, pickDate: action.pickDate, returnDate: action.returnDate, days };
    }
    case 'SET_CAR':
      return { ...state, selectedCar: action.car };
    case 'TOGGLE_EXTRA':
      return { ...state, extras: { ...state.extras, [action.id]: !state.extras[action.id] } };
    case 'SET_CUSTOMER':
      return { ...state, customer: { ...state.customer, ...action.data } };
    case 'SET_PAYMENT':
      return { ...state, payment: { ...state.payment, ...action.data } };
    case 'APPLY_DISCOUNT':
      return { ...state, payment: { ...state.payment, discountApplied: action.discount, discountCode: '' } };
    case 'COMPLETE':
      return { ...state, step: 7, bookingRef: action.ref, completed: true };
    case 'INIT_FROM_DRAFT':
      return { ...state, pickup: action.pickup || '', returnLoc: action.returnLoc || action.pickup || '', pickDate: action.pickDate || '', returnDate: action.returnDate || '', days: daysBetween(action.pickDate, action.returnDate), step: action.pickup ? 2 : 1 };
    case 'RESET':
      return { ...initialBookingState, extras: { ...emptyExtras } };
    default:
      return state;
  }
}

export function useBooking(initialDraft) {
  const [state, dispatch] = useReducer(reducer, initialBookingState, (init) => {
    if (!initialDraft) return init;
    return {
      ...init,
      pickup: initialDraft.pickup || '',
      returnLoc: initialDraft.returnLoc || initialDraft.pickup || '',
      pickDate: initialDraft.pickDate || '',
      returnDate: initialDraft.returnDate || '',
      days: daysBetween(initialDraft.pickDate, initialDraft.returnDate),
      step: initialDraft.pickup ? 2 : 1,
    };
  });

  const nextStep = useCallback(() => dispatch({ type: 'NEXT_STEP' }), []);
  const prevStep = useCallback(() => dispatch({ type: 'PREV_STEP' }), []);
  const setStep = useCallback((step) => dispatch({ type: 'SET_STEP', step }), []);
  const setLocation = useCallback((pickup, returnLoc, sameReturn) => dispatch({ type: 'SET_LOCATION', pickup, returnLoc, sameReturn }), []);
  const setDates = useCallback((pickDate, returnDate) => dispatch({ type: 'SET_DATES', pickDate, returnDate }), []);
  const selectCar = useCallback((car) => dispatch({ type: 'SET_CAR', car }), []);
  const toggleExtra = useCallback((id) => dispatch({ type: 'TOGGLE_EXTRA', id }), []);
  const setCustomer = useCallback((data) => dispatch({ type: 'SET_CUSTOMER', data }), []);
  const setPayment = useCallback((data) => dispatch({ type: 'SET_PAYMENT', data }), []);
  const applyDiscount = useCallback((discount) => dispatch({ type: 'APPLY_DISCOUNT', discount }), []);
  const complete = useCallback((ref) => dispatch({ type: 'COMPLETE', ref }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  const carPrice = state.selectedCar
    ? getEffectivePrice(state.selectedCar, state.pickDate, state.days)
    : 0;
  const carTotal = carPrice * state.days;
  const extrasTotal = computeExtrasTotal(state.extras, state.days);
  const discountAmount = state.payment.discountApplied
    ? state.payment.discountApplied.type === 'percent'
      ? Math.round((carTotal + extrasTotal) * state.payment.discountApplied.value / 100)
      : state.payment.discountApplied.value
    : 0;
  const grandTotal = Math.max(0, carTotal + extrasTotal - discountAmount);

  return {
    state,
    dispatch,
    nextStep, prevStep, setStep,
    setLocation, setDates, selectCar, toggleExtra,
    setCustomer, setPayment, applyDiscount, complete, reset,
    pricing: { carPrice, carTotal, extrasTotal, discountAmount, grandTotal },
  };
}
