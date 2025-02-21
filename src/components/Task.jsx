import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../hook/useAxiosPublic";
import useAuth from "../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBinFill } from "react-icons/ri";

const Task = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const createDate = new Date();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const postTaskHandler = async () => {
    try {
      const postData = {
        title,
        description,
        createDate,
        status: "To Do",
        email: user?.email,
      };

      if (!title | !description) {
        return "";
      }

      await axiosPublic.post(`/task?email=${user?.email}`, postData);
      setTitle("");
      setDescription("");
    } catch (err) {
      return Swal.fire(`${err.message}`);
    }
  };

  const { data: taskData, refetch } = useQuery({
    queryKey: ["taskData"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/task/${user?.email}`);
      return data;
    },
  });

  const toDo = taskData?.filter((item) => item.status === "To Do");

  return (
    <div className="min-h-[90vh] flex p-8 justify-center gap-4">
      {/* side1 */}
      <div className="bg-blue-100 p-6 w-3/12 min-h-[80vh]">
        <button
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="flex mb-10 cursor-pointer justify-between w-full items-center text-xl"
        >
          <span className="font-semibold">Add Task</span>
          <span className="p-3 bg-white rounded-full">
            <FaPlus />
          </span>
        </button>
        <div className="border-b-2 mb-6 border-gray-300"></div>
        {/* task display */}
        <div className="grid grid-cols-1 gap-4">
          {toDo?.map((item) => (
            <div
              key={item?._id}
              className="p-4 flex justify-between cursor-move items-center bg-white rounded-md"
            >
              <div className="w-11/12">
                <h1 className="">{item?.title}</h1>
              </div>
              <div className="">
                <button className="w-1/12 cursor-pointer text-red-600 text-xl ">
                  <RiDeleteBinFill />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* side2 */}
      <div className="bg-orange-50 w-6/12 min-h-[80vh]"></div>
      {/* side3 */}
      <div className="bg-green-100 w-3/12 min-h-[80vh]"></div>

      {/* modal post */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="p-6">
            <h1 className="text-xl font-semibold text-center mb-4">Add Task</h1>
            {/* form div */}
            <div className="">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 mb-4 rounded-md focus:border-blue-800 outline-none border border-gray-400"
              />

              <textarea
                className=" focus:border-blue-800 p-2 rounded-md outline-none border border-gray-400  w-full resize-none"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                rows={5}
                cols={10}
              ></textarea>
            </div>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => {
                  document.getElementById("my_modal_5").close();
                  postTaskHandler();
                }}
                className="bg-blue-800 my-6 cursor-pointer py-2 px-5 rounded-md text-white"
              >
                Add Task
              </button>
              <button
                onClick={() => {
                  document.getElementById("my_modal_5").close();
                }}
                className="bg-red-800 my-6 cursor-pointer py-2 px-5 rounded-md text-white"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="modal-action"></div>
        </div>
      </dialog>
    </div>
  );
};

export default Task;
