import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import React, { useState } from "react";
import colors from "../colors";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Google, hero, logo } from "./assets";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { AuthSessionResult } from "expo-auth-session";

type promptAsyncProp = {
  promptAsync: () => Promise<AuthSessionResult>;
};
const LoginScreen = ({ promptAsync }: promptAsyncProp) => {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LinearGradient
      colors={[colors.gradientLogin, colors.gradient2Login]}
      style={styles.background}
      locations={[0.999, 1]}
    >
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={hero}
            contentFit="contain"
            style={{ height: 210, width: 560 }}
          />
        </View>
        <View style={styles.textContainer}>
          <Image
            // source={logo}
            alt="Your Logo"
            contentFit="contain"
            style={{ height: 100, width: 200 }}
          />

          <Text style={styles.text}>Log In to Your Account</Text>

          <Pressable
            style={styles.submitBtn}
            onPress={() => promptAsync()}
          >
            <Image
              source={Google}
              contentFit="contain"
              style={{ height: 40, width: 15 }}
            />
            <Text style={styles.btnText}>Continue with Google</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // opacity:0.31,
  },
  btnText: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
  },
  container: {
    flex: 1,
    gap: 10,
  },
  imgContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 26,
    lineHeight: 30,
    letterSpacing: 0.1,
    fontFamily: "Poppins_500Medium",
    color: colors.fontColor,
    top: -22,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    gap: 5,
  },
  submitBtn: {
    flexDirection: "row",
    gap: 9,
    backgroundColor: colors.btnColor,
    top: -15,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    width: 360,
    height: 55,
    cursor: "pointer",
  },
});
