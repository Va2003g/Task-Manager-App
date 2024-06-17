import {query,collection, addDoc,getDocs,getDoc,where} from 'firebase/firestore'
import { db,auth } from './Firebase'
import { TaskData } from './TaskData';
export const AddTask = async(dataArray:TaskData)=>{
    try{
        const user = auth.currentUser;
        const queryForFindingUser = query(collection(db, "UserData" ),where("email", "==", user?.email));
        const queryResultForFindingUser = await getDocs(queryForFindingUser);
        let userId = queryResultForFindingUser.docs[0].id;
        queryResultForFindingUser.forEach((doc)=>{
            userId = doc.id;
        })
        dataArray.userId = userId;
        dataArray.status = 'pending';
        const response = await addDoc(collection(db, `Tasks`), dataArray);
        const storedDoc = await getDoc(response);

        if (storedDoc.exists()) {
            return { id: storedDoc.id, ...storedDoc.data() };
        }
    }catch(err)
    {
        console.log(err);
    }
}