import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReactNode, useContext, useMemo } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { useGetMovies } from "~/api/movies";
import AppButton from "~/components/AppButton";
import { AppScreen } from "~/components/AppScreen";
import MovieCard from "~/components/MovieCard";
import Typography from "~/components/Typography";
import HistoryContext from "~/context/HistoryContext";
import { SimpleMovie } from "~/domain/movie";
import { ParamList } from "~/domain/navigation";
import { detailedMovieToSimple } from "~/helpers/format";

type Props = NativeStackScreenProps<ParamList, "Movies" | "Favorites" | "Discover">;
type ListProps = Props & {
  data?: SimpleMovie[];
  isLoading: boolean;
  children?: ReactNode;
};

const MoviesListScreen = (props: ListProps) => {
  return (
    <AppScreen>
      <Image source={require("assets/Background.png")} className=" absolute opacity-40" />
      <MoviesList {...props} />
    </AppScreen>
  );
};

export const TrendingMovies = (props: Props) => {
  const { isLoading, data, fetchNextPage, isFetchingNextPage } = useGetMovies();
  const trendingMovies = useMemo(() => {
    let arr: SimpleMovie[] = [];
    data?.pages.forEach((page) => {
      arr = [...arr, ...page.results];
    });
    return arr;
  }, [data]);
  return (
    <MoviesListScreen {...props} {...{ isLoading, data: trendingMovies }}>
      <AppButton disabled={isFetchingNextPage} onPress={() => fetchNextPage()}>
        {isFetchingNextPage ? "Loading" : "Next"}
      </AppButton>
    </MoviesListScreen>
  );
};

export const FavoriteMovies = (props: Props) => {
  const { favorites } = useContext(HistoryContext)!;
  const data = useMemo(() => favorites.map(detailedMovieToSimple), [favorites]);
  return <MoviesListScreen {...props} data={data} isLoading={false} />;
};
export default MoviesListScreen;

export const MoviesList = ({ isLoading, data, children, navigation }: ListProps) => {
  return (
    <>
      {isLoading && (
        <View className="items-center p-4">
          <Typography variant="TITLE">Loading ...</Typography>
        </View>
      )}
      {!!data?.length && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Movie", {
                  id: item.id,
                })
              }
            >
              <MovieCard movie={item} showTitle />
            </TouchableOpacity>
          )}
          keyExtractor={(movie) => `${movie.id}`}
          ListFooterComponent={() => <View>{children}</View>}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: 150,
            alignItems: "center",
          }}
        />
      )}
    </>
  );
};
