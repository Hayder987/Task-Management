import PropTypes from "prop-types";
import { FaArrowsTurnToDots } from "react-icons/fa6";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { RiDeleteBinFill } from "react-icons/ri";
import { useDraggable } from "@dnd-kit/core";
import { format } from "date-fns";

const TaskCard = ({ item, deleteHandler }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item._id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-4 flex justify-between items-center bg-white rounded-md shadow-md "
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : "none",
      }}
    >
      <div className="w-11/12 pr-4 cursor-move">
        <h1 className="font-bold">{item.title}</h1>
        <p className="text-gray-600 text-sm">{item?.description}</p>
        <div className="flex mt-3 justify-between items-center">
          <p
            className={`${item?.status === "To Do" && "text-blue-800"} ${
              item?.status === "In Progress" && "text-orange-800"
            } ${item?.status === "Done" && "text-green-800"} font-semibold`}
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
          className={`${item?.status === "To Do" && "text-blue-800"} ${
            item?.status === "In Progress" && "text-orange-800"
          } ${item?.status === "Done" && "text-green-800"} text-xl`}
        >
          {item?.status === "To Do" && <FaArrowsTurnToDots />}
          {item?.status === "In Progress" && <GrInProgress />}
          {item?.status === "Done" && <IoMdDoneAll />}
        </button>
        <button
           onMouseUp={() => deleteHandler(item?._id)}
          style={{ pointerEvents: "auto" }}
          className=" cursor-pointer text-red-600 text-xl"
        >
          <RiDeleteBinFill />
        </button>
      </div>
    </div>
  );
};

// PropTypes for TaskCard
TaskCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string.isRequired,
    createDate: PropTypes.string,
  }).isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default TaskCard;
