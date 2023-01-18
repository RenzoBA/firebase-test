import { deleteTask, updateTask } from "../../firebase/firestoreUser";
import { BsPencil, BsTrash } from "react-icons/bs";

const Task = ({ task: { title, description, owner, id }, setNewTask }) => {
  const handleDelete = async () => {
    await deleteTask(id);
  };

  const prevHandleUpdate = () => {
    setNewTask({
      id: id,
      owner: owner,
      title: title,
      description: description,
    });
  };

  return (
    <div className="bg-slate-100 border-2 shadow px-4 py-2">
      <h2 className="font-medium text-lg">{title}</h2>
      <p className="font-light text-gray-500">{description}</p>
      <div className="flex justify-between my-2">
        <button onClick={prevHandleUpdate}>
          <BsPencil />
        </button>
        <button onClick={handleDelete}>
          <BsTrash />
        </button>
      </div>
    </div>
  );
};

export default Task;
