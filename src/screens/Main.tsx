import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useMemo } from "react";
import { View } from "react-native";
import { useGetMovies } from "~/api/movies";
import AppScrollingScreen from "~/components/AppScreen";
import HMoviesSection from "~/components/HMoviesSection";
import Typography from "~/components/Typography";
import HistoryContext from "~/context/HistoryContext";
import { SimpleMovie } from "~/domain/movie";
import { ParamList } from "~/domain/navigation";
import { detailedMovieToSimple } from "~/helpers/format";

const Main = ({ navigation }: NativeStackScreenProps<ParamList, "Main">) => {
  const { isLoading, data } = useGetMovies();
  const historyContext = useContext(HistoryContext);
  const trendingMovies = useMemo(() => {
    let arr: SimpleMovie[] = [];
    data?.pages.forEach((page) => {
      arr = [...arr, ...page.results];
    });
    return arr;
  }, [data]);
  const recent = useMemo(
    () => historyContext?.recent.map(detailedMovieToSimple),
    [historyContext?.recent]
  );
  const favorites = useMemo(
    () => historyContext?.favorites.map(detailedMovieToSimple),
    [historyContext?.favorites]
  );
  return (
    <AppScrollingScreen safe bg>
      <Typography className="m-6 px-4 text-2xl">Looking for something to watch ?</Typography>
      <HMoviesSection
        isLoading={isLoading}
        onMoviePress={(item) => navigation.navigate("Movie", { id: item.id })}
        onSeeAllPress={() => navigation.navigate("Movies")}
        title="Trending"
        data={trendingMovies}
      />
      <HMoviesSection
        onMoviePress={(item) => navigation.navigate("Movie", { id: item.id })}
        title="Recently Viewed"
        data={recent}
      />
      <HMoviesSection
        onMoviePress={(item) => navigation.navigate("Movie", { id: item.id })}
        onSeeAllPress={() => navigation.navigate("Favorites")}
        title="Favorites"
        data={favorites}
      />
      <View className="mb-20" />
    </AppScrollingScreen>
  );
};
export default Main;
