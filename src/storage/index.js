import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error storing data:', error);
    return false;
  }
};
const loadData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};
const storeDayFlowItems = async data => {
  return storeData("dayFlowItems", data)
}
const loadDayFlowItems = async () => {
  return loadData("dayFlowItems")
}

const storeIsTutorialWatched = async () => {
  return storeData("dayFlowTutorial", 1);
}

const loadIsTutorialWatched = async () => {
  const data = await loadData("dayFlowTutorial")
  return data;
}


export const isAsyncStorageEnabled = async () => {
  try {
    await AsyncStorage.setItem("flowTestKey", "testFlowValue");
    await AsyncStorage.getItem("flowTestKey");
    return true;
  } catch (error) {
    console.error("Storage is not enabled: ", error);
    return false;
  }
}

const clearStorage = () => {
  AsyncStorage.clear();
}

export {
  storeData,
  loadData,
  storeDayFlowItems, loadDayFlowItems,
  storeIsTutorialWatched, loadIsTutorialWatched, clearStorage
};