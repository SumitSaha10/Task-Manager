import React, { useState } from "react";

import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:6000";
  let initialnotes = []
  const [notes, setNotes] = useState(initialnotes);

  // //Get all notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }
  // //Add a note
  const addNote = async (title, description, tag) => {
    //TODO API CALLS
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag })
    });
    //Logic for adding a note
    console.log("Adding a new note")
    const note = await response.json();
    setNotes([...notes, note]);
    
    getNotes()
    
  }

  // //Delete a note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      
    });
    const json = await response.json();
    console.log(json)

    console.log("Delete button cliked " + id)
    let newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)

  }

  // //Edit a note
  const editNote = async (id, title, description, tag) => {
    //TODO API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json()
    //Logic for editing the note
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
    console.log(json)
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes,addNote, editNote,getNotes,deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;