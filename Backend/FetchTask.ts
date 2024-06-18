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
 *
 */

interface typeForCategoriesTags {
  name: string;
  id: string;
  userId: string;
}

async function formatTask(
  document: QueryDocumentSnapshot<DocumentData, DocumentData>
) {
  let task: TaskData = document.data() as TaskData;
  //achieving status document based on status id
  const docRef = doc(db, "Status", document.get("status"));
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    if (docSnap.get('Pending') === true) {
      task.status = 'pending';
    } else if (docSnap.get('Completed') === true) {
      task.status = 'completed';
    } else {
      task.status = 'unknown';
    }
  }
  console.log('task in format function',task)
  return task;
}

async function FetchTask(userid: string|undefined) {
  console.log('userid: ', userid)
  const task: TaskData[] = [];
  const categoryArray: typeForCategoriesTags[] = [];
  const tagsArray: typeForCategoriesTags[] = [];

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

    console.log("tagsArray: ", tagsArray);
    console.log("categoryArray: ", categoryArray);

    const queryForFindingTask = query(
      collection(db, "TaskData"),
      where("userId", "==", userid)
    );
    const taskQueryResult = await getDocs(queryForFindingTask);

    taskQueryResult.forEach(async (doc) => {
      task.push(await formatTask(doc))
    //     .then((t) => {task.push(t);console.log('task',task);})
    //     .catch((err) => console.log("err while formating task", err));
    });
    console.log('task',task)
  } catch (err) {
    console.log(err);
  }
}

export { FetchTask };
