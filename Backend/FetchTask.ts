import {
  query,
  collection,
  getDocs,
  where,
  QueryDocumentSnapshot,
  DocumentData,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./Firebase";
import { TaskData } from "./TaskData";

/**
 * find all categories with ids
 * find all tags with ids
 * the update status in task object with id
 * task [{"category": "frdiAjXU6xVfnkNmGYYI", "dueDate": "23-3-2004", "id": "6GG4uibP9SgWUsymYQoa", "name": "Cricket", "status": "fEIXoIWwPHCNVPRFv49h", "tags": ["BF8rH3uLevaIWulsnA98", "AvzpT0446yCGRRvRLk3d", "XvLTQXLuCR5AhejpHN0d"], "userId": "B4gkf4gcGiCVv6XeyBMR"}, {"category": "6mCgxce7tXPlr980CdF0", "dueDate": "23-3-2004", "id": "yZSArfarE9qAPV5CWRbR", "name": "HomeWork", "status": "eTuEpqojYKEYe4eNExvd", "tags": ["kw69WXREonekMH7l55IY", "Cw2ovKEypkrSG6B1fssz"], "userId": "B4gkf4gcGiCVv6XeyBMR"}]
 * statusArray:  [{"Completed": false, "Pending": true, "id": "eTuEpqojYKEYe4eNExvd", "userId": "B4gkf4gcGiCVv6XeyBMR"}, {"Completed": false, "Pending": true, "id": "fEIXoIWwPHCNVPRFv49h", "userId": "B4gkf4gcGiCVv6XeyBMR"}]
 * categoryArray:  [{"id": "6mCgxce7tXPlr980CdF0", "name": "Study", "userId": "B4gkf4gcGiCVv6XeyBMR"}, {"id": "frdiAjXU6xVfnkNmGYYI", "name": "Games", "userId": "B4gkf4gcGiCVv6XeyBMR"}]
 * tagsArray:  [{"id": "AvzpT0446yCGRRvRLk3d", "name": "Entertainment", "userId": "B4gkf4gcGiCVv6XeyBMR"}, {"id": "BF8rH3uLevaIWulsnA98", "name": "Sport", "userId": "B4gkf4gcGiCVv6XeyBMR"}, {"id": "Cw2ovKEypkrSG6B1fssz", "name": "Job", "userId": "B4gkf4gcGiCVv6XeyBMR"}, {"id": "XvLTQXLuCR5AhejpHN0d", "name": "Cardio", "userId": "B4gkf4gcGiCVv6XeyBMR"}, {"id": "kw69WXREonekMH7l55IY", "name": "Work", "userId": "B4gkf4gcGiCVv6XeyBMR"}]
 *
 *
 *
 */

interface typeForCategoriesTags {
  name: string;
  id: string;
  userId: string;
}
interface statusType {
  Pending: Boolean;
  Compeleted: Boolean;
  id: string;
  userId: string;
}

function formatTask(
  tasks: TaskData[],
  categoryArray: typeForCategoriesTags[],
  tagsArray: typeForCategoriesTags[],
  statusArray: statusType[]
) {
  tasks.forEach((task) => {
    // task.category = find(task.category,categoryArray);
    task.category = categoryArray.filter((arr)=>arr.id===task.category)[0].name;
    let filteredArray = statusArray.filter((arr)=>arr.id===task.status)[0]
    if(filteredArray.Pending) task.status = 'pending'
    else if(filteredArray.Compeleted) task.status = 'completed'

    let tagsFilteredArray:string[]=[];
    for(let ele of task.tags)
    {
      tagsArray.filter((tags)=>tags.id===ele).forEach((tags)=>tagsFilteredArray.push(tags.name));
    }
    task.tags = tagsFilteredArray;
  });
  // console.log('tasks at formatTask',tasks)
  // Store.updateUserTask(tasks);
  return tasks;
}

async function FetchTask(userid: string | undefined) {
  // console.log("userid: ", userid);
  const task: TaskData[] = [];
  const categoryArray: typeForCategoriesTags[] = [];
  const tagsArray: typeForCategoriesTags[] = [];
  const statusArray: statusType[] = [];

  try {
    //finding all categories
    const categoriesDocs = await getDocs(collection(db, "Category"));
    categoriesDocs.docs.map((doc) =>
      categoryArray.push({ id: doc.id, ...doc.data() } as typeForCategoriesTags)
    );

    //finding all tags
    const tagsDocs = await getDocs(collection(db, "Tags"));
    tagsDocs.docs.map((doc) =>
      tagsArray.push({ id: doc.id, ...doc.data() } as typeForCategoriesTags)
    );

    // console.log("tagsArray: ", tagsArray);
    // console.log("categoryArray: ", categoryArray);

    //finding status of all tasks of user
    const queryForStatus = query(
      collection(db, "Status"),
      where("userId", "==", userid)
    );
    const statusResult = await getDocs(queryForStatus);

    statusResult.forEach((doc) => {
      statusArray.push({ id: doc.id, ...doc.data() } as statusType);
    });
    // console.log("statusArray: ", statusArray);

    //for tasks
    const queryForFindingTask = query(
      collection(db, "TaskData"),
      where("userId", "==", userid)
    );
    const taskQueryResult = await getDocs(queryForFindingTask);

    taskQueryResult.forEach((doc) => {
      task.push({ id: doc.id, ...doc.data() } as TaskData);
    });
    // console.log("task", task);
    return formatTask(task, categoryArray, tagsArray, statusArray);
  } catch (err) {
    console.log(err);
  }
}

export { FetchTask };
