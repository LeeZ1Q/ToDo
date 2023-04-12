import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'react-uuid';

const Column = ({ tag, lists, setLists, currentList  }) => {
  const handleAdd = () => {
    const name = prompt('Enter the task name:');
    const details = prompt('Enter details:');
    if (!(name && details)) return;
    setLists((prev) => {
      const arrCopy = [...prev];
      const index = prev.findIndex(
        (list) => list.title === currentList.title
      );
      const listCopy = arrCopy[index];
      // Remove old and add the latest data
      arrCopy.splice(index, 1, {
        ...listCopy,
        [tag]: [
          ...listCopy[tag],
          { name: name, id: uuid(), details: details },
        ],
      });
      return arrCopy;
    });
  };
  const handleRemove = (id, e) => {
    // 禁止冒泡到上层:修改task
    e.stopPropagation();
    setLists((prev) =>
      prev.map((list) => {
        if (list.title === currentList.title) {
          const taskList = list[tag];
          const index = taskList.findIndex((item) => item.id === id);
          taskList.splice(index, 1);
          return { ...list, [tag]: [...taskList] };
        } else {
          return list;
        }
      })
    );
  };

  return (
    <div className='column'>
      {tag}
      <AddTaskButton handleClick={handleAdd} />
            <div
              className='task-container'
            >
            {lists
              .find((list) => list.title === currentList.title)
              ?.[tag].map((task, index) => (
                <Task
                  key={task.id}
                  name = {task.name}
                  details = {task.details}
                  id = {task.id}
                  handleRemove={handleRemove}
                />
              ))}
            </div>
    </div>
  );
};

const AddTaskButton = ({ handleClick }) => {
  return (
    <div className='add-task-button' onClick={handleClick}>
      +
    </div>
  );
};


export default Column;
