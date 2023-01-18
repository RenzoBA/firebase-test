import {
  addDoc,
  getDocs,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";

export const addTask = async (newTask) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), newTask);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: " + error);
  }
};

export const getTasks = async () => {
  try {
    const tasks = [];
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => tasks.push({ id: doc.id, ...doc.data() }));
    return tasks;
  } catch (error) {
    console.error("ERROR: " + error);
  }
};

export const deleteTask = async (id) => {
  await deleteDoc(doc(db, "tasks", id));
};

export const updateTask = async (task) => {
  await updateDoc(doc(db, "tasks", task.id), {
    title: task.title,
    description: task.description,
  });
};
