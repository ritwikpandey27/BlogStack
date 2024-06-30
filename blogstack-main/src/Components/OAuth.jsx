import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithCredential, signInWithRedirect } from "firebase/auth";
import { useNavigate } from 'react-router';

export default function OAuth() {

  const navigate = useNavigate();

  async function Googleauth() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check for the user

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {
      // 
      console.log(error);
    }
  }

  return (
    <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={Googleauth}>  <FcGoogle className="text-2xl  bg-white rounded-full mr-2" /> Continue with Google</button>
        </div>
  )
}

