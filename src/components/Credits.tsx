import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useGetCredits } from "~/api/people";
import AppText from "~/components/AppText";
import CastMember from "~/components/CastMember";

type Props = { id: number };

const Credits = ({ id }: Props) => {
  const { isLoading, isSuccess, data } = useGetCredits(id);

  if (isLoading || !isSuccess) {
    return null;
  }
  const actor = data.cast[0];
  return (
    <>
      <View className="mt-4 flex-row items-center justify-start">
        <AppText className="mr-4 text-purple-400 ">Director</AppText>
        <AppText>{data.director}</AppText>
      </View>
      <View className="mt-4 flex-row items-center justify-start">
        <AppText className="mr-4 text-purple-400 ">Writer</AppText>
        <AppText>{data.writer}</AppText>
      </View>
      <AppText variant="SUBTITLE" className="mt-4">
        The Cast
      </AppText>
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
