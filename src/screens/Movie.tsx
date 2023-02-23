import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Image, View } from "react-native";
import { getImage } from "~/api/images";
import { useGetMovie } from "~/api/movies";
import AppScrollingScreen from "~/components/AppScreen";
import AppText from "~/components/AppText";
import Credits from "~/components/Credits";
import Rating from "~/components/Rating";
import Tags from "~/components/Tags";
import { ParamList } from "~/domain/navigation";
type Props = NativeStackScreenProps<ParamList, "Movie">;

const Movie = ({ route }: Props) => {
  const { isLoading, data } = useGetMovie(route.params.id);

  if (isLoading || data == undefined) {
    return <AppText>Loading</AppText>;
  }
  return (
    <AppScrollingScreen
      scrollViewProps={{ className: "relative", stickyHeaderIndices: [0] }}
    >
      <Image
        source={{ uri: getImage(data!.poster_path, "500") }}
        className="fixed top-0 h-[50vh]"
      />
      <View className="absolute top-0 z-10 h-[50vh]">
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgb(23,23,23)"]}
          className="h-full w-screen"
        />
        <View className="absolute bottom-4 w-full px-8">
          <FontAwesome
            name="heart-o"
            size={26}
            color="white"
            style={{ position: "absolute", bottom: 50, right: 50 }}
          />
          <View className="absolute bottom-4 w-[300] px-4">
            <Rating alt rating={data?.vote_average} count={data?.vote_count} />
            <AppText variant="TITLE">{data?.title}</AppText>
            <AppText className="text-purple-400 ">{data.tagline}</AppText>
          </View>
        </View>
      </View>
      <View className="z-10 min-h-[600] bg-neutral-900 px-4">
        <Tags genres={data.genres} />
        <AppText variant="SUBTITLE" className="my-4">
          The Plot
        </AppText>
        <AppText>{data.overview}</AppText>
        <Credits id={route.params.id} />
      </View>
    </AppScrollingScreen>
  );
};
export default Movie;
