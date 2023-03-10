import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";
import Typography from "~/components/Typography";
import { formatNumber } from "~/helpers/format";

type Props = { rating?: number; count?: number; alt?: boolean };

const Rating: React.FC<Props> = ({ rating = 0, alt = false, count }) => {
  const rounded = parseFloat(rating.toFixed(1));
  const stars = Math.floor(rounded / 2);
  if (alt) {
    return (
      <View className="my-2 flex-row items-center gap-x-2">
        <FontAwesome name="star" size={18} color="#F9C400" />
        <Typography variant="SUBTITLE" className="text-xl text-gold">
          {rounded}
        </Typography>
        {count && (
          <Typography variant="SUBTITLE" style={{ fontSize: 12, color: "#fff" }}>
            ({formatNumber(count)} votes)
          </Typography>
        )}
      </View>
    );
  }
  return (
    <View className="my-2 flex-row gap-x-2">
      <Typography style={{ fontSize: 14 }}>{rounded}</Typography>
      {Array(stars)
        .fill("")
        .map((_, i) => (
          <FontAwesome key={i} name="star" size={14} color="#F9C400" />
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
