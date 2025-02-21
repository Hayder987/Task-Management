

import PropTypes from 'prop-types';
import { useDroppable } from "@dnd-kit/core";

const TaskColumn = ({ id, title, color, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={`${color} p-6 min-h-[80vh]`}>
      <h2 className={`text-${color}-800 font-semibold text-xl mb-6`}>
        {title}
      </h2>
      <div className="border-b-2 mb-6 border-gray-300"></div>
      <div className="grid grid-cols-1 gap-4">{children}</div>
    </div>
  );
};

TaskColumn.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default TaskColumn;

