import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View,Platform } from 'react-native';
import { ActivityHomeScreen } from './src/screens/Home';
import { COLORS } from './src/variables/styles';
import { useEffect,useState } from 'react';
import { clearStorage, isAsyncStorageEnabled, loadIsTutorialWatched } from './src/storage';
import { TutorialScreen } from './src/screens/Tutorial';

export default function App() {
  const [isStorageEnabled, setIsStorageEnabled] =useState(null);
  const [isTutortialWatched, setIsTutorialWatched] = useState(null);

  useEffect (() =>{
    const checkStorage = async()=>{
      const isEnabled = await isAsyncStorageEnabled()
      setIsStorageEnabled(isEnabled);
    }

    const checkTutorial = async () => {
      const data = await loadIsTutorialWatched();
      setIsTutorialWatched(!!data);
    }

    checkTutorial();
    checkStorage();
  }, []);

  const containerStyle = Platform.OS ==="web" ? {
    maxWidth:500,
    margin:"auto"
  } : {};

  return (
    <SafeAreaView style={styles.safeContainer}>
    <View style={{...styles.container,...containerStyle}}>
    {isStorageEnabled == null || isTutortialWatched == null ?
          <></>:
      <>
            { !isTutortialWatched &&
            <TutorialScreen
              onSkip={() => setIsTutorialWatched(true)}
              visible={true}
            />
            }
            <ActivityHomeScreen
              onOpenTutorial={() => setIsTutorialWatched(false)}
              isStorageEnabled={isStorageEnabled}
            />
          </>        
      }
      <StatusBar style="light" />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    width:"100%",
    flex: 1,
    backgroundColor: COLORS.black,
  },
  container: {
    width:"100%",
    flex: 1,
    padding:20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
