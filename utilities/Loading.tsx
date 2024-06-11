import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

export const Loading = () => {
  return (
    <View style = {styles.container}>
      <ActivityIndicator size={'large'}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignContent:'center'
    }
})