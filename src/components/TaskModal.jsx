import PropTypes from 'prop-types';

const TaskModal = ({ title, description, setTitle, setDescription, postTaskHandler }) => {
  return (
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
  );
};

// PropTypes for TaskModal
TaskModal.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  postTaskHandler: PropTypes.func.isRequired,
};

export default TaskModal;
