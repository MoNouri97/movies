import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useGetCredits } from "~/api/people";
import CastMember from "~/components/CastMember";
import Typography from "~/components/Typography";

type Props = { id: number };

const Credits = ({ id }: Props) => {
  const { isLoading, isSuccess, data } = useGetCredits(id);

  if (isLoading || !isSuccess) {
    return null;
  }
  return (
    <>
      <View className="mt-4 flex-row items-center justify-start">
        <Typography className="mr-4 text-purple-400 ">Director</Typography>
        <Typography>{data.director}</Typography>
      </View>
      <View className="mt-4 flex-row items-center justify-start">
        <Typography className="mr-4 text-purple-400 ">Writer</Typography>
        <Typography>{data.writer}</Typography>
      </View>
      <Typography variant="SUBTITLE" className="mt-4">
        The Cast
      </Typography>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data.cast}
        renderItem={({ item }) => <CastMember actor={item} />}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        className="h-72 pt-4"
      />
    </>
  );
};
export default Credits;
