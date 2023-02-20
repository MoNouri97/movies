import { View } from "react-native";
import AppText from "~/components/AppText";
import { Genre } from "~/domain/movie";

type Props = { genres: Genre[] };

const Tags: React.FC<Props> = ({ genres = [] }) => {
  return (
    <View className="flex-row flex-wrap items-center">
      {genres.map((tag) => (
        <View
          key={tag.id}
          className="mx-1 mt-2 rounded-xl bg-neutral-700/40 py-2 px-4 text-center"
        >
          <AppText>{tag.name}</AppText>
        </View>
      ))}
    </View>
  );
};
export default Tags;
