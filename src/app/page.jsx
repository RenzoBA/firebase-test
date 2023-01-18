"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { logInGithub, logInGoogle, logOut } from "../../firebase/authUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { addTask, updateTask } from "../../firebase/firestoreUser";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Task from "@/components/Task";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const [newTask, setNewTask] = useState({
    owner: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    const getData = () => {
      const unsub = onSnapshot(
        query(
          collection(db, "tasks"),
          where("owner", "==", user ? user.uid : "")
        ),
        (querySnapshot) => {
          const list = [];
          querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setTasks(list);
        }
      );
      return () => {
        unsub();
      };
    };
    getData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.title && !newTask.description) {
      return;
    }
    await addTask(newTask);
    setNewTask({
      owner: "",
      title: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      owner: user.uid,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateTask(newTask);
    setNewTask({
      owner: "",
      title: "",
      description: "",
    });
  };

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user) {
    return (
      <main className="flex flex-col items-center justify-center h-screen text-gray-800">
        <div className="bg-slate-500 w-full mb-5 flex flex-col justify-center items-center text-center py-2 text-white font-semibold">
          <h2>
            <span className="font-light text-base">name:</span>{" "}
            {user.displayName}
          </h2>
          <h3>
            <span className="font-light text-base">email:</span> {user.email}
          </h3>
        </div>
        <p className="font-light uppercase tracking-wider">firebase-test</p>
        <p className=" font-light italic text-sm">Add some tasks...</p>
        <form
          onSubmit={newTask.id ? handleUpdate : handleSubmit}
          className="flex flex-col items-center gap-4 m-4 w-60"
        >
          <input
            type="text"
            placeholder="task title..."
            name="title"
            value={newTask.title}
            onChange={handleChange}
            className="input-form"
          />
          <textarea
            placeholder="description..."
            name="description"
            value={newTask.description}
            onChange={handleChange}
            rows={5}
            className="input-form"
          />
          <button className="py-2 px-4 w-fit bg-lime-500 text-white rounded-full shadow-animate border text-xl">
            {newTask.id ? "Update task" : "Add task"}
          </button>
        </form>
        <button
          onClick={logOut}
          className="py-2 px-4 bg-red-500 text-white rounded-full shadow-animate border text-xl"
        >
          Log Out
        </button>
        <div className="grid grid-cols-3 gap-2 mt-10">
          {tasks?.map((task) => (
            <Task key={task.id} task={task} setNewTask={setNewTask} />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen text-gray-800">
      <p className="font-light uppercase tracking-wider text-sm">
        firebase-test
      </p>
      <h1 className="tracking-widest uppercase font-bold text-5xl mb-10">
        Welc<span className="text-red-500">o</span>me
      </h1>
      <div className="flex flex-col gap-3 text-2xl">
        <button
          onClick={logInGoogle}
          className="login-button inline-flex items-center gap-2"
        >
          <BsGoogle />
          Log In with Google
        </button>
        <button
          onClick={logInGithub}
          className="login-button inline-flex items-center gap-2"
        >
          <BsGithub />
          Log In with GitHub
        </button>
      </div>
    </main>
  );
}
