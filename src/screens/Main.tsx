import React from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetMovies } from "~/api/movies";
import AppScreen from "~/components/AppScreen";
import AppText from "~/components/AppText";
import MovieCard from "~/components/MovieCard";
import Tags from "~/components/Tags";

const Main: React.FC = () => {
  const { isLoading, data } = useGetMovies();
  return (
    <AppScreen safe>
      <TextInput className="m-6 h-10 rounded-xl bg-slate-700 px-4 text-white"></TextInput>
      <View className="ml-6 flex justify-start">
        <Tags />
        <View className="mr-6 flex flex-row items-center justify-between">
          <AppText variant="TITLE">Trending</AppText>
          <TouchableOpacity onPress={() => console.log("hello")}>
            <AppText variant="LABEL">See All</AppText>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(movie) => `${movie.id}`}
          horizontal
          contentContainerStyle={{
            alignItems: "flex-start",
          }}
          className="p-4"
        />
      )}
    </AppScreen>
  );
};
export default Main;
