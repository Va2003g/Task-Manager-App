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
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Link, router, useNavigation } from "expo-router";
import colors from "@/colors";
import { LinearGradient } from "expo-linear-gradient";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { Store } from "@/MobX/store";
import { TaskItem } from "@/components";
import { TaskData, db } from "@/Backend";
import { doc, collection, getDoc } from "firebase/firestore";
import { TextInput } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { loadingGif } from "../assets";

const DashBoardScreen = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [taskToDisplay,setTaskToDisplay] = useState<TaskData[]>(Store.UserTask);
  // const [loading,setLoading] = useState<boolean>()

  useEffect(()=>{setTaskToDisplay(Store.UserTask)},[])

  const filterArray= async (filter:string)=>{
    try {
      Store.setloading(true);
      const filteredTasks = await Promise.all(
        Store.UserTask.map(async (task) => {
          const statusDocRef = doc(collection(db, "Status"), task.status);
          const status = await getDoc(statusDocRef);
  
          if (status.exists() && status.get(filter) === true) {
            console.log("task", task);
            return task;
          }
          return null;
        })
      );
      const nonNullFilteredTasks = filteredTasks.filter((task):task is TaskData => task !== null);

      console.log("filteredTasks", nonNullFilteredTasks);
      if(filter==='Pending') Store.setPendingTask(nonNullFilteredTasks.length)
      else Store.setCompletedTask(nonNullFilteredTasks.length)
      Store.setloading(false);
      setTaskToDisplay(nonNullFilteredTasks);
    } catch (error) {
      console.error("Error filtering tasks:", error);
    }
  }
  const handlePress = (filter: string) => {
    console.log('working')
    setSelectedFilter(filter);
    if(filter==='All'){setTaskToDisplay(Store.UserTask)}
    if(filter==='Pending')filterArray('Pending')
    if(filter==='Completed')filterArray('Completed')
  };

  const handleChange=(text:string):void=>
  {
    if(text==='')
    {
      setTaskToDisplay(Store.UserTask)
      return;
      // handlePress('All')
    }
    const lowercasedFilter = text.toLowerCase();
    const filteredData = taskToDisplay.filter(item => {
      return (
        item.name.toLowerCase().includes(lowercasedFilter) ||
        item.category.toLowerCase().includes(lowercasedFilter) ||
        item.dueDate.toLowerCase().includes(lowercasedFilter) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowercasedFilter)) 
        // item.status.toLowerCase().includes(lowercasedFilter)
      );
    });
    setTaskToDisplay(filteredData);
  }

  const getTextStyle = (filter: string) => {
    return selectedFilter === filter ? styles.filterColor : styles.font;
  };
  const [fontsLoaded, fontError] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  });

  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }
  interface itemProp {
    item: TaskData;
  }
  const renderTaskItem = ({ item }: itemProp) => <TaskItem task={item} />;
  return (
    <View style={styles.outerContainer}>
      {Store.showSearch && <TextInput style={styles.search} placeholder="Search.." onChangeText={(text) => handleChange(text)}/>}
      
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
          <Image source={loadingGif} style={{width:100,height:100,marginHorizontal:'auto'}}/>
        ) : (
          <FlatList
            data={taskToDisplay}
            renderItem={renderTaskItem}
            keyExtractor={(item, index) => item.id || index.toString()}
            showsVerticalScrollIndicator={false}
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
  search:{
    height:34,
    // borderWidth:1,
    marginBottom:20,
    // borderColor:'grey',
    paddingLeft:20,
    borderRadius:12,
    backgroundColor:'#fff'
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
