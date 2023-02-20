import { Image, View } from "react-native";
import { getImage } from "~/api/images";
import AppText from "~/components/AppText";
import Rating from "~/components/Rating";
import { SimpleMovie } from "~/domain/movie";

type Props = {
  movie: SimpleMovie;
  showTitle?: boolean;
};
export const CARD_HEIGHT = 300;
export const CARD_WIDTH = 150;
const MovieCard: React.FC<Props> = ({ movie, showTitle = false }) => {
  return (
    <View
      className="mx-2 mb-2 items-center justify-start"
      style={{ height: CARD_HEIGHT, width: CARD_WIDTH }}
    >
      <Image
        source={{ uri: getImage(movie.poster_path, "200") }}
        className="h-52 w-36 rounded-xl"
      />
      <Rating rating={movie.vote_average} />
      {showTitle && (
        <AppText variant="LABEL" className="text-center" numberOfLines={2}>
          {movie.title}
        </AppText>
      )}
    </View>
  );
};
export default MovieCard;
