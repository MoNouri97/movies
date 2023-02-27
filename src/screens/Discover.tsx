import { Modal, View } from "react-native";
import AppScreen from "~/components/AppScreen";
import AppText from "~/components/AppText";

type Props = {};

const Discover = ({}: Props) => {
  return (
    <AppScreen bg safe>
      <Modal statusBarTranslucent animationType="slide" transparent className="h-[200] items-center bg-neutral-900">
        <AppText className="text-violet-500">Hello</AppText>
      </Modal>
      <View className="m-6 flex-row items-center rounded-xl bg-neutral-700/40"></View>
    </AppScreen>
  );
};
export default Discover;
