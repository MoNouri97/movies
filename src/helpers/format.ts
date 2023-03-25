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
// regex to find all _ or .
export const formatString = (str: string) => {
  return str
    .replace(".desc", "")
    .replace(/[_]/g, " ")
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
};
