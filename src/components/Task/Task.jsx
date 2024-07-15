import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./task.css";

export const Task = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      // {...listeners}
      className="task"
    >
      <img
        alt="drag"
        className="drag"
        width="10%"
        src="icons/drag-and-drop.jpg"
        {...listeners}
      />
      <input type="checkbox" className="checkbox" />
      {title}
    </div>
  );
};
