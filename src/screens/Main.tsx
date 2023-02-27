import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useGetMovies } from "~/api/movies";
import AppScrollingScreen from "~/components/AppScreen";
import AppText from "~/components/AppText";
import MovieCard from "~/components/MovieCard";
import SectionTitle from "~/components/SectionTitle";
import HistoryContext from "~/context/HistoryContext";
import { ParamList } from "~/domain/navigation";
import { detailedMovieToSimple } from "~/helpers/format";

const Main = ({ navigation }: NativeStackScreenProps<ParamList, "Main">) => {
  const { isLoading, data } = useGetMovies();
  const historyContext = useContext(HistoryContext);
  return (
    <AppScrollingScreen safe bg>
      <AppText className="m-6 px-4 text-2xl">What would you like to watch ?</AppText>
      <View className="ml-6 flex justify-start">
        <SectionTitle title="Trending" onSeeAllPress={() => navigation.navigate("Movies")} />
      </View>
      {isLoading ? (
        <AppText>Loading</AppText>
      ) : (
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate("Movie", { id: item.id })}>
                <MovieCard movie={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(movie) => `${movie.id}`}
            horizontal
            className="h-72 p-4"
          />
        </View>
      )}
      <View className="ml-6 flex justify-start">
        <SectionTitle title="Recently Viewed" />
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={historyContext?.recent}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Movie", { id: item.id })}>
            <MovieCard movie={detailedMovieToSimple(item)} />
          </TouchableOpacity>
        )}
        keyExtractor={(movie) => `${movie.id}`}
        horizontal
        className="h-72 p-4"
      />
    </AppScrollingScreen>
  );
};
export default Main;
