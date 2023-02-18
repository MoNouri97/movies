import React from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { useGetMovies } from '~/api/movies';
import AppScreen from '~/components/AppScreen';
import AppText from '~/components/AppText';
import MovieCard from '~/components/MovieCard';

const Main: React.FC = () => {
  const { isLoading, data } = useGetMovies();
  return (
    <AppScreen safe>
      <TextInput className='h-10 bg-slate-700 m-6 rounded-xl text-white px-4'></TextInput>
      <View className='flex flex-1  justify-center'>
        <AppText variant='TITLE' className='ml-6'>
          Trending
        </AppText>
        {isLoading ? (
          <Text>Loading</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => <MovieCard movie={item} />}
            keyExtractor={movie => `${movie.id}`}
            horizontal
            contentContainerStyle={{
              alignItems: 'flex-start',
            }}
            className='p-4'
          />
        )}
      </View>
    </AppScreen>
  );
};
export default Main;
