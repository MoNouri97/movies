import { DetailedMovie, SimpleMovie } from "~/domain/movie";

export const formatNumber = (i: number) => {
  return i > 999 ? `${(i / 1000).toFixed(1)}k` : i;
};

export const detailedMovieToSimple = (movie: DetailedMovie): SimpleMovie => {
  return { ...movie, genre_ids: movie.genres.map((g) => g.id) };
};
