import React, { useContext, useEffect } from 'react'
import { NotesContext } from '../context api/NotesState'
import NoteCard from './subcomponents/NoteCard'
import Addnote from './subcomponents/Addnote'
import '../styles/comps.css'

export default function Notes() {
    // content coming through context api
    const { auther, notes, fetchNotes, addNote, updateNote, deleteNote } = useContext(NotesContext)

    useEffect(() => {
        const authToken = localStorage.getItem('token')
        if(authToken) fetchNotes()
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <section className='notes-body py-5'>
                <div className='container mt-5 pt-5'>
                <h4 className=" welcome_heading text-light position-absolute start-50 translate-middle z-3">Welcome {auther} !</h4>

                    {/* Componenet to Add/create a note */}
                    <div className="position-relative">
                        <Addnote title="Add a Note" btnName1="Clear Note" btnName2="Create Note" addNote={addNote} />
                    </div>
                    <hr className='text-light' />

                    {/* Renderting the user's notes */}
                    <div className='row mt-4'>
                        <h2 className='text-light text-center'>Your Notes ({notes.length})</h2>
                        {notes.length < 1 ? <div className="no-notes"><h4>You don't have any notes yet :/</h4></div> : notes
                            // .filter((note, index) => { return index < 5 })
                            .map((note) => {
                                return <NoteCard key={note._id} note={note} updateNote={updateNote} deleteNote={deleteNote} />
                            }
                            )}
                        {/* <div><button className="btn btn-success">See All Notes</button></div> */}
                    </div>
                </div>
            </section>
        </>
    )
}
