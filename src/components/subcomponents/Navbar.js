import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../../styles/nav.css'
import logo from '../../Media/Note logo.png'


export default function Navbar(props) {
    const navigate = useNavigate()

    let location = useLocation()
    const locate_nav = () => {
        if (location.pathname === '/') return "nav_pos80"
        if (location.pathname === "/login" || location.pathname === "/signup") return "nav_pos84"
        else return "nav_pos7"
    }

    // State for "My Notes" navigation wether to display or not according to the signin local storage key
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <nav className={`${locate_nav()} navbar`} role="navigation">
                <ul className="nav_list">
                    <Link to="/"><span className="logo"><img src={logo} alt="" /></span></Link>
                    <li className="list_item">
                        <Link to="/">
                            <i className={`${location.pathname === "/" ? "nav_active" : ""} bx fa-solid fa-house`}></i>
                        </Link>
                        <span>Home</span>
                    </li>
                    <li className={`${!localStorage.getItem('token') ? "d-none" : ""} list_item`}>
                        <Link to="/notes">
                            <i className={`${location.pathname === "/notes" ? "nav_active" : ""} bx fa-solid fa-file-pen`}></i>
                        </Link>
                        <span>My Notes</span>
                    </li>
                    {!localStorage.getItem('token') ?
                        <li className="list_item">
                            <Link to="/login">
                                <i className={`${location.pathname === "/login" ? "nav_active" : ""} bx fa-solid fa-user`}></i>
                            </Link>
                            <span>Login</span>
                        </li>
                        : <li onClick={() => { props.setDelModal('') }} className="list_item">
                            <span>
                                <i className="bx fa-solid fa-right-from-bracket"></i>
                            </span>
                            <span>Log out</span>
                        </li>}
                </ul>
            </nav>
        </>
    )
}
