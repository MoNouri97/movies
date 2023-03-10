import { GestureResponderEvent, TouchableOpacity, View } from "react-native";
import Typography from "~/components/Typography";

type Props = {
  title: string;
  seeAll?: true;
  onSeeAllPress?: (event: GestureResponderEvent) => void;
};

const SectionTitle = ({ title, onSeeAllPress }: Props) => {
  return (
    <View className="mr-6 flex-row items-center justify-between ">
      <Typography variant="TITLE">{title}</Typography>
      {onSeeAllPress && (
        <TouchableOpacity onPress={onSeeAllPress}>
          <Typography variant="LABEL">See All</Typography>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default SectionTitle;
