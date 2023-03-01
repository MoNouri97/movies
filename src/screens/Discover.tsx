import { useState } from "react";
import { View } from "react-native";
import AppButton from "~/components/AppButton";
import AppScreen from "~/components/AppScreen";
import AppText from "~/components/AppText";
import BottomSheet from "~/components/BottomSheet";

type Props = {};

const Discover = ({}: Props) => {
  const [showFilters, setShowFilters] = useState(true);
  return (
    <AppScreen bg safe>
      <View className="m-6 items-center justify-center">
        <AppText variant="TITLE">Search for movies</AppText>
        <AppButton onPress={() => setShowFilters(!showFilters)}>Press me</AppButton>
      </View>
      <BottomSheet
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
      </BottomSheet>
    </AppScreen>
  );
};
export default Discover;
