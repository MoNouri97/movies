import { ReactNode } from "react";
import { GestureResponderEvent, Platform, Pressable, PressableProps, View } from "react-native";
import AppText from "~/components/AppText";

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

type Props = { children: ReactNode; onPress?: ((event: GestureResponderEvent) => void) | undefined };

const AppButton = ({ children, onPress }: Props) => {
  return (
    <View className="overflow-hidden rounded-3xl border-2 border-neutral-400">
      <Press onPress={onPress}>
        <View className="px-6 py-2">
          <AppText variant="SUBTITLE" className="text-neutral-400">
            {children}
          </AppText>
        </View>
      </Press>
    </View>
  );
};
export default AppButton;