import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";
import AppText from "~/components/AppText";

type Props = { rating?: number };

const Rating: React.FC<Props> = ({ rating = 0 }) => {
  const stars = Math.floor(rating / 2);

  return (
    <View className="my-2 flex-row gap-x-2">
      <AppText style={{ fontSize: 14 }}>{rating}</AppText>
      {Array(stars)
        .fill("")
        .map((_, i) => (
          <FontAwesome key={i} name="star" size={14} color="#F2A33A" />
        ))}
      {Array(5 - stars)
        .fill("")
        .map((_, i) => (
          <FontAwesome key={i} name="star-o" size={14} color="#555" />
        ))}
    </View>
  );
};
export default Rating;
