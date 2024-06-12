import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import React from "react";
import colors from "../colors";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { hero } from "@/app/assets";
import { useFonts } from "expo-font";
import { Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { router } from "expo-router";
import { auth } from "@/Backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";

export const CustomDrawer = (props: DrawerContentComponentProps) => {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_700Bold,Roboto_500Medium
  });

  if (!fontsLoaded && !fontError) {
    console.log("Fonts not loaded in drawer");
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <LinearGradient
          colors={[colors.primaryDashboard, colors.primaryDashboard2]}
          style={styles.gradientWindow}
        >
          <Image source={hero} style={styles.image} />
          <Text style={styles.name}>Vansh Gupta</Text>
        </LinearGradient>
        <View style={styles.content}>
          {props.state.routes.map((routeName, index) => {
            const focused = props.state.index === index;
            const { drawerLabel } = props.descriptors[routeName.key].options;

            return (
              <Pressable
                key={index}
                onPress={() => router.navigate(`screens/${routeName.name}`)}
              >
                {focused ? (
                  <LinearGradient
                    colors={[colors.primaryDashboard, colors.primaryDashboard2]}
                    style={styles.drawerGradient}
                  >
                    {/* {drawerLabel is string or a function which returns React Node containing two things or props} */}
                    <Text style={styles.name}>{drawerLabel?.toString()}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.drawerItemContainer}>
                    <Text style={[styles.name,{ color: "black"}]}>
                      {drawerLabel?.toString()}
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
      <View>
        <Pressable style={{ marginBottom: 15 }}>
          <Button
            title="Log Out"
            onPress={async () => {
              await signOut(auth);
              AsyncStorage.clear();
              router.push("LoginScreen");
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 6,
    paddingLeft:20,
    gap:23,
  },
  contentContainer: {
    flex: 5,
    gap:15,
  },
  drawerGradient: {
    padding: 13,
    width:150,
    borderRadius:13,
    alignItems:'center'
  },
  drawerItemContainer: {
    padding: 6,
  },
  gradientWindow: {
    flex: 1,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: "center",
    paddingLeft: 29,
    paddingTop: 40,
    gap: 10,
  },
  image: {
    width: 70,
    height: 50,
    borderRadius: 50,
  },
  name: {
    fontFamily: "Roboto_500Medium",
    color: "white",
    fontSize: 20,
  },
});
