import React from 'react';
import { Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { API_KEY } from '../env';

const Main: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const currentDate = new Date().toISOString().slice(0, 10);
      return (
        await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&vote_count.gte=50&include_adult=false&include_video=false&primary_release_date.gte=1980-01-01&primary_release_date.lte=${currentDate}`,
        )
      ).json();
    },
  });
  return (
    <View>
      {data.results.map((d: any) => (
        <Text>{d.title}</Text>
      ))}
    </View>
  );
};
export default Main;
