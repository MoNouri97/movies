import { useQuery } from "@tanstack/react-query";
import api from "~/api/config";
import { GenresResponse } from "~/domain/genre";

export const useGetMovieGenres = () => {
  return useQuery({
    queryKey: ["genre", "movie", "list"],
    queryFn: async () => {
      const response = await api.get<GenresResponse>(`/genre/movie/list`);
      return response.data.genres;
    },
  });
};
