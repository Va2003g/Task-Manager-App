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
import { Search, Bell, hamburger } from "../assets";
import { Image } from "expo-image";
import colors from "../../colors";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Link, router, useNavigation } from "expo-router";

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
  drawerIcon: {
    width: 29,
    height: 20,
  },
  textContainer: {
    flex: 2,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "baseline",
  },
  text: {
    fontFamily: "Roboto_700Bold",
    fontSize: 27,
    color: "white",
  },
  images: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  filter: {
    flex: 3,
  },
  logo: {
    width: 30,
    height: 30,
  },
  navbarGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 16,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  outerContainer: {
    flex: 1,
  },
  tasks: {
    flex: 5,
  },
});
