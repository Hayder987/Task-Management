import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../hook/useAxiosPublic";
import useAuth from "../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBinFill } from "react-icons/ri";
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { FaArrowsTurnToDots } from "react-icons/fa6";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { format } from "date-fns";

const Task = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const createDate = new Date().toISOString();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  // Fetch Tasks
  const { data: taskData, refetch } = useQuery({
    queryKey: ["taskData"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/task/${user?.email}`);
      return data;
    },
  });

  // Categorize tasks
  const toDo = taskData?.filter((item) => item.status === "To Do");
  const inProgress = taskData?.filter((item) => item.status === "In Progress");
  const done = taskData?.filter((item) => item.status === "Done");

  // Post New Task
  const postTaskHandler = async () => {
    if (!title || !description) {
      return Swal.fire("Please enter title and description");
    }

    try {
      const postData = {
        title,
        description,
        createDate,
        status: "To Do",
        email: user?.email,
      };
      await axiosPublic.post(`/task?email=${user?.email}`, postData);
      setTitle("");
      setDescription("");
      refetch();
      document.getElementById("task_modal").close();
    } catch (err) {
      Swal.fire(`${err.message}`);
    }
  };

  // Handle Drag End
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggedTask = taskData.find((task) => task._id === active.id);
    if (!draggedTask) return;

    const newStatus =
      over.id === "to-do"
        ? "To Do"
        : over.id === "in-progress"
        ? "In Progress"
        : "Done";

    if (draggedTask.status !== newStatus) {
      try {
        await axiosPublic.patch(`/task/${draggedTask._id}`, {
          status: newStatus,
        });
        refetch();
      } catch (err) {
        Swal.fire(`${err.message}`);
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="min-h-[90vh] flex p-8 justify-center gap-4">
        <TaskColumn id="to-do" title="To Do" color="blue">
          {toDo?.map((item) => (
            <TaskCard key={item._id} item={item} />
          ))}
        </TaskColumn>
        <TaskColumn id="in-progress" title="In Progress" color="orange">
          {inProgress?.map((item) => (
            <TaskCard key={item._id} item={item} />
          ))}
        </TaskColumn>
        <TaskColumn id="done" title="Done" color="green">
          {done?.map((item) => (
            <TaskCard key={item._id} item={item} />
          ))}
        </TaskColumn>

        {/* Add Task Button */}
        <button
          onClick={() => document.getElementById("task_modal").showModal()}
          className="fixed bottom-10 right-10 bg-green-600 text-white py-2 px-4 rounded-md shadow-lg"
        >
          + Add Task
        </button>

        {/* Modal for adding task */}
        <dialog id="task_modal" className="modal">
          <div className="modal-box">
            <h1 className="text-xl font-semibold text-center mb-4">Add Task</h1>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-2 mb-4 border border-gray-400 rounded-md"
            />
            <textarea
              className="w-full p-2 border border-gray-400 rounded-md"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            ></textarea>
            <div className="flex justify-center gap-6 mt-4">
              <button
                onClick={postTaskHandler}
                className="bg-blue-800 text-white py-2 px-5 rounded-md"
              >
                Add Task
              </button>
              <button
                onClick={() => document.getElementById("task_modal").close()}
                className="bg-red-800 text-white py-2 px-5 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </DndContext>
  );
};

// Task Column Component
const TaskColumn = ({ id, title, color, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={`bg-${color}-100 p-6 w-4/12 min-h-[80vh]`}>
      <h2 className={`text-${color}-800 font-semibold text-xl mb-6`}>
        {title}
      </h2>
      <div className="border-b-2 mb-6 border-gray-300"></div>
      <div className="grid grid-cols-1 gap-4">{children}</div>
    </div>
  );
};

// Task Card Component
const TaskCard = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item._id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-4 flex justify-between items-center bg-white rounded-md shadow-md cursor-move"
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : "none",
      }}
    >
      <div className="w-11/12 pr-4">
        <h1 className="font-bold">{item.title}</h1>
        <p className="text-gray-600 text-sm">{item?.description}</p>
        <div className="flex mt-3 justify-between items-center">
          <p
            className={`
        ${item?.status === "To Do" && "text-blue-800"}
         ${item?.status === "In Progress" && "text-orange-800"}
          ${item?.status === "Done" && "text-green-800"}
          font-semibold
        `}
          >
            {item?.status}
          </p>
          <p className="">
            {item?.createDate
              ? format(new Date(item?.createDate), "d MMM yyyy")
              : ""}
          </p>
        </div>
      </div>
      <div className="w-1/12 flex flex-col justify-between gap-6">
        <button
          className={`
               ${item?.status === "To Do" && "text-blue-800"}
               ${item?.status === "In Progress" && "text-orange-800"}
               ${item?.status === "Done" && "text-green-800"}
               cursor-pointe text-xl
        `}
        >
          {item?.status === "To Do" && (
            <span>
              <FaArrowsTurnToDots />
            </span>
          )}
          {item?.status === "In Progress" && (
            <span className="">
              <GrInProgress />
            </span>
          )}
          {item?.status === "Done" && (
            <span>
              <IoMdDoneAll />
            </span>
          )}
        </button>
        <button className=" cursor-pointer text-red-600 text-xl">
          <RiDeleteBinFill />
        </button>
      </div>
    </div>
  );
};

export default Task;
