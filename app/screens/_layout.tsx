import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import colors from "../../colors";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Search, Bell, hamburger } from "../assets";
import { Link, router } from "expo-router";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Navbar from '../../components/Navbar'
const DrawerLayout = () => {
  const navigation = useNavigation();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        initialRouteName="screens/DashBoardScreen"
        screenOptions={{
          header: () => {
            return (
              <Navbar/>
            );
          },
        }}
      >
        <Drawer.Screen
          name="DashBoardScreen"
          options={{
            drawerLabel: "DashBoard",
            title: "DashBoard",
          }}
        />
        <Drawer.Screen
          name="MyDayTasks"
          options={{
            drawerLabel: "My Day Tasks",
            title: "My Day Tasks",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;

