import { FlatList, TouchableOpacity, View } from "react-native";
import MovieCard, { CARD_HEIGHT, CARD_WIDTH } from "~/components/MovieCard";
import SectionTitle from "~/components/SectionTitle";
import Typography from "~/components/Typography";
import { SimpleMovie } from "~/domain/movie";

type Props = {
  data?: SimpleMovie[];
  isLoading?: boolean;
  onSeeAllPress?: () => void;
  onMoviePress: (m: SimpleMovie) => void;
  title: string;
};

const HMoviesSection = ({
  title,
  data = [],
  isLoading = false,
  onMoviePress,
  onSeeAllPress,
}: Props) => {
  return (
    <>
      <View className="ml-6 flex justify-start">
        <SectionTitle title={title} onSeeAllPress={onSeeAllPress} />
      </View>
      {isLoading ? (
        <View
          className="mx-2 my-4 items-center  justify-center rounded-xl bg-slate-500/10"
          style={{ height: CARD_HEIGHT, width: CARD_WIDTH }}
        >
          <Typography>Loading</Typography>
        </View>
      ) : (
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onMoviePress(item)}>
                <MovieCard movie={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(movie) => `${movie.id}`}
            horizontal
            className="h-72 p-4"
          />
        </View>
      )}
    </>
  );
};
export default HMoviesSection;
