import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { hero, TaskPhoto, Google, hamburger } from "./assets";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/colors";
import { useFonts } from "expo-font";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";

const AddTask = () => {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  return (
    <View style={styles.container}>
      <View style={{ flex: 2, alignItems: "center" }}>
        <LinearGradient
          colors={[
            colors.formGradient,
            colors.formGradient2,
            colors.formGradient3,
          ]}
          style={styles.gradient}
        ></LinearGradient>
        <Image source={TaskPhoto} style={styles.image} />
      </View>

      <View style={styles.formContainer}>
        <Text>Add New Task</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Task</Text>
          <TextInput placeholder="Task Name" style={styles.input} />
          <Text style={styles.label}>Category</Text>
          <TextInput placeholder="Category" style={styles.input} />
          <Text style={styles.label}>Tags</Text>
          <TextInput placeholder="Tags" style={styles.input} />
          <Text style={styles.label}>Time</Text>
          <TextInput placeholder="Time" style={styles.input} />
          <Text style={styles.label}>Due Date</Text>
          <TextInput placeholder="Due Date" style={styles.input} />

          <LinearGradient
            colors={[colors.taskBtn1, colors.taskBtn2]}
            style={{ borderRadius: 10, marginHorizontal: 14 }}
          >
            <TouchableOpacity style={styles.button}>
              <Text style={styles.btnText}>Add Task</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  gradient: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.39,
    height: Dimensions.get("window").width * 0.39,
    backgroundColor: "#f00",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  button: {
    padding: 19,
    alignItems: "center",
    borderRadius: 45,
  },
  btnText: {
    color: "white",
    fontFamily: "Roboto_700Bold",
    fontSize: 18,
    textTransform: "uppercase",
  },
  image: {
    width: 150,
    height: 150,
    top: 20,
    position: "absolute",
    zIndex: 2,
  },
  formContainer: {
    flex: 8,
  },
  form: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 3,
    padding: 10,
    borderColor: "rgba(226, 226, 234, 1)",
  },
  label: {
    textTransform: "uppercase",
    color: colors.dashboardFont,
    fontFamily: "Roboto_400Regular",
  },
});
