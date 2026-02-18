import { useState, useEffect } from 'react';
import { AppState } from '../types';

const STORAGE_KEY = 'mi-gusto-pedidos';

const initialState: AppState = {
  contadorActual: 1,
  enPreparacion: [],
  aRetirar: [],
};

export function useLocalStorage() {
  const [state, setState] = useState<AppState>(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : initialState;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [state]);

  // Sincronizar cambios de localStorage entre distintas pestañas/ventanas
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;

      try {
        const newState = JSON.parse(event.newValue) as AppState;

        // Evitar renders innecesarios si el estado ya es el mismo
        setState((prev) => {
          const prevSerialized = JSON.stringify(prev);
          return prevSerialized === event.newValue ? prev : newState;
        });
      } catch (error) {
        console.error('Error parsing state from storage event:', error);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return [state, setState] as const;
}
