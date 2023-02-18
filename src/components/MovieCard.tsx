import { Image, View } from "react-native";
import { getImage } from "~/api/images";
import AppText from "~/components/AppText";
import { Movie } from "~/domain/movie";

type Props = {
  movie: Movie;
};

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <View className="mx-2 h-[320px] items-center justify-start">
      <Image
        source={{ uri: getImage(movie.poster_path, "200") }}
        className="h-64 w-40 rounded-3xl"
      />
      <AppText variant="SUBTITLE" className="mt-2 max-w-[150px] text-center">
        {movie.title}
      </AppText>
    </View>
  );
};
export default MovieCard;
