import api from '~/api/config';
import { MoviesResponse } from '~/domain/movie';
import { useQuery } from '@tanstack/react-query';

export const useGetMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const currentDate = new Date().toISOString().slice(0, 10);
      const response = await api.get<MoviesResponse>(
        `discover/movie?vote_count.gte=50&include_adult=false&include_video=false&primary_release_date.gte=1980-01-01&primary_release_date.lte=${currentDate}`,
      );

      return response.data.results;
    },
  });
};
