import { makeAutoObservable, makeObservable, observable } from "mobx";
import { AddUser, FetchTask } from "@/Backend";
import { TaskData } from "@/Backend";

class store {
  User: Object = {};
  Tasks: TaskData | null = null;
  UserId: string | undefined = "";
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
      console.log("id: ", id);
      this.UserId = id;
    });
  }

  addTask(tasks: TaskData) {
    this.Tasks = tasks;
    console.log("Task data at mobx", tasks);
    //call addtask function
    /**
     * in add task firstly save all tags with userid and name in firebase
     * same for category
     * same for status
     * store all these 3 ids (or more if tags are multiple)
     * then store task data with TaskName,UserId,CategoryId,TagsId,DueDate,StatusId in firebase
     */
  }
  get getUserId() {
    return this.UserId;
  }
}

export const Store = new store();
