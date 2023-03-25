import { Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { useGetMovieGenres } from "~/api/genres";
import { useGetMovies } from "~/api/movies";
import AppButton from "~/components/AppButton";
import BottomSheet, { RefType } from "~/components/BottomSheet";
import Picker, { PickerItem, toPickerData } from "~/components/Picker";
import Typography from "~/components/Typography";
import { SORT_BY } from "~/domain/discover";
import { SimpleMovie } from "~/domain/movie";
import { ParamList } from "~/domain/navigation";
import { MoviesList } from "~/screens/MoviesList";

const RATINGS = Array(10)
  .fill(0)
  .map((_, i) => ({ value: `${i}`, label: `${i}+` } as const));

type FormValues = {
  genres: PickerItem[];
  sortBy?: PickerItem;
  rating: (typeof RATINGS)[number];
};
type Props = NativeStackScreenProps<ParamList, "Discover">;

const initialValues: FormValues = {
  genres: [],
  sortBy: undefined,
  rating: { value: "5", label: "5+" },
};
const Discover = (props: Props) => {
  const ref = useRef<RefType>(null);
  const [showFilters, setShowFilters] = useState(true);

  const { control, watch } = useForm({
    values: initialValues,
  });
  const { data: genres } = useGetMovieGenres();
  const genresFilter = watch("genres").map((g) => g.value);
  const sortFilter = watch("sortBy")?.value;
  const ratingFilter: [string, string] = [watch("rating").value, "10"];

  console.log({
    genres: genresFilter,
    sort: sortFilter,
    rating: ratingFilter,
  });

  const { data: movies, isLoading } = useGetMovies({
    genres: genresFilter,
    sort: sortFilter,
    rating: ratingFilter,
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
      <View className="m-6 items-center justify-center py-4">
        <AppButton
          onPress={() => {
            setShowFilters(!showFilters);
            ref.current?.expand();
          }}
          className="mt-2 flex-row"
        >
          <Typography>Filters</Typography>
          <Feather name="filter" size={14} />
        </AppButton>
      </View>
      <MoviesList {...props} isLoading={isLoading} data={moviesData} />
      <BottomSheet activeHeight={500} backDropColor="#00000055" backgroundColor="#222" ref={ref}>
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
            // cast tuple to array typescript
            render={({ field }) => (
              <Picker label="Sort By" {...field} data={toPickerData(Array.from(SORT_BY))} />
            )}
          />
          <Controller
            control={control}
            name="rating"
            render={({ field }) => <Picker label="Rating" {...field} data={RATINGS} />}
          />
        </View>
      </BottomSheet>
    </View>
  );
};
export default Discover;
