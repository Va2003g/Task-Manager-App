import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import LoginScreen from "./LoginScreen";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser"; //display web browser in app for login
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FetchTask, TaskData, auth } from "../Backend";
import { router } from "expo-router";
import { Store } from "@/MobX/store";

WebBrowser.maybeCompleteAuthSession();
export default function App() {
  const [userInFo, setUserInfo] = useState<Object>();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  }); 

  const checkUserFromLocalStorage = async () => {
    // setLoading(true);
    try {
      let user: string | null | object = await AsyncStorage.getItem("userInfo");
      user = user ? JSON.parse(user) : null;
      if (user != null) {
        console.log('user from local storage: ', user)
        setUserInfo(user);
        if(typeof user!=='string')
        Store.updateUser(user);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (response?.type === "success") {
      console.log(`Google sign-in response on ${Platform.OS}: `, response);
      try {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential);
      } catch (err) {
        console.log("err: ", err);
      }
    } else {
      console.log(
        `Google sign-in response type on ${Platform.OS}: `,
        response?.type
      );
    }
  }, [response]);
  
  useEffect(() => {
    checkUserFromLocalStorage();
    try {
      const unsub = onAuthStateChanged(auth, async (user) => {
        if (user) {
          if (Platform.OS === "android")
            console.log("user", JSON.stringify(user));
          await AsyncStorage.setItem("userInfo", JSON.stringify(user));
            Store.updateUser(user).then(()=>router.push("screens/DashBoardScreen"));
            // Store.updateUser(user)
            // router.push("screens/DashBoardScreen")
        } else {
          setUserInfo("");
          console.log("no one is logged in");
        }
      });
      ()=>unsub();
    } catch (err) {
      console.log("err: ", err);
    }
  }, []);
  //Warn:navigation is changing while component is not rendered
  // useEffect(() => {
  //   if (userInFo) {
  //     Store.updateUser(userInFo);
  //     router.push("screens/DashBoardScreen");
  //   }
  // }, [userInFo]);

  return userInFo ? null : ( // router.push('screens/DashBoardScreen')
    <View style={{ flex: 1 }}>
      <LoginScreen promptAsync={() => promptAsync()} />
    </View>
  );
}
