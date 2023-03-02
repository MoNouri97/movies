import { FlatList, TouchableOpacity, View } from "react-native";
import AppText from "~/components/AppText";
import MovieCard from "~/components/MovieCard";
import SectionTitle from "~/components/SectionTitle";
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
        <AppText>Loading</AppText>
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
