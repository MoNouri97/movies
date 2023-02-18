import { View } from "react-native";
import AppText from "~/components/AppText";

type Props = {};

const Tags: React.FC<Props> = ({}) => {
  return (
    <View className="my-4 flex-row items-center gap-x-2">
      <View className="rounded-xl bg-slate-700 py-2 px-4 text-center">
        <AppText>Animation</AppText>
      </View>
      <View className="rounded-xl bg-slate-700 py-2 px-4 text-center">
        <AppText>Animation</AppText>
      </View>
      <View className="rounded-xl bg-slate-700 py-2 px-4 text-center">
        <AppText>Animation</AppText>
      </View>
    </View>
  );
};
export default Tags;
