import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TaskData } from '@/Backend'

interface taskProps{
    task:TaskData
    key:number
}
const TaskItem = ({task,key}:taskProps) => {
  return (
    <View>
      <Text>{task.name}</Text>
      <Text>{task.category}</Text>
      <Text>{task.dueDate}</Text>
      <Text>{task.status}</Text>
      <Text>{task.tags}</Text>
    </View>
  )
}

export default TaskItem

const styles = StyleSheet.create({})