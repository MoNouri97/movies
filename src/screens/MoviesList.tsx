import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useGetMovies } from "~/api/movies";
import { AppScreen } from "~/components/AppScreen";
import MovieCard from "~/components/MovieCard";
import { ParamList } from "~/domain/navigation";

type Props = NativeStackScreenProps<ParamList, "Movies">;

const MoviesList = ({ navigation, route }: Props) => {
  const { isLoading, data } = useGetMovies();
  navigation.setOptions({ title: "Trending Movies" });
  return (
    <AppScreen>
      <Image
        source={require("assets/Background.png")}
        className=" absolute opacity-40"
      />
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
              <TouchableOpacity onPress={() => navigation.navigate("Movie")}>
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
export default MoviesList;
