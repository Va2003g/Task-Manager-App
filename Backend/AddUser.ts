import {query,collection, addDoc,getDocs,where} from 'firebase/firestore'
import { db } from './Firebase'

export const AddUser = async(data:Object)=>{
    // console.log('data: ', data)
    try{
        let id;
        const queryForFindingUser = query(collection(db, "Users" ),where("email", "==", data.email))
        const checkUser = await getDocs(queryForFindingUser);
       
        if(checkUser.size === 0)
        {
            const response = await addDoc(collection(db, "Users"),data);
            id = response.id;
            // console.log('id in adduser: ', id)
            return id;
        }else{
            id = checkUser.docs[0].id;
        }
        console.log('id in add user: ', id)
        return id;
    }catch(err)
    {
        console.log(err);
    }
}