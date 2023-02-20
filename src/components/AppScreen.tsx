import React, { ReactNode, useRef } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  style?: StyleProp<ViewStyle>;
  title?: string;
  center?: boolean;
  autoScroll?: boolean;
  safe?: boolean;
  children?: ReactNode;
};

export const statusBarPadding =
  Platform.OS === "android" ? StatusBar.currentHeight : 0;

const AppScrollingScreen: React.FC<Props> = ({
  children,
  style,
  title,
  safe = false,
  center = false,
  autoScroll = false,
}) => {
  const ref = useRef<ScrollView>(null);
  return (
    <SafeAreaView
      style={[
        style,
        safe && {
          paddingTop: statusBarPadding,
        },
      ]}
      className="flex-1 shrink-0 bg-neutral-900"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        ref={ref}
        onContentSizeChange={
          !autoScroll
            ? undefined
            : () => {
                ref.current?.scrollToEnd();
              }
        }
      >
        {/* <View
          className={`grow ${
            center ? "justify-evenly" : "justify-start"
          } relative min-h-screen`}
        > */}
        {children}
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export const AppScreen = ({
  children,
  style,
  title,
  safe = false,
  center = false,
  autoScroll = false,
}: Props) => {
  return (
    <SafeAreaView
      style={[
        style,
        safe && {
          paddingTop: statusBarPadding,
        },
      ]}
      className="flex-1 bg-neutral-900"
    >
      <View
        className={`grow ${
          center ? "justify-evenly" : "justify-start"
        } relative min-h-screen`}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default AppScrollingScreen;
