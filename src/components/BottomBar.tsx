import { Feather } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { TouchableOpacity, View } from "react-native";

const buttons: {
  name: ComponentProps<typeof Feather>["name"];
  onPress: () => void;
}[] = [
  { name: "home", onPress: () => {} },
  { name: "search", onPress: () => {} },
  { name: "heart", onPress: () => {} },
  { name: "user", onPress: () => {} },
];

const BottomBar = () => {
  return (
    <View className="absolute bottom-8 left-4 right-4 h-16 flex-row rounded-b-3xl rounded-t-lg bg-neutral-700/50">
      {buttons.map((btn) => (
        <IconButtom key={btn.name} {...btn} />
      ))}
    </View>
  );
};

type Props = ComponentProps<typeof Feather> & { onPress: () => void };
const IconButtom = ({ onPress, ...props }: Props) => {
  return (
    <TouchableOpacity className="flex-1 items-center justify-center">
      <Feather size={20} color="#ffffff99" {...props} />
    </TouchableOpacity>
  );
};

export default BottomBar;
