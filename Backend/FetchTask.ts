import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "./Firebase";
import { Task } from "@/MobX/store";

async function FetchTask(user:Object) {
  try {
    const queryForFindingUser = query(
      collection(db, "UserData"),
      where("email", "==", user.email)
    );
    const queryResultForFindingUser = await getDocs(queryForFindingUser);
    let id = queryResultForFindingUser.docs[0].id;
    queryResultForFindingUser.forEach((doc) => {
      id = doc.id;
    });
    const queryForFindingTask = query(
      collection(db, "Tasks"),
      where("userId", "==", id)
    );
    const taskQueryResult = await getDocs(queryForFindingTask);

    const data = [];
    taskQueryResult.forEach((doc) => {
      data.push({id: doc.id, ...doc.data(),});
    });
    console.log('data at fetch tasks',data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export { FetchTask };
