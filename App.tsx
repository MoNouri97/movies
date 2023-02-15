import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './src/Main';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View className='flex-1 items-center justify-center '>
        <Main />
        <StatusBar style='auto' />
      </View>
    </QueryClientProvider>
  );
}
