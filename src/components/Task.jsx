import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const Task = () => {

  const [title, setTitle]  = useState('')
  const [description, setDescription] = useState('')
  const createDate = new Date()

  const postTaskHandler = async ()=>{
      try{
        const postData = {
          title,
          description,
          createDate,
          status: "To Do"
        }
  
        if(!title | !description){
          return Swal.fire("Plz Add Value!");
        }
        
      }
      catch(err){
        return Swal.fire(`${err.message}`);
      }


  } 

  return (
    <div className="min-h-[90vh] flex p-8 justify-center gap-4">
      {/* side1 */}
      <div className="bg-blue-100 p-6 w-3/12 min-h-[80vh]">
        <button
        onClick={() => document.getElementById("my_modal_5").showModal()}
         className="flex mb-10 cursor-pointer justify-between w-full items-center text-xl">
          <span className="font-semibold">Add Task</span>
          <span className="p-3 bg-white rounded-full">
            <FaPlus />
          </span>
        </button>
        <div className="border-b-2 border-gray-300"></div>
        {/* task display */}
        <div className="">

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
            <form className="">
              <input 
              type="text" 
              name="title"
              onChange={(e)=> setTitle(e.target.value)}
              placeholder="Title" 
              className="w-full p-2 mb-4 rounded-md focus:border-blue-800 outline-none border border-gray-400"
               />
              
              <textarea 
              className=" focus:border-blue-800 p-2 rounded-md outline-none border border-gray-400  w-full resize-none" 
              placeholder="Description"
              onChange={(e)=> setDescription(e.target.value)}
              rows={5}
              cols={10}
              ></textarea>
            </form>
            <div className="flex justify-center gap-6">
              <button
              onClick={()=>{
                document.getElementById("my_modal_5").close()
                postTaskHandler()
              }}
               className="bg-blue-800 my-6 cursor-pointer py-2 px-5 rounded-md text-white"
               >Add Task</button>
               <button
               onClick={()=>{
                document.getElementById("my_modal_5").close()
              }}
                className="bg-red-800 my-6 cursor-pointer py-2 px-5 rounded-md text-white">Cancel</button>
            </div>
           </div>
          <div className="modal-action">
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Task;
