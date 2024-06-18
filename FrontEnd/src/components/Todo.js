import React from 'react';

export default function Todo({ text, completed, toggleComplete, remove, update }) {
  return (
    <div className={`todo ${completed ? 'completed' : ''}`}>
      <div className='text' onClick={toggleComplete}>
        <input type="checkbox" checked={completed} onChange={toggleComplete} />
        <span>{text}</span>
      </div>
      <div className='icons'>
        <i className="ri-edit-line" id="update" onClick={update}></i>
        <i className="ri-delete-bin-5-line" id='delete' onClick={remove}></i>
      </div>
    </div>
  );
}
