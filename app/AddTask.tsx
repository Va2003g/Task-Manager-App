import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { hero, TaskPhoto, Google, hamburger } from "./assets";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/colors";

const AddTask = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          colors.formGradient,
          colors.formGradient2,
          colors.formGradient3,
        ]}
        style={styles.gradient}
      ></LinearGradient>
      <Image source={TaskPhoto} style={styles.image} />
      
      <Text style={styles.form}>
        AddTask
      </Text>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  gradient: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.38,
    height: Dimensions.get("window").width * 0.38,
    backgroundColor: "#f00",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  image: {
    width: 150,
    height: 150,
    top: 9,
    position: "absolute",
    zIndex: 2,
  },
  form: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
