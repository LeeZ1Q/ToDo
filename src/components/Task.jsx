const Task = ({ name, details, id, handleRemove }) => {
  return (
    <div
      className='task'
    >
      <h2 className='task-name over-hide'>{name}</h2>
      <p className='task-details'>{details}</p>
      <div className='remove-bar' onClick={(e) => handleRemove(id, e)}>
        ×
      </div>
    </div>
  );
};

export default Task;
