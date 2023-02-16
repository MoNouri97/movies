import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useGetMovies } from '~/api/movies';
import MovieCard from '~/components/MovieCard';

const Main: React.FC = () => {
  const { isLoading, data } = useGetMovies();
  return (
    <View>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={movie => `${movie.id}`}
          horizontal
        />
      )}
    </View>
  );
};
export default Main;
