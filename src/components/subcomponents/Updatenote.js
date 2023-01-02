import React, { useState } from 'react'
import '../../styles/comps.css'

export default function Updatenote(props) {

    
    // To let the use change the values of the fields
    const [data, setData] = useState(props.noteObj)
    // const [noteToUpdate, setNoteToUpdate] = useState(props.noteObj)
    const onchange = (e) => {
        setData({...props.noteObj, [e.target.name]: e.target.value })
    }

    const closeModal = () => {
        console.log(data._id)
        props.setUpModal("hide-it")
        setData(props.noteObj)
    }

    return (
        <>
            <div id="open-modal" className={`modal-window ${props.upModal}`}>
                <div>
                    <button onClick={closeModal} title="Close" className="modal-close"><i className="fa fa-remove"></i></button>
                    <div className="update-modal-size">
                        <div className="border-secondary">
                            {/* <span className="badge text-bg-dark position-absolute tag-span"><input className='tag text-light' name='tag'value={data.tag} onChange={onchange} type="text" size="10" maxLength={30} placeholder='Enter a tag' /></span> */}
                            <span className='tag'><i className="fas fa-tag fs-5 mx-2"></i><input className='text-light' name='tag'value={data.tag} onChange={onchange} type="text" size="10" maxLength={30} placeholder='Enter a tag' /></span>
                            <div data-tooltip="Title is required to create a note!" id="title" className={`mb-3`}>
                                <h3 className='text-light'><label htmlFor="exampleFormControlInput1">Title</label></h3>
                                <input type="text" className="input-field title text-light" id="exampleFormControlInput1" name='title' value={data.title} onChange={onchange} rows="3" placeholder="Enter a title" ></input>
                            </div>
                            <div data-tooltip="Description is required to create a note!" id="description" className={`mb-3`}>
                                <h3 className='text-light'><label htmlFor="exampleFormControlTextarea1">Description</label></h3>
                                <textarea className="input-field desc" id="exampleFormControlTextarea1" name='description' value={data.description} onChange={onchange} placeholder="Give a description" rows="6">
                                </textarea>
                            </div>
                            <div className="mb-3">
                                <h3 className='text-light'><label htmlFor="exampleFormControlInput1">Date</label></h3>
                                <input type="date" value={data.date} onChange={onchange} className="input-field w-25" id="exampleFormControlInput1" />
                            </div>
                        </div>
                    </div>
                    <span className="modalFooter d-flex justify-content-end align-items-center">
                        <button className="btn-grad" onClick={closeModal}>Close</button>
                        <button className="btn-grad" onClick={()=>{props.updateNote(data._id, data); closeModal()}}>Save changes</button>
                    </span>
                </div>
            </div>
        </>
    )
}
