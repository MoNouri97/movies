import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Main from '~/screens/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View className='flex-1 items-center justify-center bg-white'>
        <Main />
        <StatusBar style='auto' />
      </View>
    </QueryClientProvider>
  );
}
