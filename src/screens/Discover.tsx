import { useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import AppButton from "~/components/AppButton";
import AppScrollingScreen from "~/components/AppScreen";
import AppText from "~/components/AppText";
import BottomSheet, { RefType } from "~/components/BottomSheet";

type Props = {};

// const { height } = Dimensions.get("screen");
const Discover = ({}: Props) => {
  const { height } = useWindowDimensions();

  const ref = useRef<RefType>(null);
  const [showFilters, setShowFilters] = useState(true);
  return (
    <AppScrollingScreen bg safe>
      <View className="m-6 items-center justify-center">
        <AppText variant="TITLE">Search for movies</AppText>
        <AppButton
          onPress={() => {
            setShowFilters(!showFilters);
            ref.current?.expand();
          }}
        >
          Press me
        </AppButton>
      </View>
      <BottomSheet activeHeight={height} backDropColor="#00000055" backgroundColor="#222" ref={ref}>
        {/* <View className="h-full items-center justify-start p-2"> */}
        <AppText variant="TITLE">Filters</AppText>
        {/* </View> */}
      </BottomSheet>
      {/* <BottomSheet
        modalProps={{
          visible: showFilters,
          onRequestClose(event) {
            setShowFilters(false);
          },
        }}
      >
        <View className="h-full items-center justify-start p-2">
          <AppText variant="TITLE">Filters</AppText>
        </View>
      </BottomSheet> */}
    </AppScrollingScreen>
  );
};
export default Discover;
