import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { AppScreen } from "~/components/AppScreen";
import { ParamList } from "~/domain/navigation";
import Main from "~/screens/Main";
import Movie from "~/screens/Movie";
import MoviesList from "~/screens/MoviesList";

type Props = {};
const Stack = createNativeStackNavigator<ParamList>();

const MainStack: React.FC<Props> = ({}) => {
  return (
    <AppScreen>
      <StatusBar style="light" />
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
            statusBarTranslucent: true,
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
        </Stack.Navigator>
      </NavigationContainer>
    </AppScreen>
  );
};
export default MainStack;
