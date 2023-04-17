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

    //rename list
    const handleEdit = useCallback(() => {
      const title = prompt('Rename the Title');
      //prevent duplicated title
      if(
        lists.find((list) => list.title.toLowerCase() === title.toLowerCase())
      ){
        alert('List Already Exists');
        return;
      }
      //rename list
      if(title)
        setLists((prev) => {
          const newList = prev.map((list) => {
            if(list.title === currentList.title){
              return {...list, title};
            }
            return list;
          });
          //set current list to the renamed list
          setCurrentList((prev) => ({...prev, title}));
          //remove selection
          if (window.getSelection) {
            const selection = window.getSelection();
            selection.removeAllRanges();
          }
          return newList;
        });
    }, [lists, setLists, currentList,setCurrentList]);
  
    return (
      <div className='list-bar'>
        <h1 className='list-bar-title'>
          <img className='list-bar-logo' src = '/todo.svg'></img>
          ToDo
        </h1>
        <AddlistButton 
          handleClick ={handleAdd} 
          handleDoubleClick = {handleEdit}
        />
        <div className='list-container'>
          {lists.map((list) => (
            <div
              key = {list.title}
              className={`list over-hide ${currentList.title === list.title ? 'selected-list' : ''}`}
              onClick={() => setCurrentList(list)}
              onDoubleClick={() => handleEdit(list.title)}
            >
              {list.title}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const AddlistButton = ({handleClick, handleDoubleClick }) => {
    return (
      <div className='add-button' 
        onClick={handleClick} 
        onDoubleClick={handleDoubleClick}
      >
        +
      </div>
    );
  };


  export default ListBar;