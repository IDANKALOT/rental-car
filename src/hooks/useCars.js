import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseReady } from '../lib/supabase';
import { initialCars } from '../data/cars';

const LS_KEY = 'soluxe_cars_v1';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveToStorage(cars) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(cars));
  } catch {
    // If storage is full (large images), try without base64 images
    try {
      const slim = cars.map((c) => ({
        ...c,
        image: c.image?.startsWith('data:') ? null : c.image,
      }));
      localStorage.setItem(LS_KEY, JSON.stringify(slim));
    } catch {}
  }
}

// Compress a base64 data URL to max 900px / JPEG 0.75
function compressImage(dataUrl) {
  if (!dataUrl?.startsWith('data:')) return Promise.resolve(dataUrl);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const MAX = 900;
      const scale = Math.min(1, MAX / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', 0.75));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

// Convert snake_case DB row → camelCase app object
function fromDb(c) {
  return {
    ...c,
    weeklyPrice:     c.weekly_price      ?? null,
    highSeasonPrice: c.high_season_price ?? null,
    features:        c.features          ?? [],
  };
}

// Convert camelCase app object → snake_case DB row
function toDb(c) {
  return {
    type:              c.type,
    name:              c.name,
    price:             Number(c.price),
    weekly_price:      c.weeklyPrice     ? Number(c.weeklyPrice)     : null,
    high_season_price: c.highSeasonPrice ? Number(c.highSeasonPrice) : null,
    emoji:             c.emoji,
    badge:             c.badge || c.type,
    color:             c.color,
    availability:      c.availability ?? 'available',
    featured:          c.featured ?? false,
    image:             c.image || null,
    features:          Array.isArray(c.features)
                         ? c.features
                         : (c.features || '').split(',').map((s) => s.trim()).filter(Boolean),
    description:       c.description || null,
    year:              c.year    ? Number(c.year)    : null,
    fuel:              c.fuel    || null,
    transmission:      c.transmission || null,
    doors:             c.doors   ? Number(c.doors)   : null,
    luggage:           c.luggage ? Number(c.luggage) : null,
    seats:             c.seats   ? Number(c.seats)   : null,
  };
}

export function useCars() {
  const [carList, setCars]            = useState([]);
  const [carsLoading, setCarsLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseReady) {
      const stored = loadFromStorage();
      setCars(stored ?? initialCars);
      setCarsLoading(false);
      return;
    }
    supabase
      .from('cars')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        setCars(data?.length && !error ? data.map(fromDb) : initialCars);
        setCarsLoading(false);
      });
  }, []);

  // Keep localStorage in sync when not using Supabase
  useEffect(() => {
    if (!isSupabaseReady && !carsLoading) {
      saveToStorage(carList);
    }
  }, [carList, carsLoading]);

  const addCar = useCallback(async (car) => {
    const img = await compressImage(car.image);
    const ready = { ...car, image: img };
    if (!isSupabaseReady) {
      setCars((l) => [{ ...ready, id: Date.now() }, ...l]);
      return;
    }
    const { data, error } = await supabase.from('cars').insert(toDb(ready)).select().single();
    if (!error && data) {
      setCars((l) => [fromDb(data), ...l]);
    } else {
      console.error('addCar failed:', error?.message);
      // Still show locally so the session isn't lost
      setCars((l) => [{ ...ready, id: Date.now() }, ...l]);
    }
  }, []);

  const updateCar = useCallback(async (updated) => {
    const img = await compressImage(updated.image);
    const ready = { ...updated, image: img };
    if (!isSupabaseReady) {
      setCars((l) => l.map((c) => (c.id === ready.id ? ready : c)));
      return;
    }
    const { error } = await supabase.from('cars').update(toDb(ready)).eq('id', ready.id);
    if (error) console.error('updateCar failed:', error?.message);
    // Always update local state so the UI reflects the change
    setCars((l) => l.map((c) => (c.id === ready.id ? ready : c)));
  }, []);

  const deleteCar = useCallback(async (id) => {
    if (isSupabaseReady) await supabase.from('cars').delete().eq('id', id);
    setCars((l) => l.filter((c) => c.id !== id));
  }, []);

  const setAvailability = useCallback(async (id, availability) => {
    if (isSupabaseReady) await supabase.from('cars').update({ availability }).eq('id', id);
    setCars((l) => l.map((c) => (c.id === id ? { ...c, availability } : c)));
  }, []);

  const toggleFeatured = useCallback(async (id) => {
    setCars((l) => {
      const car = l.find((c) => c.id === id);
      if (!car) return l;
      const featured = !car.featured;
      if (isSupabaseReady) supabase.from('cars').update({ featured }).eq('id', id);
      return l.map((c) => (c.id === id ? { ...c, featured } : c));
    });
  }, []);

  const visibleCars = carList.filter((c) => c.availability === 'available');

  return { carList, visibleCars, carsLoading, addCar, updateCar, deleteCar, setAvailability, toggleFeatured };
}
