import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetMovies } from "~/api/movies";
import AppScreen, { statusBarPadding } from "~/components/AppScreen";
import MovieCard from "~/components/MovieCard";
import SectionTitle from "~/components/SectionTitle";
import Tags from "~/components/Tags";
import { ParamList } from "~/domain/navigation";

const Main = ({ navigation }: NativeStackScreenProps<ParamList, "Main">) => {
  const { isLoading, data } = useGetMovies();
  return (
    <AppScreen>
      <Image
        source={require("assets/Background.png")}
        className="absolute h-full opacity-30"
      />
      <View style={{ marginTop: statusBarPadding }}>
        <TextInput className="m-6 h-10 rounded-xl bg-neutral-700/40 px-4 text-white" />
      </View>
      <View className="ml-6 flex justify-start">
        <Tags />
        <View className="">
          <SectionTitle title="Trending" onSeeAllPress={() => {}} />
        </View>
      </View>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate("Movie")}>
                <MovieCard movie={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(movie) => `${movie.id}`}
            horizontal
            className="p-4"
          />
        </View>
      )}
      <View className="absolute bottom-0 left-0 right-0 my-4 mx-2 h-16 rounded-b-3xl rounded-t-md bg-neutral-700/50"></View>
    </AppScreen>
  );
};
export default Main;
