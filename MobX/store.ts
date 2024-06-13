import { makeAutoObservable, makeObservable, observable } from "mobx";


interface Task {
    name:string;
    category:string,
    tags:string,
    dueDate:string,
    status:string,
    userId:string,
}

class store{

    User:Object={};
    Tasks:Task[]=[];

    constructor(){
        makeAutoObservable(this)

        //states are observable like this or above method
        // makeObservable(this,{
        //     User:observable,
        //     Tasks:observable,
        // })
    }

    updateUser(userData:object){
        this.User = userData
    }

    addTask(tasks:Task[])
    {
        this.Tasks=tasks;
    }

}

export const Store = new store();