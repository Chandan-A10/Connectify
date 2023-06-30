import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebase"

export const loginUser = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        console.log('Welcome ', user.user.displayName)
        return user
    }
    catch (err) {
        console.log(err)
    }
}