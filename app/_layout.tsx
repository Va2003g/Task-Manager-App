import { View, Text,StatusBar } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const _layout = () => {
  <StatusBar barStyle={"light-content"} />
  return (
    <Stack
      screenOptions={{
        headerShown:false
      }}
    >
      <Stack.Screen
        name='screens'
      />
      <Stack.Screen
        name='AddTask'
        options={{
          presentation:'modal',
        }}
      />

    </Stack>
  )
}

export default _layout