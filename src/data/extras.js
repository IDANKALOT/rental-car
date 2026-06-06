export const EXTRAS = [
  { id: 'childSeat',        icon: '🪑', price: 5,  type: 'daily' },
  { id: 'gps',              icon: '🗺️', price: 8,  type: 'daily' },
  { id: 'additionalDriver', icon: '👤', price: 10, type: 'daily' },
  { id: 'fullInsurance',    icon: '🛡️', price: 15, type: 'daily' },
  { id: 'premiumInsurance', icon: '⭐', price: 25, type: 'daily' },
  { id: 'airportPickup',    icon: '✈️', price: 35, type: 'flat'  },
  { id: 'hotelDelivery',   icon: '🏨', price: 25, type: 'flat'  },
];

export const DISCOUNT_CODES = [
  { code: 'SOMMER10', type: 'percent', value: 10, label: '10% rabat' },
  { code: 'NORDIC15', type: 'percent', value: 15, label: '15% til skandinaviske kunder' },
  { code: 'FLAT50',   type: 'flat',    value: 50, label: '€50 off' },
];

export function computeExtrasTotal(extrasState, days) {
  return EXTRAS.reduce((sum, ex) => {
    if (!extrasState[ex.id]) return sum;
    return sum + (ex.type === 'daily' ? ex.price * days : ex.price);
  }, 0);
}
