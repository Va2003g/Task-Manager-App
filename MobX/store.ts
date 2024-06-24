import { makeAutoObservable, makeObservable, observable } from "mobx";
import { AddTask, AddUser, FetchTask } from "@/Backend";
import { TaskData } from "@/Backend";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { router } from "expo-router";

interface statusType {
  Pending: Boolean;
  Completed: Boolean;
  id: string;
  userId: string;
}
interface typeForCategoriesTags {
  name: string;
  id: string;
  userId: string;
}
class store {
  User: Object = {};
  Tasks: TaskData | null = null;
  UserId: string | undefined = "";
  UserTask: TaskData[] = [];
  loading: boolean = false;
  statusArray: statusType[]=[]
  showSearch:boolean = false;
  pendingTask:number = 0
  completedTask:number = 0
  categoryData:typeForCategoriesTags[]=[]
  tagsData:typeForCategoriesTags[]=[]

  constructor() {
    makeAutoObservable(this);

    //states are observable like this or above method
    // makeObservable(this,{
    //     User:observable,
    //     Tasks:observable,
    // })
  }
  setCategoriesData(data:typeForCategoriesTags[]){
    this.categoryData = data;
    console.log(' this.categoryData: ',  this.categoryData)

  }
  setTagsData(data:typeForCategoriesTags[]){
    this.tagsData = data;
  }
  setPendingTask(value:number) {this.pendingTask = value;this.completedTask = this.UserTask.length - this.pendingTask}
  setCompletedTask(value:number) {this.completedTask = value;this.pendingTask = this.UserTask.length - this.completedTask}
  setShowSearch()
  {
    this.showSearch = !this.showSearch;
  }

  setStatusArray=(status:statusType[])=>{
    this.statusArray = status;
  }

  setloading = (value: boolean) => {
    this.loading = value;
  };

  async updateUser(userData: object) {
    this.User = userData;
    try {
      const id = await AddUser(userData);
      if(id!==undefined) this.UserId = id;
      console.log("Userid from local storage in mobx: ", this.UserId);

      this.setloading(true);
      let tasks = await AsyncStorage.getItem("TaskData");
      // console.log('tasks in update user before condition: ', tasks,typeof(tasks))
      // tasks = tasks ? await JSON.parse(tasks) : [];

      if (tasks !== null) {
        console.log("tasks from local storage: ", tasks);
        this.updateUserTask(await JSON.parse(tasks));
        this.setloading(false);
      } else {
        await this.callFetchTask();
      }
    } catch (error) {
      console.error("Error in updateUser: ", error);
    }finally{
      this.setloading(false);
    }
  }

  async callFetchTask() {
    try{
      const fetchedTasks = await FetchTask(this.UserId);
      if (fetchedTasks !== undefined) {
        this.updateUserTask(fetchedTasks);
        await AsyncStorage.setItem("TaskData", JSON.stringify(fetchedTasks));
        console.log("data Saved successfully");
        this.setloading(false);
      }
    }catch(err)
    {
      console.log(err);
    }
  }
  addTask(tasks: TaskData) {
    this.Tasks = tasks;
    if (this.UserId !== undefined) {
      this.Tasks.userId = this.UserId;
      AddTask(tasks, this.UserId).then(async (res) =>
        res
          ? (Alert.alert("Success", "Data saved successfully"),await this.callFetchTask())
          : Alert.alert("Failure", "Error in Saving Data")
      );
    }
  }

  updateUserTask(tasks: TaskData[]) {
    this.UserTask = tasks;
    console.log("tasks at updateUserTask: ", tasks);
    // AsyncStorage.setItem("TaskData", JSON.stringify(tasks)).then((tasks) =>
    //   console.log("data at updateUserTask", tasks)
    // );
  }
  get getUserId() {
    return this.UserId;
  }
}

export const Store = new store();
