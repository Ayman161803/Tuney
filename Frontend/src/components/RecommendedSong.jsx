import React from 'react';
import { Button, Spinner } from 'react-bootstrap';


const RecommendedSong = (props) => {

    const {  tasks, handleComplete, handleRemove, handleRemoveAll } = props

    

    const getFirstArtistFromList= (str)=> {
        try{
            return JSON.parse(str.artists.replace("\"","").replace(/'/g, '"'))[0]+", "+str.year
        }
        catch(e){
            console.log(str.year)
            return str.year
        }
        
    }

    if(!tasks){
        return <>
        <div className='Spinner-container'>
         <Button variant="dark" disabled>
    <Spinner
    as="span"
    animation="grow"
    size="sm"
    role="danger"
    aria-hidden="true"
    />
    Loading
    </Button>
    </div>
         </>
    }

    return (
        <>
        <h5 className='text-center your-recommendations-title'><i className="fa-solid fa-music"></i> Recommendations</h5>
        <ul className='todo'>
            { tasks && tasks
                .map((task, index) =>
                    <li key={index}>
                        <div className='checkAndTask'>
                            <label className='checkContainer'>
                                <input type="checkbox" onClick={() => handleComplete(index)} />
                                <span className="checkmark"></span>
                            </label>
                            <a target="_blank" href={"https://www.youtube.com/results?search_query="+encodeURIComponent(task.name+" "+"By "+getFirstArtistFromList(task)+" "+task.year)}><span>{task.name}  <span className='artist'>{getFirstArtistFromList(task)}</span></span></a>
                        </div>
                        <button onClick={() => handleRemove(index)}><i className="fa-solid fa-trash-can"></i></button>
                    </li>
                )}
            {tasks && tasks.length > 1 && <p><button className='deleteAll' onClick={() => handleRemoveAll()}><i className="fa-solid red fa-eraser"></i>Delete all</button></p>}
        </ul>
        </>
    );
}

export default RecommendedSong;