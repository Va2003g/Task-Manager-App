import {query,collection, addDoc,getDocs,where} from 'firebase/firestore'
import { db } from './Firebase'

export const AddUser = async(data,navigate)=>{
    try{
        let id;
        const queryForFindingUser = query(collection(db, "UserData" ),where("email", "==", data.email))
        const checkUser = await getDocs(queryForFindingUser);
        id = checkUser.docs[0].id;
        if(checkUser.size === 0)
        {
            const response = await addDoc(collection(db, "UserData"), {
                firstName: data.firstName,
                lastName:data.lastName,
                email:data.email,
                photo:data.photoUrl,
            });
            id = response.id;
            return id;
        }
        return id;
    }catch(err)
    {
        console.log(err);
    }
}