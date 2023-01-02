import React, { useEffect, useState } from 'react'
import Deletenote from './Deletenote'
import Updatenote from './Updatenote'
import '../../styles/comps.css'

export default function NoteCard(props) {
    const { title, description, tag, date } = props.note

    // to show edit and delete note modal
    const [upModal, setUpModal] = useState("hide-it")
    const [delModal, setDelModal] = useState("hide-it")
    const showModal1 = (e) => {
        setUpModal("")
    }
    const showModal2 = () => {
        setDelModal("")
    }

    // content coming through props to show update note modal with clicked note content
    const [updateObj, setUpdateObj] = useState({
        "_id": "",
        "title": "",
        "tag": "",
        "description": "",
        "date": ""
      })
      const updateNoteObjState = (obj) => {
          setUpdateObj(obj)
      }

    // To load all the notes immidieltely as the component mount itself
    useEffect(() => {
        updateNoteObjState(props.note)
        //eslint-disable-next-line
    }, [])

    return (
        <>
            {/* Modals  */}
            <Updatenote title="Edit Note" upModal={upModal} setUpModal={setUpModal} updateNote={props.updateNote} noteObj={props.note} />
            <Deletenote title="Delete Note" msg="Are you sure you permanentaly want to delete this note?" option="Delete" delModal={delModal} setDelModal={setDelModal} updateObj={updateObj} modalAction={props.deleteNote} />
            <div className="card card-5 ">
                <div className="card__tag"><i className="fas fa-tag"></i> {tag}</div>
                <h4 className="card__title">{title}</h4>
                <div className='card__desc'>
                    <p>{description}</p>
                    <small>{date}</small>
                </div>
                <div className='mt-3'>
                    <i name="Edit" onClick={showModal1} className="card__edit fas fa-edit"></i>
                    <i name="Delete" onClick={showModal2} className="card__remove fas fa-remove"></i>
                </div>
            </div>
        </>
    )
}