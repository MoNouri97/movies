import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "~/api/config";
import { DetailedMovie, MoviesResponse, SimpleMovie } from "~/domain/movie";

export const useGetMovies = (
  options: {
    genres?: string[];
    rating?: [string, string];
    sort?: string;
  } = {}
) => {
  return useInfiniteQuery({
    queryKey: ["movies", options],
    queryFn: async ({ pageParam = 1 }) => {
      const { genres, rating, sort } = options;
      const currentDate = new Date().toISOString().slice(0, 10);
      const param = new URLSearchParams();
      param.append("page", pageParam);
      param.append("primary_release_date.lte", currentDate);
      param.append("vote_count", "20");

      if (genres) param.append("with_genres", genres.join("|"));
      if (rating) {
        const [minR = 0, maxR = 10] = rating;
        param.append("vote_average.gte", minR.toString());
        param.append("vote_average.lte", maxR.toString());
      }
      if (sort) param.append("sort_by", sort);

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
