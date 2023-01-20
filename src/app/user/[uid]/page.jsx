"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logOut } from "../../../../firebase/authUser";
import { db } from "../../../../firebase/config";
import { addTask, updateTask } from "../../../../firebase/firestoreUser";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { MyContext } from "@/app/context-provider";
import Task from "@/components/Task";

const page = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    owner: "",
    title: "",
    description: "",
  });
  const { currentUser } = useContext(MyContext);

  useEffect(() => {
    const getData = () => {
      const unsub = onSnapshot(
        query(
          collection(db, "tasks"),
          where("owner", "==", currentUser ? currentUser.uid : "")
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
  }, [currentUser]);

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
      owner: currentUser.uid,
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
  const handleLogOut = () => {
    logOut();
    alert("sesion cerrada");
    router.push("/");
  };

  if (currentUser) {
    return (
      <main className="flex flex-col items-center justify-center h-screen text-gray-800">
        <div className="bg-slate-500 w-full mb-5 flex flex-col justify-center items-center text-center py-2 text-white font-semibold">
          <h2>
            <span className="font-light text-base">name:</span>{" "}
            {currentUser.displayName}
          </h2>
          <h3>
            <span className="font-light text-base">email:</span>{" "}
            {currentUser.email}
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
          onClick={handleLogOut}
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
  router.push("/");
};

export default page;
