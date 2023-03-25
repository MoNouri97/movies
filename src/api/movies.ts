import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "~/api/config";
import { DetailedMovie, MoviesResponse, SimpleMovie } from "~/domain/movie";

export const useGetMovies = ({
  genres,
  rating,
  sort,
}: {
  genres?: string[];
  rating?: [string, string];
  sort?: string;
} = {}) => {
  return useInfiniteQuery({
    queryKey: ["movies", { genres, rating, sort }],
    queryFn: async ({ pageParam = 1 }) => {
      const currentDate = new Date().toISOString().slice(0, 10);
      // let info = "";
      const param = new URLSearchParams();
      param.append("page", pageParam);
      param.append("primary_release_date.lte", currentDate);
      param.append("vote_count", "50");

      // if (genres) info += "&with_genres=" + genres.join("|");
      if (genres) param.append("with_genres", genres.join("|"));
      if (rating) {
        const [minR, maxR] = rating;
        param.append("vote_average.gte", minR.toString());
        param.append("vote_average.lte", maxR.toString());
        // info += "&vote_average.gte=" + minR;
        // info += "&vote_average.lte=" + maxR;
      }
      if (sort) param.append("sort_by", sort);
      // if (sort) info += "&sort_by=" + sort;
      // const res = await fetch(`/api/movies?page=${page}${info}`);

      param.toString();
      const response = await api.get<MoviesResponse>(
        `discover/movie?${param.toString()}&include_adult=false&include_video=false&primary_release_date.gte=1980-01-01`
      );

      response.data.results = response.data.results.sort(sortMovies);
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page + 1;
    },
  });
};

export const useSearchMovies = (page = 1, query = "") => {
  return useQuery({
    queryKey: ["search", "movie", query],
    queryFn: async () => {
      const currentDate = new Date().toISOString().slice(0, 10);
      const param = new URLSearchParams();
      param.append("query", query);
      param.append("page", page.toString());
      const response = await api.get<MoviesResponse>(
        `search/movie?${param.toString()}&include_adult=false&include_video=false&primary_release_date.lte=${currentDate}`
      );

      return response.data.results.sort(sortMovies);
    },
  });
};

export const useGetMovie = (id: number) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const response = await api.get<DetailedMovie>(`movie/${id}?language=en-US`);

      return response.data;
    },
  });
};

const sortMovies = (a: SimpleMovie, b: SimpleMovie): 1 | -1 | 0 => {
  /** sort is used to  move results with missing data to the bottom of the page */
  //poster
  if (!a.poster_path) return 1;
  if (!b.poster_path) return -1;

  //overview
  if (!a.overview) return 1;
  if (!b.overview) return -1;

  // genres
  if (!a.genre_ids?.length) return 1;
  if (!b.genre_ids?.length) return -1;

  // votes
  if (a.vote_count < 10) return 1;
  if (b.vote_count < 10) return -1;

  // default
  return 0;
};
