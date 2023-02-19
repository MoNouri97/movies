import { Image, View } from "react-native";
import { getImage } from "~/api/images";
import Rating from "~/components/Rating";
import { Movie } from "~/domain/movie";

type Props = {
  movie: Movie;
};

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <View className=" mx-2 h-[320px] items-center justify-start">
      <Image
        source={{ uri: getImage(movie.poster_path, "200") }}
        className="h-52 w-36 rounded-xl"
      />
      {/* <AppText variant="LABEL" className="mt-2 max-w-[150px] text-center">
        {movie.title}
      </AppText> */}
      <Rating rating={movie.vote_average} />
    </View>
  );
};
export default MovieCard;
