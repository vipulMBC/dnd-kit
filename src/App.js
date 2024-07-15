import { useState } from "react";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Column } from "./components/Column/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import "./App.css";
import { Input } from "./components/Input/Input";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add tests to homepage" },
    { id: 2, title: "Fix styling in about section" },
    { id: 3, title: "Learn how to center a div" },
  ]);

  // const addTask = (title) => {
  //   setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
  // };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const addTask = (title) => {
    setTasks([...tasks, { id: tasks.length + 1, title }]);
  };

  return (
    <div className="App">
      <h1>My Tasks ✅</h1>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <Input addTask={addTask} />
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}
