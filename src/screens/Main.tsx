import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useMemo } from "react";
import { View } from "react-native";
import { useGetMovies } from "~/api/movies";
import AppScrollingScreen from "~/components/AppScreen";
import HMoviesSection from "~/components/HMoviesSection";
import Typography from "~/components/Typography";
import HistoryContext from "~/context/HistoryContext";
import { ParamList } from "~/domain/navigation";
import { detailedMovieToSimple } from "~/helpers/format";

const Main = ({ navigation }: NativeStackScreenProps<ParamList, "Main">) => {
  const { isLoading, data } = useGetMovies();
  const historyContext = useContext(HistoryContext);
  const recent = useMemo(() => historyContext?.recent.map(detailedMovieToSimple), [historyContext?.recent]);
  const favorites = useMemo(() => historyContext?.favorites.map(detailedMovieToSimple), [historyContext?.favorites]);
  return (
    <AppScrollingScreen safe bg>
      <Typography className="m-6 px-4 text-2xl">Looking for something to watch ?</Typography>
      <HMoviesSection
        isLoading={isLoading}
        onMoviePress={(item) => navigation.navigate("Movie", { id: item.id })}
        onSeeAllPress={() => navigation.navigate("Movies")}
        title="Trending"
        data={data}
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
