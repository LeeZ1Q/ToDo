import React, { useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';


const TaskBox = ({ lists, setLists, currentList, setCurrentList}) => {
    const handleRemove = useCallback(() => {
        if (confirm('You really want to remove it?')) {
          // update lists
          setLists((prev) => {
            const result = prev.filter((item) => item.title != currentList.title);
            // if lsit is empty
            if (!result.length) {
              // init the lsit
              const initList = [
                {
                  title: '\u{1F31E} Today',
                  ['To Do']: [],
                  ['In Progress']: [],
                  ['Done']: [],
                },
              ];
              setLists(initList);
            } else {
              // set the first event as current
              setCurrentList(result[0]);
            }
            return result;
          });
        }
      }, [lists, setLists, currentList, setCurrentList]);
    
     const handleDragEnd = useCallback((result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        const curList = lists.find((item) => item.title === currentList.title);
        const taskCopy = curList[source.droppableId][source.index];
        setLists((prev) => 
            prev.map((list) => {
                if (list.title === currentList.title) {
                    let listCopy = { ...list };
                    const taskListSource = listCopy[source.droppableId];
                    taskListSource.splice(source.index, 1);
                    listCopy = { ...list, [source.droppableId]: taskListSource };
                        const taskListDestination = listCopy[destination.droppableId];
                    taskListDestination.splice(destination.index, 0, taskCopy);
                    listCopy = { ...list, [destination.droppableId]: taskListDestination };
                    return listCopy;
                } else{ 
                    return list;
                }
            })
        );
     }, [lists, setLists, currentList]); 

    return (
        <div className='task-box'>
          <header className='task-box-header'>
            <h1 className='task-box-title'>All Tasks</h1>
            <button className='remove-button' onClick={handleRemove}>
            {'\u{1F5D1} Remove this List'}
            </button>
          </header>
          <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
            <div className='task-box-body'>
            {
                ['To Do', 'In Progress', 'Done'].map(tag => (
                <Column
                    key={tag}
                    tag={tag}
                    lists={lists}
                    setLists={setLists}
                    currentList={currentList}
                />
                ))
            }
            </div>
          </DragDropContext>
        </div>
      );

};

export default TaskBox;