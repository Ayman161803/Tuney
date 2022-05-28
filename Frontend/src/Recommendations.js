import React, { useState, useEffect } from 'react';
import RecommendedSong from './components/RecommendedSong';
import './App.css';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import { Button, Spinner } from 'react-bootstrap';

import 'react-toastify/dist/ReactToastify.css';

 function YourSongs() {

    useEffect(()=>{
        if(!Recommended && JSON.parse(localStorage.getItem("songs"))["data"].length>0){
            refreshRecommendations()
        }
    },[])
   


  const updateLocalStorage = (newData) => {
    localStorage.setItem("recommendations",JSON.stringify({data:newData}));
  }

  const refreshRecommendations = async (e)=> {
    const startingData = JSON.parse(localStorage.getItem("songs"))["data"]

    const {data} = await axios.post(
        'https://tuney-rest.herokuapp.com/prediction',
        {
          song_list: startingData
        }
      );
  
      updateLocalStorage(data.data);

      setRecommended(data.data)

  }
  


  
  const [Recommended, setRecommended] = useState(null);

  const handleComplete = (index) => {
    const newTasks = [...Recommended]
    if (newTasks[index].completed === false) {
      newTasks[index].completed = true
    } else {
      newTasks[index].completed = false
    }
    setRecommended(newTasks)
    updateLocalStorage(newTasks)
  }

  const handleRemove = (index) => {
    const newTasks = [...Recommended]
    newTasks.splice(index, 1)
    setRecommended(newTasks)
    updateLocalStorage(newTasks)
  }

  const handleRemoveAll = () => {
    setRecommended([])
    updateLocalStorage([])
  }


  if( JSON.parse(localStorage.getItem("songs"))["data"].length==0 ){
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
<Spinner
as="span"
animation="grow"
size="sm"
role="danger"
aria-hidden="true"
/>
No songs to in your list to give recommendations for...
</Button>
</div>
     </>
}

  return (
    <div className="App">
      <RecommendedSong tasks={Recommended} handleComplete={handleComplete} handleRemove={handleRemove} handleRemoveAll={handleRemoveAll} />
      <ToastContainer />
    </div>
  );
}

export default YourSongs;