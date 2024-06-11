import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const MyDayTasks = () => {
  return (
    <View style={styles.container}>
      <Text>MyDayTasks</Text>
      <Link href='screens/DashBoardScreen'>DashBoard</Link>
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