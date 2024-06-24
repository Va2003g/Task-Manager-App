import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { Store } from "@/MobX/store";
import { Image } from "expo-image";
import colors from "@/colors";
const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={Store.User.photoURL} style={styles.image} />
        <Text style={styles.name}>{Store.User.displayName}</Text>
      </View>
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>User Email :</Text>
          <Text style={styles.info}>{Store.User.email}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>No. of Tasks:</Text>
          <Text style={styles.info}>{Store.UserTask.length}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>No. of Pending Tasks:</Text>
          <Text style={styles.info}>{Store.pendingTask}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>No. of Completed Tasks:</Text>
          <Text style={styles.info}>{Store.completedTask}</Text>
        </View>
      </View>
    </View>
  );
};

export default observer(Profile);

const styles = StyleSheet.create({
  container: {
    // flex:1,
    // backgroundColor:colors.secondaryDashboard,
    // // justifyContent:'center',
    // alignItems:'center',
    // gap:27,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  userInfoContainer: {
    backgroundColor: "#F0F0F0",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  userInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  info: {
    fontSize: 18,
    color: "#666666",
  },
  font: {
    fontSize: 22,
  },
});
