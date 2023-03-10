import { ScrollView, View } from "react-native";
import Typography from "~/components/Typography";
import { Genre } from "~/domain/movie";

type Props = { genres: Genre[] };

const Tags: React.FC<Props> = ({ genres = [] }) => {
  return (
    <ScrollView horizontal>
      <View className="flex-row flex-nowrap items-start">
        {genres.map((tag) => (
          <View key={tag.id} className="mx-1 rounded-xl bg-neutral-700/40 py-2 px-4 text-center">
            <Typography>{tag.name}</Typography>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
export default Tags;
