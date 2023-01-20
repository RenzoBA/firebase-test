import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "./config";

const provider = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider(),
};

export const logInGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider.google);
    const credential = GoogleAuthProvider.credentialFromResult(res);
    const token = credential.accessToken;
    const user = res.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  }
};

export const logInGithub = async () => {
  try {
    const res = await signInWithPopup(auth, provider.github);
    const credential = GithubAuthProvider.credentialFromResult(res);
    const token = credential.accessToken;
    const user = res.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GithubAuthProvider.credentialFromError(error);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error("ERROR: " + error);
  }
};
