import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { AppScreen } from "~/components/AppScreen";
import BottomBar from "~/components/BottomBar";
import { ParamList } from "~/domain/navigation";
import Main from "~/screens/Main";
import Movie from "~/screens/Movie";
import MoviesList from "~/screens/MoviesList";
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
            }}
            name="Movies"
            component={MoviesList}
          />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
        <BottomBar />
      </NavigationContainer>
    </AppScreen>
  );
};
export default MainStack;
