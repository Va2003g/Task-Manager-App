import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const MyDayTasks = () => {
  return (
    <View style={styles.container}>
      <Text>My Day Tasks</Text>
    </View>
  )
}

export default MyDayTasks
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
})