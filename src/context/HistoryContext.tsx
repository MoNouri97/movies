import React, { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { DetailedMovie } from "~/domain/movie";
import { loadFromStorage, saveToStorage } from "~/helpers/asyncStorage";

type HistoryContextState = {
  recent: DetailedMovie[];
  favorites: DetailedMovie[];
  addToHistory: (movie: DetailedMovie) => void;
  toggleFavorite: (movie: DetailedMovie) => void;
};
export const HistoryContext = createContext<HistoryContextState | null>(null);
export default HistoryContext;

const RECENT_KEY = "RECENT";
const FAV_KEY = "FAV";
export const HistoryContextProvider = ({ children }: { children: ReactNode }) => {
  const [recent, setRecent] = useState<DetailedMovie[]>([]);
  const [favorites, setFavorites] = useState<DetailedMovie[]>([]);
  useEffect(() => {
    loadFromStorage<DetailedMovie[]>(RECENT_KEY).then((savedRecent) => {
      setRecent(savedRecent ?? []);
    });
    loadFromStorage<DetailedMovie[]>(FAV_KEY).then((savedFavorites) => {
      setFavorites(savedFavorites ?? []);
    });
  }, [setRecent, setFavorites]);

  const addToHistory = useCallback(
    (movie: DetailedMovie) => {
      setTimeout(() => {
        const updatedRecent = [movie, ...recent.filter((m) => m.id != movie.id)];
        setRecent(updatedRecent);
        saveToStorage(updatedRecent, RECENT_KEY);
      }, 10);
    },
    [setRecent, recent]
  );
  const toggleFavorite = useCallback(
    (movie: DetailedMovie) => {
      setTimeout(() => {
        let updatedFavorites = favorites.filter((m) => m.id != movie.id);
        if (updatedFavorites.length == favorites.length) {
          // movie was not removed so add it
          updatedFavorites = [movie, ...updatedFavorites];
        }
        setFavorites(updatedFavorites);
        saveToStorage(updatedFavorites, FAV_KEY);
      }, 10);
    },
    [setFavorites, favorites]
  );

  return (
    <HistoryContext.Provider value={{ recent, addToHistory, favorites, toggleFavorite }}>
      {children}
    </HistoryContext.Provider>
  );
};
