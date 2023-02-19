import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";
import AppText from "~/components/AppText";

type Props = { rating?: number };

const Rating: React.FC<Props> = ({ rating = 0 }) => {
  const stars = Math.floor(rating / 2);
  const halfStar = rating / 2 - stars >= 0.5;

  return (
    <View className="my-2 flex-row gap-x-2">
      <AppText style={{ fontSize: 14 }}>{rating}</AppText>
      {Array(stars)
        .fill("")
        .map((_, i) => (
          <FontAwesome key={i} name="star" size={14} color="#F2A33A" />
        ))}
      {halfStar && <FontAwesome name="star-half" size={14} color="#F2A33A" />}
    </View>
  );
};
export default Rating;
