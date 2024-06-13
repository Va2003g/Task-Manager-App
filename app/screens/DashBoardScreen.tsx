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
import { useFonts } from "expo-font";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { router, useNavigation } from "expo-router";
import colors from "@/colors";

const DashBoardScreen = () => {
  const navigation = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    Roboto_700Bold,Roboto_400Regular
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
        <View style={styles.tasks}></View>

      <StatusBar barStyle={"light-content"} />
    </View>
  );
};

export default DashBoardScreen;
const styles = StyleSheet.create({
  filter: {
    flex: 1,
    flexDirection: "row",
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'white',
    gap:1,
    borderRadius:8,
  },
  outerContainer: {
    flex: 1,
    backgroundColor:colors.secondaryDashboard,
    padding:16,
  },
  tasks: {
    flex: 20,
  },
  font:{
    color:colors.dashboardFont,
    fontFamily:'Roboto_400Regular',
    // color:'white',
    flex:1,
    textAlign:'center',
    // shadowColor:'#0000000F',
    // shadowOffset:{width:0,height:4},
    // backgroundColor:'blue',
    padding:10,
    fontWeight:'bold',
    fontSize:16,
  }
});
