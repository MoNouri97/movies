import React, { createContext, ReactNode, useCallback, useState } from "react";
import { DetailedMovie } from "~/domain/movie";

type HistoryContextState = {
  recent: DetailedMovie[];
  push: (movie: DetailedMovie) => void;
};
export const HistoryContext = createContext<HistoryContextState | null>(null);
export default HistoryContext;

export const HistoryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [recent, setRecent] = useState<DetailedMovie[]>([]);

  const push = useCallback(
    (movie: DetailedMovie) => {
      setTimeout(() => {
        setRecent([movie, ...recent.filter((m) => m.id != movie.id)]);
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
