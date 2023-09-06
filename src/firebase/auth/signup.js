import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);


export default async function signUp(email, password) {
    let result = null,
        error = null;
        console.log("email",email, "password :",password)
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        console.log("error",e)
        error = e;
    }

    return { result, error };
}