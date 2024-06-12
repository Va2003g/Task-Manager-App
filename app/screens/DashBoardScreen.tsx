import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Platform,
  StatusBar,
  Pressable,
} from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../Backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Roboto_700Bold } from "@expo-google-fonts/roboto";
import {router, useNavigation } from "expo-router";

const DashBoardScreen = () => {
  const navigation = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    Roboto_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.filter}></View>
      <View style={styles.tasks}></View>
      <Pressable style={{marginBottom:10}}>
      <Button
        title="Sign Out"
        onPress={async () => {
          await signOut(auth);
          AsyncStorage.clear();
          router.push('LoginScreen')
        }}
      />
      </Pressable>
      <StatusBar barStyle={"light-content"} />
    </View>
  );
};

export default DashBoardScreen;
const styles = StyleSheet.create({
  
  filter: {
    flex: 3,
  },
  outerContainer: {
    flex: 1,
  },
  tasks: {
    flex: 5,
  },
});
