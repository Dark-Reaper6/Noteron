import React, { useState, useContext } from 'react'
import { NotesContext } from '../context api/NotesState'
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../styles/signup.css'

export default function Signup(props) {
  const {userSignup, userLogin} = useContext(NotesContext)
  const navigate = useNavigate()
  let initialData = {
    name: "",
    email: "",
    password: ""
  }
  const [data, setData] = useState(initialData)
  const onchange = (e) => {
    setData({...data, [e.target.name]: e.target.value })
  }

  const signupUserinfo = ()=>{
    if(!data.name || !data.email || !data.password) return alert("Please enter all credentials to sign up!")
    userSignup(data, ()=>{navigate('/notes')})
    // props.setNoteLink("")
  }
  
  const loginUserinfo = ()=>{
    if(!data.email || !data.password) return alert("Please enter all credentials to sign up!")
    console.log(data)
    userLogin({email: data.email, password: data.password}, ()=>{navigate('/notes')})
    // props.setNoteLink("")
  }

  let pathname = useLocation().pathname
  const handleSignBtn = (e)=>{
    e.preventDefault()
    if(pathname === '/signup') return signupUserinfo()
    if(pathname === '/login') return loginUserinfo()
  }


  return (
    <div className="signup__container">
      <div className="container__child signup__thumbnail">
        <div className="thumbnail__content text-center">
          <h1 className="heading--primary">Welcome to the Noteron</h1>
          <h2 className="heading--secondary mt-4">Make your information secure with us !</h2>
        </div>
        <div className="signup__overlay"></div>
      </div>
      <div className="container__child signup__form">
        <form onSubmit={handleSignBtn}>
          <div className={`${useLocation().pathname === "/login" ? "d_none" : ''} form-group`}>
            <label htmlFor="username">Username</label>
            <input className="form-control" type="text" name="name" value={data.name} onChange={onchange} id="username" placeholder="myname"  />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control" type="text" name="email" value={data.email} onChange={onchange} id="email" placeholder="myname@gmail.com" required  />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" type="password" autoComplete="on" name="password" value={data.password} onChange={onchange} id="password" minLength={4} placeholder="•••••••••" required  />
          </div>
          {/* <div className={`${useLocation().pathname === "/login" ? "d_none" : ''}  form-group`}>
            <label htmlFor="passwordRepeat">Repeat Password</label>
            <input className="form-control" type="password" name="passwordRepeat" value={data.password} onChange={onchange} id="passwordRepeat" placeholder="•••••••••" required />
          </div> */}
          <div className="m-t-lg">
            <ul className="list-inline">
              <li>
                <button className="btn btn--form mt-4" type="submit">{props.signBtn}</button>
              </li>
              <li>
                <Link className="signup__link" to="/login">I am already a member</Link>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  )
}
