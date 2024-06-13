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
      <View style={styles.filter}>
        <Text>All</Text>
        <Text>Pending</Text>
        <Text>Completed</Text>
      </View>
      <View style={styles.tasks}></View>
      
      <StatusBar barStyle={"light-content"} />
    </View>
  );
};

export default DashBoardScreen;
const styles = StyleSheet.create({
  
  filter: {
    flex: 3,
    flexDirection:'row',
  },
  outerContainer: {
    flex: 1,
  },
  tasks: {
    flex: 5,
  },
});
