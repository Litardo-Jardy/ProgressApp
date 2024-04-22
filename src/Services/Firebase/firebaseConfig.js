import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { v1 as uuidv1 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyANExeEs_TUdIWYzmwUClRHsYsdELAKofU",
  authDomain: "react-firebase-imgs.firebaseapp.com",
  projectId: "react-firebase-imgs",
  storageBucket: "react-firebase-imgs.appspot.com",
  messagingSenderId: "576579374883",
  appId: "1:576579374883:web:86feeec6cd14ad566dc696",
  measurementId: "G-XQW407NDJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

/**
 * @param {image} file 
 * @returns {Promise<string>}
 */
export const uploadImg = async (file) => {
    const storageRef = ref(storage, uuidv1());
    await uploadBytes(storageRef, file);
    const result = await getDownloadURL(storageRef);
    return result}