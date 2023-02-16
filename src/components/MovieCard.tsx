import { Image, Text, View } from 'react-native';
import { getImage } from '~/api/images';
import { Movie } from '~/domain/movie';

type Props = {
  movie: Movie;
};

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <View className='items-center justify-center mx-2'>
      <Image
        source={{ uri: getImage(movie.poster_path, '300') }}
        className='w-44 h-64 rounded-3xl'
      />
      <Text className='py-4 max-w-[150px] text-center'>{movie.title}</Text>
    </View>
  );
};
export default MovieCard;
