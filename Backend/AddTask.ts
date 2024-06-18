import {
  query,
  collection,
  addDoc,
  getDocs,
  getDoc,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "./Firebase";
import { TaskData } from "./TaskData";
//call addtask function
/**
 * in add task firstly save all tags with userid and name in firebase
 * same for category
 * same for status
 * store all these 3 ids (or more if tags are multiple)
 * then store task data with TaskName,UserId,CategoryId,TagsId,DueDate,StatusId in firebase
 */
const AddTags = async (tagsArray: string[], userid: string) => {
  const tagsId: string[] = [];
  try {
    tagsArray.forEach(async (tagName) => {
      const response = await addDoc(collection(db, `Tags`), {
        name: tagName,
        userId: userid,
      });
      const storedDoc = await getDoc(response);

      if (storedDoc.exists()) {
        tagsId.push(storedDoc.id);
      }
    });
    return tagsId;
  } catch (err) {
    console.log("err in tags", err);
  }
};
export const AddTask = async (data: TaskData, userid: string) => {
  try {
    //adding Tags to firebase
    AddTags(data.tags, userid)
      .then((res) => {
        if (res !== undefined) data.tags = res;
      })
      .catch((err) => console.log(err));

    //Adding category to firebase
    let response = await addDoc(collection(db, `Category`), {
        name:data.category,
        userId:userid,
    });
    let storedDoc = await getDoc(response);

    if (storedDoc.exists()) {
      data.category = storedDoc.id;
    }

    //Storing Status in Firebase.
    response = await addDoc(collection(db,'Status'),{
        Pending:true,
        Completed:false,
        userId:userid,
    })

    storedDoc = await getDoc(response);
    if(storedDoc.exists()) data.status = storedDoc.id;

    //Storing Taks in Firebase 
    response = await addDoc(collection(db,'TaskData'),data);
    storedDoc = await getDoc(response);
    if(storedDoc.exists())
    {
        await setDoc(doc(db, 'TaskData', storedDoc.id), { id: storedDoc.id }, { merge: true });
    }
    return true;

  } catch (err) {
    console.log(err);
  }
};
