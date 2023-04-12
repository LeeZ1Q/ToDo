const Task = ({ name, details, id, handleRemove, handleEdit }) => {
  return (
    <div
      className='task'
      onClick={() => handleEdit(id)}
    >
      <h2 className='task-name over-hide'>{name}</h2>
      <p className='task-details'>{details}</p>
      <div className='remove-bar' onClick={(e) => handleRemove(id, e)}>
        {'\u{2716}' }
      </div>
    </div>
  );
};

export default Task;
