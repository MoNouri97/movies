import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import AppScrollingScreen from "~/components/AppScreen";
import AppText from "~/components/AppText";

type Props = NativeStackScreenProps<{}>;

const Movie = ({}: Props) => {
  return (
    <AppScrollingScreen safe>
      {/* <Image
        source={require("assets/Background.png")}
        className="absolute opacity-40"
      /> */}
      <View className="flex-1 items-center justify-center">
        <AppText>Movie Screen</AppText>
      </View>
    </AppScrollingScreen>
  );
};
export default Movie;
