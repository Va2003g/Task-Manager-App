import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TaskData } from '@/Backend'
import colors from '@/colors'
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Poppins_100Thin, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
interface taskProps{
    task:TaskData
}
const TaskItem = ({task}:taskProps) => {

  const [fontsLoaded, fontError] = useFonts({
    Roboto_500Medium,Poppins_300Light,Poppins_600SemiBold
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.taskFont}>Task Name: {task.name}</Text>
      <Text style={[styles.tagsFont]}>Category: {task.category}</Text>
      <Text style={[styles.tagsFont]}>Due Date: {task.dueDate}</Text>
      <Text style={styles.tags}>
        Tags: {task.tags.join(', ')}
      </Text>
    </View>
  )
}

export {TaskItem}

const styles = StyleSheet.create({
  container:{
    backgroundColor:colors.pendingTaskBG,
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1, 
    shadowRadius: 60, 
    minHeight:120,
    maxHeight:220,
    display:'flex',
    width:'100%',
    gap:3,
    borderRadius: 18,
    paddingLeft:20,
    paddingTop:15,
  },
  tags:{
    // flex:1,
    // flexDirection:'row',
    fontFamily:'Poppins_300Light',
    fontSize:15,
  },
  tagsFont:{
    fontFamily:'Poppins_300Light',
    fontSize:15,
  },
  taskFont:{
    fontFamily:'Roboto_500Medium',
    fontSize:18,
  }
})