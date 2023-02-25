import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadFromStorage = async <T = string>(key: string) => {
  console.log(`Loading ${key}`);
  let loaded;
  try {
    loaded = await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
  console.log(`Loaded ${key}`);
  return loaded ? (JSON.parse(loaded) as T) : null;
};
export const saveToStorage = (toSave: any, key: string) => {
  AsyncStorage.setItem(key, JSON.stringify(toSave));
  console.log(`Saved ${key}`);
};
