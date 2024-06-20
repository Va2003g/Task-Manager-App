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
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Link, router, useNavigation } from "expo-router";
import colors from "@/colors";
import { LinearGradient } from "expo-linear-gradient";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { Store } from "@/MobX/store";
import { TaskItem } from "@/components";
import { TaskData } from "@/Backend";

const DashBoardScreen = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const handlePress = (filter: string) => {
    setSelectedFilter(filter);
  };

  const getTextStyle = (filter: string) => {
    return selectedFilter === filter ? styles.filterColor : styles.font;
  };
  const [fontsLoaded, fontError] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  interface itemProp {
    item: TaskData;
  }
  const renderTaskItem = ({ item }: itemProp) => <TaskItem task={item} />;
  return (
    <View style={styles.outerContainer}>
      <View style={styles.filter}>
        <Text style={getTextStyle("All")} onPress={() => handlePress("All")}>
          All
        </Text>
        <Text
          style={getTextStyle("Pending")}
          onPress={() => handlePress("Pending")}
        >
          Pending
        </Text>
        <Text
          style={getTextStyle("Completed")}
          onPress={() => handlePress("Completed")}
        >
          Completed
        </Text>
      </View>
      <View style={styles.tasks}>
        {Store.loading ? (
          <Text>Loading....</Text>
        ) : (
          <FlatList
            data={Store.UserTask}
            renderItem={renderTaskItem}
            keyExtractor={(item, index) => item.id || index.toString()}
          />
        )}
      </View>
      <LinearGradient
        style={styles.addBtn}
        colors={[colors.addFormGradient, colors.addFormGradient2]}
      >
        <Pressable onPress={() => router.push("AddTask")}>
          <Text style={styles.plusIcon}>+</Text>
        </Pressable>
      </LinearGradient>

      <StatusBar barStyle={"light-content"} />
    </View>
  );
};

export default observer(DashBoardScreen);
const styles = StyleSheet.create({
  filter: {
    flex: 1.3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    gap: 1,
    borderRadius: 10,
  },
  filterColor: {
    backgroundColor: colors.filterActiveColor,
    color: "white",
    fontFamily: "Roboto_400Regular",
    flex: 1,
    textAlign: "center",
    padding: 13,
    fontWeight: "bold",
    fontSize: 16,
    borderRadius: 15,
  },
  outerContainer: {
    flex: 1,
    backgroundColor: colors.secondaryDashboard,
    padding: 16,
  },
  tasks: {
    flex: 20,
    // justifyContent: "center",
    // alignItems: "center",
    zIndex: 2,
    gap: 10,
    marginTop: 15,
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
    padding: 13,
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
