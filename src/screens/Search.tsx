import { Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, TextInput, TouchableOpacity, View } from "react-native";
import { useSearchMovies } from "~/api/movies";
import { AppScreen } from "~/components/AppScreen";
import MovieCard from "~/components/MovieCard";
import Typography from "~/components/Typography";
import { ParamList } from "~/domain/navigation";

type Inputs = { query: string };
const Search = ({ navigation }: NativeStackScreenProps<ParamList, "Search">) => {
  const { control } = useForm<Inputs>({ defaultValues: { query: "" } });
  const [query, setQuery] = useState("");
  const { data, isLoading } = useSearchMovies(1, query);
  return (
    <AppScreen bg safe>
      <View className="m-6 flex-row items-center rounded-xl bg-neutral-700/40">
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              onChangeText={field.onChange}
              onBlur={() => {
                field.onBlur();
                setQuery(field.value);
              }}
              value={field.value}
              className="h-10 flex-1 rounded-xl px-4 text-white"
            />
          )}
          name="query"
        />
        <Feather style={{ paddingHorizontal: 16 }} name="search" size={24} color="#ffffff99" />
      </View>
      <View className="items-center justify-center">
        {!query && <Typography variant="TITLE">Search for movies</Typography>}
        {isLoading ? (
          <Typography>Loading</Typography>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate("Movie", { id: item.id })}>
                <MovieCard movie={item} showTitle />
              </TouchableOpacity>
            )}
            keyExtractor={(movie) => `${movie.id}`}
            numColumns={2}
            className="p-4"
          />
        )}
      </View>
    </AppScreen>
  );
};
export default Search;
