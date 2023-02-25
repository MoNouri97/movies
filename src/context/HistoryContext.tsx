import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { DetailedMovie } from "~/domain/movie";
import { loadFromStorage, saveToStorage } from "~/helpers/asyncStorage";

type HistoryContextState = {
  recent: DetailedMovie[];
  push: (movie: DetailedMovie) => void;
};
export const HistoryContext = createContext<HistoryContextState | null>(null);
export default HistoryContext;

const RECENT_KEY = "RECENT";
export const HistoryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [recent, setRecent] = useState<DetailedMovie[]>([]);
  useEffect(() => {
    loadFromStorage<DetailedMovie[]>(RECENT_KEY).then((savedRecent) => {
      setRecent(savedRecent ?? []);
    });
  }, [setRecent]);

  const push = useCallback(
    (movie: DetailedMovie) => {
      setTimeout(() => {
        const updatedRecent = [
          movie,
          ...recent.filter((m) => m.id != movie.id),
        ];
        setRecent(updatedRecent);
        saveToStorage(updatedRecent, RECENT_KEY);
      }, 10);
    },
    [setRecent, recent]
  );

  return (
    <HistoryContext.Provider value={{ recent, push }}>
      {children}
    </HistoryContext.Provider>
  );
};
