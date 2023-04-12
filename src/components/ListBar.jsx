import React, {useCallback} from 'react';

const ListBar = ({ lists, setLists, currentList, setCurrentList}) => {
    const handleAdd = useCallback(() => {
      const title = prompt('Enter the Title');
      //prevent duplicated title
      if(
        lists.find((list) => list.title.toLowerCase() === title.toLowerCase())
      ){
        alert('List Already Exists');
        return;
      }
      //add new list
      if(title)
        setLists((prev) => [
          ...prev, 
          {
            title, 
            ['To Do']: [],
            ['In Progress']: [],
            ['Done']: [],
          },
        ]);
    }, [lists, setLists]);
  
    return (
      <div className='list-bar'>
        <h1 className='list-bar-title'>
          <img className='list-bar-logo' src = '/todo.svg'></img>
          ToDo
        </h1>
        <AddlistButton handleClick ={handleAdd} />
        <div className='list-container'>
          {lists.map((list) => (
            <div
              key = {list.title}
              className={`list over-hide ${currentList.title === list.title ? 'selected-list' : ''
                }`}
              onClick={() => setCurrentList(list)}
            >
              {list.title}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const AddlistButton = ({handleClick}) => {
    return (
      <div className='add-button' onClick={handleClick}>
        +
      </div>
    );
  };


  export default ListBar;