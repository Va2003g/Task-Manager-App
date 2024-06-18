import { makeAutoObservable, makeObservable, observable } from "mobx";
import { AddTask, AddUser, FetchTask } from "@/Backend";
import { TaskData } from "@/Backend";
import { Alert } from "react-native";

class store {
  User: Object = {};
  Tasks: TaskData | null = null;
  UserId: string | undefined = "";
  UserTask:TaskData[] = []
  constructor() {
    makeAutoObservable(this);

    //states are observable like this or above method
    // makeObservable(this,{
    //     User:observable,
    //     Tasks:observable,
    // })
  }

  updateUser(userData: object) {
    this.User = userData;
    //    const data = FetchTask(userData).then((data)=>console.log('data at mobx',data));
    const id = AddUser(userData).then((id) => {
      this.UserId = id;
      // console.log("Userid: ", this.UserId);
    });
  }

  addTask(tasks: TaskData) {
    this.Tasks = tasks;
    if (this.UserId !== undefined) {
      this.Tasks.userId = this.UserId;
      AddTask(tasks, this.UserId).then((res) =>
        res
          ? Alert.alert("Success", "Data saved successfully")
          : Alert.alert("Failure", "Error in Saving Data")
      );
    }
  }

  updateUserTask(tasks:TaskData[])
  {
    this.UserTask = tasks;
  }
  get getUserId() {
    return this.UserId;
  }
}

export const Store = new store();
