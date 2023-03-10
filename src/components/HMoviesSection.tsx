import { FlatList, TouchableOpacity, View } from "react-native";
import MovieCard from "~/components/MovieCard";
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

const HMoviesSection = ({ title, data = [], isLoading = false, onMoviePress, onSeeAllPress }: Props) => {
  return (
    <>
      <View className="ml-6 flex justify-start">
        <SectionTitle title={title} onSeeAllPress={onSeeAllPress} />
      </View>
      {isLoading ? (
        <Typography>Loading</Typography>
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
