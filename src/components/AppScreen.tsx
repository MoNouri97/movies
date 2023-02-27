import React, { ReactNode, useRef } from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  ScrollViewProps,
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
  scrollViewProps?: ScrollViewProps;
  children?: ReactNode;
  bg?: boolean;
};

export const statusBarPadding = Platform.OS === "android" ? StatusBar.currentHeight : 0;
const SCREEN = Dimensions.get("screen");
const AppScrollingScreen: React.FC<Props> = ({
  children,
  style,
  title,
  scrollViewProps,
  safe = false,
  center = false,
  autoScroll = false,
  bg = false,
}) => {
  const ref = useRef<ScrollView>(null);
  return (
    <View style={{ height: SCREEN.height, position: "relative", width: SCREEN.width }} className="bg-neutral-900">
      {bg && (
        <Image
          source={require("assets/Background.png")}
          className="absolute bottom-0 flex-1 opacity-80"
          style={{ height: SCREEN.height, width: SCREEN.width }}
        />
      )}
      <SafeAreaView
        style={[
          style,
          safe && {
            paddingTop: statusBarPadding,
          },
        ]}
        className="flex-1 shrink-0"
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
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export const AppScreen = ({
  children,
  style,
  title,
  safe = false,
  center = false,
  autoScroll = false,
  bg = false,
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
      <View className={`grow ${center ? "justify-evenly" : "justify-start"} relative min-h-screen`}>
        {bg && <Image source={require("assets/Background.png")} className="absolute h-full opacity-50" />}
        {children}
      </View>
    </SafeAreaView>
  );
};

export default AppScrollingScreen;
