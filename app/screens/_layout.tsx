import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import {Navbar,CustomDrawer} from '../../components'
import { DrawerContentComponentProps, DrawerHeaderProps } from "@react-navigation/drawer";
import { StatusBar } from "react-native";
const DrawerLayout = () => {
  const navigation = useNavigation();
  <StatusBar barStyle={"light-content"} />
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        initialRouteName="screens/DashBoardScreen"
        drawerContent={(props: DrawerContentComponentProps)=>{
          return <CustomDrawer {...props}/>
        }}
        screenOptions={{
          header: (props: DrawerHeaderProps) => {
            return <Navbar {...props}/>
          },
        }}
      >
        <Drawer.Screen
          name="DashBoardScreen"
          options={{
            drawerLabel: "Dashboard",
            title: "Dashboard",
          }}
        />
        {/* <Drawer.Screen
          name="MyDayTasks"
          options={{
            drawerLabel: "My Day Tasks",
            title: "My Day Tasks",
          }}
        /> */}
        <Drawer.Screen
          name="Profile"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;

