import { Feather } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ComponentProps } from "react";
import { TouchableOpacity, View } from "react-native";
import { ParamList } from "~/domain/navigation";

type RouteName<P extends object> = keyof P;
const buttons: {
  name: ComponentProps<typeof Feather>["name"];
  route?: RouteName<ParamList>;
}[] = [
  { name: "home", route: "Main" },
  { name: "search", route: "Search" },
  { name: "compass", route: "Discover" },
  { name: "heart", route: "Favorites" },
];

const BottomBar = () => {
  const { navigate } = useNavigation<NavigationProp<ParamList>>();
  return (
    <View className="absolute bottom-8 left-4 right-4 h-16 flex-row rounded-b-3xl rounded-t-lg bg-neutral-700/80">
      {buttons.map((btn) => (
        <IconButtom
          key={btn.name}
          name={btn.name}
          onPress={() => {
            if (!btn.route) return;
            navigate(btn.route as any);
          }}
        />
      ))}
    </View>
  );
};

type Props = ComponentProps<typeof Feather> & { onPress: () => void };
const IconButtom = ({ onPress, ...props }: Props) => {
  return (
    <TouchableOpacity className="flex-1 items-center justify-center" onPress={onPress}>
      <Feather size={20} color="#ffffff99" {...props} />
    </TouchableOpacity>
  );
};

export default BottomBar;
