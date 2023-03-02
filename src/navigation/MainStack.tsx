import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { AppScreen } from "~/components/AppScreen";
import BottomBar from "~/components/BottomBar";
import { ParamList } from "~/domain/navigation";
import Discover from "~/screens/Discover";
import Main from "~/screens/Main";
import Movie from "~/screens/Movie";
import { FavoriteMovies, TrendingMovies } from "~/screens/MoviesList";
import Search from "~/screens/Search";

type Props = {};
const Stack = createStackNavigator<ParamList>();

const MainStack: React.FC<Props> = ({}) => {
  return (
    <AppScreen>
      <StatusBar style="light" />
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator
          detachInactiveScreens={false}
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Movie" component={Movie} />
          <Stack.Screen
            options={{
              headerShown: true,
              title: "Trending Movies",
            }}
            name="Movies"
            component={TrendingMovies}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              title: "Favorite Movies",
            }}
            name="Favorites"
            component={FavoriteMovies}
          />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Discover" component={Discover} />
        </Stack.Navigator>
        <BottomBar />
      </NavigationContainer>
    </AppScreen>
  );
};
export default MainStack;
