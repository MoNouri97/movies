import { GestureResponderEvent, TouchableOpacity, View } from "react-native";
import AppText from "~/components/AppText";

type Props = {
  title: string;
  seeAll?: true;
  onSeeAllPress?: (event: GestureResponderEvent) => void;
};

const SectionTitle = ({ title, onSeeAllPress }: Props) => {
  return (
    <View className="mr-6 flex-row items-center justify-between ">
      <AppText variant="TITLE">{title}</AppText>
      {onSeeAllPress && (
        <TouchableOpacity onPress={onSeeAllPress}>
          <AppText variant="LABEL">See All</AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default SectionTitle;
