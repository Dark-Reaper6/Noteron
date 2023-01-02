import { createContext, useState } from "react";

export const NotesContext = createContext()
export const NotesState = (props) => {

  const host = "http://localhost:3027"

  //                                Functions for CRUD operations for USER credentials

  // User Sign Up funtion
  const userSignup = async (obj, callback) => {
    await fetch(`${host}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj)

    }).then(async (res) => {
      let response = await res.text();
      if (res.status !== 200) return alert(response)
      return response

    }).then((token) => {
      if (token) {
        localStorage.setItem('token', token)
      }
    })
    callback()
  }

  // User First Log In funtion
  const userLogin = async (obj, callback) => {
    console.log("i am login function")
    console.log(obj)
    await fetch(`${host}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj)

    }).then(async (res) => {
      let response = await res.text();
      if (res.status !== 200) return alert(response)
      console.log(res.status)
      return response

    }).then((token) => {
      console.log(token)
      if (!token || token === undefined) return
      localStorage.setItem('token', token)
    })
    let token = localStorage.getItem('token')
    if (!token || token === undefined) return alert("invalid login details")
    await callback()
  }

  //                                    Functions for CRUD operations for NOTES

  const [notes, setNotes] = useState([])
  const [auther, setAuther] = useState('')
  // Fething the notes against the user's auth token if exists
  const fetchNotes = async () => {
    await fetch(`${host}/api/mynotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token')
      }
    }).then(async (res) => {
      let json = await res.json()
      setAuther(json.auther)
      setNotes(json.notes)
    })
  }

  // Add note function
  const addNote = async (note) => {
    await fetch(`${host}/api/makenotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token')
      },
      body: JSON.stringify(note)
    }).then(async (res) => {
      let data = await res.json();
      console.log(data)
      setNotes(notes.concat(data.data))
    }).then(() => {
      alert("Note saved successfully!")
    })
  }

  // Update note function
  const updateNote = async (id, updatedNote) => {
    console.log(id)

    let note = notes.filter((note) => {
      return note._id === id
    })
    const index = notes.indexOf(note[0])
    notes[index] = Object.assign(notes[index], updatedNote)
    await fetch(`${host}/api/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem('token')
      },
      body: JSON.stringify(updatedNote)
    }).then(() => {
      alert("Note saved successfully!")
    })
  }

  // Delete note function
  const deleteNote = async (id) => {
    await fetch(`${host}/api/delete/${id}`, {
      method: "DELETE",
      headers: {
        "token": localStorage.getItem('token')
      }
    }).then(async (res) => {
      let note = notes.filter((note) => {
        return note._id !== id
      })
      setNotes(note)

      return await res.text()
    }).then((data) => {
      alert(data)
    })
  }


  return (
    <NotesContext.Provider value={{ auther, notes, fetchNotes, addNote, updateNote, deleteNote, userSignup, userLogin }}>
      {props.children}
    </NotesContext.Provider>
  )
}