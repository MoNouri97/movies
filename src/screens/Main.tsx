import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetMovies } from "~/api/movies";
import AppScrollingScreen, { statusBarPadding } from "~/components/AppScreen";
import AppText from "~/components/AppText";
import BottomBar from "~/components/BottomBar";
import MovieCard from "~/components/MovieCard";
import SectionTitle from "~/components/SectionTitle";
import Tags from "~/components/Tags";
import { ParamList } from "~/domain/navigation";

const Main = ({ navigation }: NativeStackScreenProps<ParamList, "Main">) => {
  const { isLoading, data } = useGetMovies();
  return (
    <AppScrollingScreen>
      <Image
        source={require("assets/Background.png")}
        className="absolute h-full opacity-30"
      />
      <View style={{ marginTop: statusBarPadding }}>
        <TextInput className="m-6 h-10 rounded-xl bg-neutral-700/40 px-4 text-white" />
      </View>
      <View className="ml-6 flex justify-start">
        <Tags />
        <SectionTitle
          title="Trending"
          onSeeAllPress={() => navigation.navigate("Movies")}
        />
      </View>
      {isLoading ? (
        <AppText>Loading</AppText>
      ) : (
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Movie", { id: item.id })}
              >
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
      <BottomBar />
    </AppScrollingScreen>
  );
};
export default Main;
