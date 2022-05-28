import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Todo from './components/Todo';
import './App.css';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';


function YourSongs() {
  const navigate = useNavigate();
  var startingData = [];
  const [Loading,setLoading] = useState(false);

  if(localStorage.getItem("songs")){
    startingData = JSON.parse(localStorage.getItem("songs"))["data"]
  }

  const [tasks, setTasks] = useState(startingData);

  const [SongInput, setSongInput] = useState('');
  const [YearInput, setYearInput] = useState('');

  const handleSongChange = (e) => {
    setSongInput(e.target.value)
  }
  
  const getRecommendations = async (e)=> {
    navigate("/recommendations")
  }

  const handleYearChange = (e) => {
    setYearInput(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const {data} = await axios.post(
      'http://127.0.0.1:6001/validate',
      {
        name:SongInput,
        year:YearInput
      }
    );
    setLoading(false)

    if (SongInput !== '' && data.isvalid) {
      const date = new Date().toLocaleDateString()
      const newTask = {
        date: date,
        name: SongInput,
        completed: false,
        year: parseInt(YearInput)
      }

      setTasks([...tasks, newTask])
      setYearInput('')
      setSongInput('')
      updateLocalStorage([...tasks,newTask]);
    }
    else{
      toast.error("No such song found :(")
      console.log("sjchv");
    }
  }

  const updateLocalStorage = (newData) => {
    localStorage.setItem("songs",JSON.stringify({data:newData}));
  }

  const handleComplete = (index) => {
    const newTasks = [...tasks]
    if (newTasks[index].completed === false) {
      newTasks[index].completed = true
    } else {
      newTasks[index].completed = false
    }
    setTasks(newTasks)
    updateLocalStorage(newTasks)
  }

  const handleRemove = (index) => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
    updateLocalStorage(newTasks)
  }

  const handleRemoveAll = () => {
    setTasks([])
    updateLocalStorage([])
  }

  return (
    <div className="App">

        

        {Loading?
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
      :(<><Form SongInput={SongInput} YearInput={YearInput} handleSongChange={handleSongChange} handleYearChange={handleYearChange} handleSubmit={handleSubmit} />
      <Todo getRecommendations={getRecommendations} tasks={tasks} handleComplete={handleComplete} handleRemove={handleRemove} handleRemoveAll={handleRemoveAll} /></>)}
      <ToastContainer />
    </div>
  );
}

export default YourSongs;