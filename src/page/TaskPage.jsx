import Navbar from "../components/Navbar"
import Task from "../components/Task"


const TaskPage = () => {
  return (
    <div className="bg-slate-100 min-h-[100vh]">
        <div className="container mx-auto">
         <Navbar></Navbar>
         <Task></Task>
        </div>
    </div>
  )
}

export default TaskPage