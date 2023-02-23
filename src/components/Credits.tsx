import { View } from "react-native";
import { useGetCredits } from "~/api/people";
import AppText from "~/components/AppText";

type Props = { id: number };

const Credits = ({ id }: Props) => {
  const { isLoading, isSuccess, data } = useGetCredits(id);

  if (isLoading || !isSuccess) {
    return null;
  }
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
    </>
  );
};
export default Credits;
