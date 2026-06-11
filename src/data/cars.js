export const initialCars = [
  {
    id: 1, type: 'Economy', name: 'Seat Ibiza',
    price: 189, weeklyPrice: 159, highSeasonPrice: 239,
    emoji: '🚗', badge: 'Populær', color: '#2563eb',
    availability: 'available', featured: false, image: null,
    defaultImage: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
    features: ['5 sæder', 'Manuel', 'A/C', 'Bluetooth'],
    description: 'Den perfekte økonomi-bil til kystudflugter og bykørsel.',
    year: 2023, fuel: 'Benzin', transmission: 'Manuel', doors: 5, luggage: 2,
  },
  {
    id: 2, type: 'SUV', name: 'Nissan Qashqai',
    price: 349, weeklyPrice: 299, highSeasonPrice: 419,
    emoji: '🚙', badge: 'Bestseller', color: '#7c3aed',
    availability: 'available', featured: true, image: null,
    defaultImage: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
    features: ['5 sæder', 'Automatik', 'A/C', 'GPS'],
    description: 'Rummelig SUV ideel til familier og bjergkørsel.',
    year: 2023, fuel: 'Diesel', transmission: 'Automatik', doors: 5, luggage: 4,
  },
  {
    id: 3, type: 'Cabriolet', name: 'Mazda MX-5',
    price: 449, weeklyPrice: 389, highSeasonPrice: 549,
    emoji: '🏎️', badge: 'Sommerhit', color: '#db2777',
    availability: 'available', featured: true, image: null,
    defaultImage: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&w=800&q=80',
    features: ['2 sæder', 'Manuel', 'A/C', 'Soft-top'],
    description: 'Oplev Spanien med vinden i håret i denne ikoniske roadster.',
    year: 2022, fuel: 'Benzin', transmission: 'Manuel', doors: 2, luggage: 1,
  },
  {
    id: 4, type: 'Luxury', name: 'BMW 5-serie',
    price: 699, weeklyPrice: 599, highSeasonPrice: 849,
    emoji: '✨', badge: 'Premium', color: '#d97706',
    availability: 'available', featured: true, image: null,
    defaultImage: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=800&q=80',
    features: ['5 sæder', 'Automatik', 'Full option', 'Læder'],
    description: 'Ultimativ luksus og køreglæde på de spanske motorveje.',
    year: 2024, fuel: 'Benzin', transmission: 'Automatik', doors: 5, luggage: 3,
  },
  {
    id: 5, type: 'Family Van', name: 'VW Touran',
    price: 389, weeklyPrice: 329, highSeasonPrice: 459,
    emoji: '🚐', badge: 'Familie', color: '#059669',
    availability: 'available', featured: false, image: null,
    defaultImage: 'https://images.unsplash.com/photo-1584345604476-8ec5f452d1f5?auto=format&fit=crop&w=800&q=80',
    features: ['7 sæder', 'Automatik', 'A/C', 'Stort bagagerum'],
    description: 'Plads til hele familien med masser af bagage.',
    year: 2023, fuel: 'Diesel', transmission: 'Automatik', doors: 5, luggage: 6,
  },
  {
    id: 6, type: 'Economy', name: 'Renault Clio',
    price: 175, weeklyPrice: 149, highSeasonPrice: 219,
    emoji: '🚗', badge: 'Budget', color: '#0891b2',
    availability: 'available', featured: false, image: null,
    defaultImage: 'https://images.unsplash.com/photo-1453396450673-3fe277a9a5dd?auto=format&fit=crop&w=800&q=80',
    features: ['5 sæder', 'Manuel', 'A/C', 'USB'],
    description: 'Kompakt og brændstoføkonomisk – perfekt til bykørsel.',
    year: 2023, fuel: 'Benzin', transmission: 'Manuel', doors: 5, luggage: 2,
  },
  {
    id: 7, type: 'SUV', name: 'Toyota RAV4',
    price: 419, weeklyPrice: 369, highSeasonPrice: 499,
    emoji: '🚙', badge: 'Hybrid', color: '#16a34a',
    availability: 'reserved', featured: false, image: null,
    defaultImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    features: ['5 sæder', 'Automatik', 'Hybrid', 'Panoramatag'],
    description: 'Moderne hybrid-SUV med lav brændstofforbrug.',
    year: 2024, fuel: 'Hybrid', transmission: 'Automatik', doors: 5, luggage: 4,
  },
  {
    id: 8, type: 'Luxury', name: 'Mercedes GLC',
    price: 799, weeklyPrice: 699, highSeasonPrice: 949,
    emoji: '✨', badge: 'Eksklusiv', color: '#0f172a',
    availability: 'maintenance', featured: false, image: null,
    defaultImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    features: ['5 sæder', 'Automatik', 'AMG Line', 'Head-up display'],
    description: 'Eksklusiv luksus-SUV med den nyeste teknologi.',
    year: 2024, fuel: 'Benzin', transmission: 'Automatik', doors: 5, luggage: 4,
  },
];

export const AVAILABILITY_STATES = [
  { value: 'available',    label: 'Tilgængelig',    color: '#16a34a', bg: '#dcfce7' },
  { value: 'reserved',     label: 'Reserveret',     color: '#d97706', bg: '#fef3c7' },
  { value: 'maintenance',  label: 'Vedligeholdelse', color: '#dc2626', bg: '#fee2e2' },
  { value: 'hidden',       label: 'Skjult',         color: '#6b7280', bg: '#f3f4f6' },
];

export const CATEGORIES = ['Economy', 'SUV', 'Cabriolet', 'Luxury', 'Family Van'];
export const LOCATIONS = ['Málaga Lufthavn', 'Málaga Centrum', 'Marbella', 'Fuengirola', 'Torremolinos'];

export function daysBetween(a, b) {
  if (!a || !b) return 1;
  const d = Math.round((new Date(b) - new Date(a)) / 86400000);
  return d > 0 ? d : 1;
}

export function getEffectivePrice(car, pickDate, days) {
  if (!car) return 0;
  const base = Number(car.price) || 0;
  const weekly = car.weeklyPrice ? Number(car.weeklyPrice) : null;
  const high = car.highSeasonPrice ? Number(car.highSeasonPrice) : null;

  // Weekly rate has priority — 7+ days always gives the discounted weekly rate
  if (weekly && days >= 7) return weekly;

  // High season (July = month 6, August = month 7)
  if (high && pickDate) {
    const m = new Date(pickDate).getMonth();
    if (m === 6 || m === 7) return high;
  }

  return base;
}

export function lowestPrice(car) {
  const prices = [car.price, car.weeklyPrice, car.highSeasonPrice].map(Number).filter(Boolean);
  return Math.min(...prices);
}

export function fmtDate(d) {
  if (!d) return '—';
  try { return new Date(d).toLocaleDateString('da-DK', { day: '2-digit', month: 'short', year: 'numeric' }); }
  catch { return d; }
}
