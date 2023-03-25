import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { useGetMovieGenres } from "~/api/genres";
import { useGetMovies } from "~/api/movies";
import AppButton from "~/components/AppButton";
import BottomSheet, { RefType } from "~/components/BottomSheet";
import Picker, { PickerItem, stringsToPickerData as toPickerData } from "~/components/Picker";
import Typography from "~/components/Typography";
import { SORT_BY } from "~/domain/discover";
import { SimpleMovie } from "~/domain/movie";
import { ParamList } from "~/domain/navigation";
import { MoviesList } from "~/screens/MoviesList";

type FormValues = {
  genres: PickerItem[];
  sortBy?: PickerItem;
};
type Props = NativeStackScreenProps<ParamList, "Discover">;
const Discover = (props: Props) => {
  const ref = useRef<RefType>(null);
  const [showFilters, setShowFilters] = useState(true);

  const { control, watch } = useForm<FormValues>({
    values: { genres: [], sortBy: undefined },
  });
  const { data: genres } = useGetMovieGenres();
  const genresFilter = watch("genres").map((g) => g.value);
  const sortFilter = watch("sortBy.value");
  console.log({ genresFilter, sortFilter });

  const { data: movies, isLoading } = useGetMovies({
    genres: genresFilter,
    sort: sortFilter,
  });
  const moviesData = useMemo(() => {
    let arr: SimpleMovie[] = [];
    movies?.pages.forEach((page) => {
      arr = [...arr, ...page.results];
    });
    return arr;
  }, [movies]);

  return (
    <View className="mt-4 h-full">
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
      <MoviesList {...props} isLoading={isLoading} data={moviesData} />
      <BottomSheet activeHeight={700} backDropColor="#00000055" backgroundColor="#222" ref={ref}>
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
                data={genres?.map((i) => ({
                  label: i.name,
                  value: i.id.toString(),
                }))}
              />
            )}
          />
          <Controller
            control={control}
            name="sortBy"
            render={({ field }) => (
              <Picker label="Sort By" {...field} data={toPickerData(SORT_BY)} />
            )}
          />
        </View>
      </BottomSheet>
    </View>
  );
};
export default Discover;
