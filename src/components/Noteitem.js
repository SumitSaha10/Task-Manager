import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, editNote } = context;
  const { note, updateNote } = props;
  const handleClick = (e) => {
    e.preventDefault();
    note.status = "Completed"
    editNote(note._id, note.title, note.description, note.status)

    props.showAlert("Note updated Successfully", "success")
  }
  return (
    <div className='col-md-3'>
      <div className="card my-4">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash" onClick={() => { deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success") }}></i>
          <i className="fa-solid fa-pen-to-square mx-4" onClick={() => { updateNote(note) }}></i>
          <button type="button" className={`btn ${note.status === "Incompleted" ? "btn-danger" : "btn-success"}`} onClick={handleClick}>{note.status}</button>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
