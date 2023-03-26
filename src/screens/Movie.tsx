import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect } from "react";
import { Image, View } from "react-native";
import { getImage } from "~/api/images";
import { useGetMovie } from "~/api/movies";
import AppScrollingScreen from "~/components/AppScreen";
import Credits from "~/components/Credits";
import Rating from "~/components/Rating";
import Tags from "~/components/Tags";
import TruncatedText from "~/components/TruncatedText";
import Typography from "~/components/Typography";
import HistoryContext from "~/context/HistoryContext";
import { ParamList } from "~/domain/navigation";
import { formatMoney } from "~/helpers/format";
type Props = NativeStackScreenProps<ParamList, "Movie">;

const Movie = ({ route }: Props) => {
  const { isLoading, data } = useGetMovie(route.params.id);
  const historyContext = useContext(HistoryContext);
  useEffect(() => {
    if (!data) return;
    historyContext?.addToHistory(data);
  }, [data]);
  if (isLoading || data == undefined) {
    return <Typography>Loading</Typography>;
  }

  return (
    <AppScrollingScreen scrollViewProps={{ className: "relative", stickyHeaderIndices: [0] }}>
      <Image
        source={{ uri: getImage(data!.poster_path, "500") }}
        className="fixed top-0 h-[70vh]"
      />
      <View className="absolute top-0 z-10 h-[70vh]">
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgb(23,23,23)"]}
          className="h-full w-screen"
        />
        <View className="absolute bottom-0 w-full pb-4">
          <FontAwesome
            onPress={() => historyContext?.toggleFavorite(data)}
            name="heart-o"
            size={26}
            color="white"
            style={{ position: "absolute", bottom: 50, right: 50 }}
          />
          <View className="w-[300] px-4">
            <Rating alt rating={data?.vote_average} count={data?.vote_count} />
            <Typography variant="TITLE">{data?.title}</Typography>
          </View>
        </View>
      </View>
      <View className="z-10 min-h-[600] bg-neutral-900 px-4">
        <Tags genres={data.genres} />
        {(!!data.budget || !!data.revenue) && (
          <View className="flex-row items-center justify-around py-4">
            <View className="mx-2 flex-grow rounded-xl bg-neutral-800 px-6  py-8">
              <Typography>Budget</Typography>
              <Typography variant="SUBTITLE">{formatMoney(data.budget)}</Typography>
            </View>
            <View className="mx-2 flex-grow rounded-xl bg-gold/30 px-6  py-8">
              <Typography className="text-gold">Revenue</Typography>
              <Typography variant="SUBTITLE">{formatMoney(data.revenue)}</Typography>
            </View>
          </View>
        )}
        <Typography variant="SUBTITLE" className="my-4">
          The Plot
        </Typography>
        <TruncatedText numberOfLines={2}>{data.overview} </TruncatedText>

        <Credits id={route.params.id} />
      </View>
    </AppScrollingScreen>
  );
};
export default Movie;
