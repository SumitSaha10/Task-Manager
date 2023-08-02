import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context
  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  const addNoteFunc = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
    props.showAlert("Note added Successfully", "success")
  }
  const handleClick = (e) => {

    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <h1>Add a Task</h1>
      <div className='container my-4'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={handleClick} required />

        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={handleClick} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={handleClick} />
        </div>
        <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={addNoteFunc}>Submit</button>
      </div>
    </>
  )
}

export default AddNote
