import { DetailedMovie, SimpleMovie } from "~/domain/movie";

export const formatNumber = (i: number) => {
  return i > 999 ? `${(i / 1000).toFixed(1)}k` : i;
};

export const detailedMovieToSimple = (movie: DetailedMovie): SimpleMovie => {
  return { ...movie, genre_ids: movie.genres.map((g) => g.id) };
};

export const numberWithComma = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatMoney = (x: number) => {
  if (x == 0) {
    return "N/A";
  }
  return `${numberWithComma(x)} \$`;
};
