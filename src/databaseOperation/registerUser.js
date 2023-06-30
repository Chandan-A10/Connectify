import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { addUserToCollection } from "./addUserToCollection"

export const registerUser = async (email, password, name) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password)
        updateProfile(user.user, { displayName: name }).then(() => {
            console.log('Successfully Created a new User')
            addUserToCollection(user.user.uid, user.user.email, user.user.displayName)
        }).catch(err => console.log(err))
        return user
    }
    catch (error) {
        alert(error)
    }
}

export const GoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try{
        const user = await signInWithPopup(auth, provider)
        addUserToCollection(user.user.uid, user.user.email, user.user.displayName)
        return user
    }
    catch(err){
        alert(err)
    }
}