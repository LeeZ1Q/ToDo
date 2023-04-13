const Task = ({ name, details, id, handleRemove, handleEdit, provided }) => {
  return (
    <div
      className='task'
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => handleEdit(id)}
    >
      <h2 className='task-name over-hide'>{name}</h2>
      <p className='task-details'>
        {details.length? details : 'No Details'}
      </p>
      <div className='remove-bar' onClick={(e) => handleRemove(id, e)}>
        {'\u{2716}' }
      </div>
    </div>
  );
};

export default Task;
