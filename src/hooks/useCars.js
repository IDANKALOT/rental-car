import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseReady } from '../lib/supabase';
import { initialCars } from '../data/cars';

// Convert snake_case DB row → camelCase app object
function fromDb(c) {
  return {
    ...c,
    weeklyPrice:      c.weekly_price      ?? null,
    highSeasonPrice:  c.high_season_price ?? null,
    features:         c.features          ?? [],
  };
}

// Convert camelCase app object → snake_case DB row
function toDb(c) {
  return {
    type:               c.type,
    name:               c.name,
    price:              Number(c.price),
    weekly_price:       c.weeklyPrice      ? Number(c.weeklyPrice)     : null,
    high_season_price:  c.highSeasonPrice  ? Number(c.highSeasonPrice) : null,
    emoji:              c.emoji,
    badge:              c.badge || c.type,
    color:              c.color,
    availability:       c.availability ?? 'available',
    featured:           c.featured ?? false,
    image:              c.image || null,
    features:           Array.isArray(c.features)
                          ? c.features
                          : (c.features || '').split(',').map((s) => s.trim()).filter(Boolean),
    description:        c.description || null,
    year:               c.year   ? Number(c.year)  : null,
    fuel:               c.fuel   || null,
    transmission:       c.transmission || null,
    doors:              c.doors  ? Number(c.doors) : null,
    luggage:            c.luggage ? Number(c.luggage) : null,
  };
}

export function useCars() {
  const [carList, setCars]         = useState([]);
  const [carsLoading, setCarsLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseReady) {
      setCars(initialCars);
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

  const addCar = useCallback(async (car) => {
    if (!isSupabaseReady) {
      setCars((l) => [{ ...car, id: Date.now() }, ...l]);
      return;
    }
    const { data, error } = await supabase.from('cars').insert(toDb(car)).select().single();
    if (!error && data) setCars((l) => [fromDb(data), ...l]);
  }, []);

  const updateCar = useCallback(async (updated) => {
    if (!isSupabaseReady) {
      setCars((l) => l.map((c) => (c.id === updated.id ? updated : c)));
      return;
    }
    const { error } = await supabase.from('cars').update(toDb(updated)).eq('id', updated.id);
    if (!error) setCars((l) => l.map((c) => (c.id === updated.id ? { ...updated } : c)));
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
