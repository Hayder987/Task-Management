

import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../hook/useAxiosPublic";
import useAuth from "../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import { DndContext, closestCenter } from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

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

  const deleteHandler = async (id) => {
    try {
      const result = Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
    
        const response = await axiosPublic.delete(`/task/${id}`);
        
        if (response.status === 200) {
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
          refetch(); 
        } else {
          Swal.fire("Error", "Failed to delete the task.", "error");
        }
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      Swal.fire("Error", `Error deleting task: ${err.message}`, "error");
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="min-h-[90vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 justify-center gap-6">
        <TaskColumn id="to-do" title="To Do" color="blue">
          {toDo?.map((item) => (
            <TaskCard key={item._id} item={item} deleteHandler={deleteHandler} />
          ))}
        </TaskColumn>
        <TaskColumn id="in-progress" title="In Progress" color="orange">
          {inProgress?.map((item) => (
            <TaskCard key={item._id} item={item} deleteHandler={deleteHandler} />
          ))}
        </TaskColumn>
        <TaskColumn id="done" title="Done" color="green">
          {done?.map((item) => (
            <TaskCard key={item._id} item={item} deleteHandler={deleteHandler} />
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
        <TaskModal
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          postTaskHandler={postTaskHandler}
        />
      </div>
    </DndContext>
  );
};

export default Task;
