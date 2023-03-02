import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useMemo } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useGetMovies } from "~/api/movies";
import { AppScreen } from "~/components/AppScreen";
import MovieCard from "~/components/MovieCard";
import HistoryContext from "~/context/HistoryContext";
import { SimpleMovie } from "~/domain/movie";
import { ParamList } from "~/domain/navigation";
import { detailedMovieToSimple } from "~/helpers/format";

type Props = NativeStackScreenProps<ParamList, "Movies" | "Favorites">;
type ListProps = Props & { data?: SimpleMovie[]; isLoading: boolean };

const MoviesList = ({ navigation, data, isLoading }: ListProps) => {
  return (
    <AppScreen>
      <Image source={require("assets/Background.png")} className=" absolute opacity-40" />
      {/* <AppText variant="TITLE" className="m-4 mt-8">
        Trending Movies
      </AppText> */}
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <View className="items-center justify-center">
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate("Movie", { id: item.id })}>
                <MovieCard movie={item} showTitle />
              </TouchableOpacity>
            )}
            keyExtractor={(movie) => `${movie.id}`}
            numColumns={2}
            className="p-4"
          />
        </View>
      )}
    </AppScreen>
  );
};

export const TrendingMovies = (props: Props) => {
  const { isLoading, data } = useGetMovies();
  return <MoviesList {...props} {...{ isLoading, data }} />;
};

export const FavoriteMovies = (props: Props) => {
  const { favorites } = useContext(HistoryContext)!;
  const data = useMemo(() => favorites.map(detailedMovieToSimple), [favorites]);
  return <MoviesList {...props} data={data} isLoading={false} />;
};
export default MoviesList;
