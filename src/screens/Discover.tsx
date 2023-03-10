import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { useGetMovieGenres } from "~/api/genres";
import AppButton from "~/components/AppButton";
import AppScrollingScreen from "~/components/AppScreen";
import BottomSheet, { RefType } from "~/components/BottomSheet";
import Picker from "~/components/Picker";
import Typography from "~/components/Typography";

type Props = {};

const Discover = ({}: Props) => {
  const ref = useRef<RefType>(null);
  const [showFilters, setShowFilters] = useState(true);

  const { data: genres } = useGetMovieGenres();

  return (
    <AppScrollingScreen bg safe>
      <View className="m-6 items-center justify-center">
        <Typography variant="TITLE">Search for movies</Typography>
        <AppButton
          onPress={() => {
            setShowFilters(!showFilters);
            ref.current?.expand();
          }}
        >
          Press me
        </AppButton>
      </View>
      <BottomSheet activeHeight={700} backDropColor="#00000055" backgroundColor="#222" ref={ref}>
        <ScrollView className="h-[200]">
          <View className="w-full items-center p-2">
            <Typography variant="TITLE" className="pb-4">
              Filters
            </Typography>
            <Picker data={genres?.map((i) => ({ label: i.name, value: i.id.toString() }))} />
          </View>
        </ScrollView>
      </BottomSheet>
    </AppScrollingScreen>
  );
};
export default Discover;
