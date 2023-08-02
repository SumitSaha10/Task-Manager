import React,{useContext} from 'react'
import Notes from './Notes'
import noteContext from '../context/notes/noteContext';
const Home = (props) => {
  const context = useContext(noteContext);
  const {notes,setNotes} = context;
  return (
<>
    
    <Notes values={{notes,setNotes}} showAlert={props.showAlert}/>
    </>
  )
}

export default Home
