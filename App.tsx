import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  useFonts,
} from "@expo-google-fonts/dm-sans";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HistoryContextProvider } from "~/context/HistoryContext";
import MainStack from "~/navigation/MainStack";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});
export default function App() {
  // fonts
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });
  useEffect(() => {
    const onLayoutRootView = async () => {
      if (fontsLoaded) {
        await SplashScreen?.hideAsync();
      }

      if (fontsLoaded) {
        await SplashScreen?.hideAsync();
      }
    };
    onLayoutRootView();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <HistoryContextProvider>
          <MainStack />
        </HistoryContextProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
