import React from 'react';
import { Spinner } from 'react-bootstrap';

const Todo = (props) => {

    const { tasks, handleComplete, handleRemove, handleRemoveAll,getRecommendations } = props

    return (
        <>
        <ul className='todo'>
            {tasks
                .map((task, index) =>
                    <li key={index}>
                        <div className='checkAndTask'>
                            <span>{task.name}  <span className='artist'>{task.year}</span></span>
                        </div>
                        <button onClick={() => handleRemove(index)}><i className="fa-solid fa-trash-can"></i></button>
                    </li>
                )}
            {tasks.length > 1 && <p><button className='deleteAll' onClick={() => handleRemoveAll()}><i className="fa-solid fa-eraser"></i>Delete all</button></p>}
            {tasks.length > 0 && <p><button className='deleteAll recommend' onClick={() => getRecommendations()}><i className="fa-solid fa-music"></i>Recommend</button></p>}
        </ul>
        </>
    );
}

export default Todo;
