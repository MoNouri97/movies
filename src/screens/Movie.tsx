import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, View } from "react-native";
import { getImage } from "~/api/images";
import { useGetMovie } from "~/api/movies";
import AppScrollingScreen from "~/components/AppScreen";
import AppText from "~/components/AppText";
import { ParamList } from "~/domain/navigation";

type Props = NativeStackScreenProps<ParamList, "Movie">;

const Movie = ({ route }: Props) => {
  const { isLoading, data } = useGetMovie(route.params.id);

  return (
    <AppScrollingScreen>
      {isLoading ? (
        <AppText>Loading</AppText>
      ) : (
        <>
          <Image
            source={{ uri: getImage(data!.poster_path, "500") }}
            className="h-[600]"
          />
          <View className="h-[600] items-center justify-center">
            <AppText>{data?.title}</AppText>
          </View>
        </>
      )}
    </AppScrollingScreen>
  );
};
export default Movie;
