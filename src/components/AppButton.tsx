import { ReactNode } from "react";
import { GestureResponderEvent, Platform, Pressable, PressableProps, View } from "react-native";
import Typography from "~/components/Typography";

export const Press = ({ children, ...props }: PressableProps) => {
  return (
    <Pressable
      style={Platform.OS !== "ios" ? undefined : ({ pressed }) => ({ opacity: pressed ? 0.1 : 1 })}
      android_ripple={{
        borderless: false,
        color: "#eee",
      }}
      {...props}
    >
      {children}
    </Pressable>
  );
};

type Props = PressableProps & {
  children: ReactNode;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

const AppButton = ({ children, onPress, ...props }: Props) => {
  return (
    <View className="overflow-hidden rounded-3xl border-2 border-neutral-400">
      <Press onPress={onPress} {...props}>
        <View className="px-6 py-2">
          <Typography variant="SUBTITLE" className="text-neutral-400">
            {children}
          </Typography>
        </View>
      </Press>
    </View>
  );
};
export default AppButton;
