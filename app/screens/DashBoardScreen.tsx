import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Platform,
  StatusBar,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Link, router, useNavigation } from "expo-router";
import colors from "@/colors";
import { LinearGradient } from "expo-linear-gradient";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { Store } from "@/MobX/store";
import TaskItem from "@/components/TaskItem";

const DashBoardScreen = () => {
  const navigation = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.filter}>
        <Text style={styles.font}>All</Text>
        <Text style={styles.font}>Pending</Text>
        <Text style={styles.font}>Completed</Text>
      </View>
      <View style={styles.tasks}>
          {Store.UserTask.map((task,index)=><TaskItem task={task} key={index}/>)}
      </View>
      <LinearGradient
        style={styles.addBtn}
        colors={[colors.addFormGradient, colors.addFormGradient2]}
      >
        <Link href="AddTask" style={styles.plusIcon}>
          +
        </Link>
      </LinearGradient>

      <StatusBar barStyle={"light-content"} />
    </View>
  );
};

export default observer(DashBoardScreen);
const styles = StyleSheet.create({
  filter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    gap: 1,
    borderRadius: 8,
  },
  outerContainer: {
    flex: 1,
    backgroundColor: colors.secondaryDashboard,
    padding: 16,
  },
  tasks: {
    flex: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  addBtn: {
    position: "absolute",
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.17,
    height: Dimensions.get("window").width * 0.17,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
    top: Dimensions.get("screen").height / 1.4,
    left: Dimensions.get("screen").width / 1.3,
  },
  font: {
    color: colors.dashboardFont,
    fontFamily: "Roboto_400Regular",
    flex: 1,
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  plusIcon: {
    color: "white",
    fontSize: 65,
    fontWeight: "500",
    borderRadius: 43,
    top: -5,
  },
});
