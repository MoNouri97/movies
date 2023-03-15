import { useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { useGetMovieGenres } from "~/api/genres";
import AppButton from "~/components/AppButton";
import AppScrollingScreen from "~/components/AppScreen";
import BottomSheet, { RefType } from "~/components/BottomSheet";
import Picker, { PickerItem } from "~/components/Picker";
import Typography from "~/components/Typography";

type FormValues = {
  genres: PickerItem[];
};
type Props = {};
const Discover = ({}: Props) => {
  const ref = useRef<RefType>(null);
  const [showFilters, setShowFilters] = useState(true);

  const { register, control } = useForm<FormValues>({ values: { genres: [] } });
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

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
            <Controller
              control={control}
              name="genres"
              render={({ field }) => (
                <Picker
                  multiple
                  label="Genres"
                  {...field}
                  data={genres?.map((i) => ({ label: i.name, value: i.id.toString() }))}
                />
              )}
            />
          </View>
        </ScrollView>
      </BottomSheet>
    </AppScrollingScreen>
  );
};
export default Discover;
