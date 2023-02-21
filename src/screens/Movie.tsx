import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Image, View } from "react-native";
import { getImage } from "~/api/images";
import { useGetMovie } from "~/api/movies";
import { useGetCredits } from "~/api/people";
import AppScrollingScreen from "~/components/AppScreen";
import AppText from "~/components/AppText";
import Rating from "~/components/Rating";
import Tags from "~/components/Tags";
import { ParamList } from "~/domain/navigation";

type Props = NativeStackScreenProps<ParamList, "Movie">;

const Movie = ({ route }: Props) => {
  const { isLoading, data } = useGetMovie(route.params.id);
  const { isLoading: loading, data: credits } = useGetCredits(route.params.id);

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
        <View className="absolute bottom-4 w-[350] px-4">
          <Rating alt rating={data?.vote_average} count={data?.vote_count} />
          <AppText variant="TITLE">{data?.title}</AppText>
          <AppText className="text-purple-400 ">{data.tagline}</AppText>
        </View>
      </View>
      <View className="z-10 h-[600] bg-neutral-900 px-4">
        <Tags genres={data.genres} />
        <AppText className="my-4 text-purple-400 ">The Plot</AppText>
        <AppText>{data.overview}</AppText>
        <AppText className="my-4 text-purple-400 ">Director</AppText>
        <AppText>{data.tagline}</AppText>
      </View>
    </AppScrollingScreen>
  );
};
export default Movie;
