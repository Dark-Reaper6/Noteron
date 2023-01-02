import React, { useState } from 'react'
import '../../styles/comps.css'

export default function Addnote(props) {
    const initialNoteObj = { "title": "", "tag": "", "description": "", "date": "" }
    const [note, setNote] = useState(initialNoteObj)
    const [toolpitTitle, setToolpitTitle] = useState("")
    const [toolpitDesc, setToolpitDesc] = useState("")

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
        setToolpitTitle("")
        setToolpitDesc("")
    }

    const createNote = () => {
        // kind of... validation
        if (!note.title) return setToolpitTitle("link")
        if (!note.description) return setToolpitDesc("link")
        // running the "NotesState" function from props to concatinate the note in main array
        props.addNote(note)
        console.log("your note has been saved")
    }

    // function to clear the note form
    const clearNote = () => {
        setNote(initialNoteObj)
    }

    return (
        <>
            <div className='mt-4'>
            <h2 className='text-light text-center'>{props.title}</h2>
                {/* <span className="badge text-bg-dark position-absolute tag-span"><input className='tag text-light' name='tag' value={note.tag} onChange={onchange} type="text" size="10" maxLength={30} placeholder='Enter a tag' /></span> */}
                <span className='tag'><i className="fas fa-tag fs-5 mx-2"></i><input className='text-light' name='tag'value={note.tag} onChange={onchange} type="text" size="10" maxLength={30} placeholder='Enter a tag' /></span>
                <div aria-required data-tooltip="Title is required to create a note!" id="title" className={`${toolpitTitle} position-relative mb-4`}>
                    <h3 className='text-light'><label htmlFor="exampleFormControlInput1">Title</label></h3>
                    <input type="text" className="input-field text-light title w-100" id="exampleFormControlInput1" name='title' value={note.title} onChange={onchange} rows="3" placeholder="Enter a title" ></input>
                </div>
                <div data-tooltip="Description is required to create a note!" id="description" className={`${toolpitDesc} position-relative mb-3`}>
                    <h3 className='text-light'><label htmlFor="exampleFormControlTextarea1">Description</label></h3>
                    <textarea aria-required className="input-field w-100" id="exampleFormControlTextarea1" name='description' value={note.description} onChange={onchange} placeholder="Give a description" rows="7">
                    </textarea>
                </div>
                <div className="mb-3">
                    <h3 className='text-light'><label htmlFor="exampleFormControlInput1">Date</label></h3>
                    <input type="date" className="input-field w-25" id="exampleFormControlInput1" />
                </div>
                <div className='d-flex justify-content-end'>
                    <button className="btn-grad" onClick={clearNote}>{props.btnName1}</button>
                    <button className="btn-grad" onClick={createNote}>{props.btnName2}</button>
                </div>
            </div>
        </>
    )
}
