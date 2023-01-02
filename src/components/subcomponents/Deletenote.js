import React from 'react'
import { useNavigate } from "react-router-dom";
import '../../styles/comps.css'

export default function Deletenote(props) {

    const closeModal = () => {
        props.setDelModal("hide-it")
    }

    // Log Out function
    const navigate = useNavigate()
    const logoutUser = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <>
            <div id="exampleModal" className={`modal-window ${props.delModal}`}>
                <div>
                    <button onClick={closeModal} title="Close" className="modal-close"><i className="fa fa-remove"></i></button>
                    <h4 className="text-light">{props.title}</h4>
                    <div className="delete-modal-size text-light d-flex justify-content-center align-items-center">
                        <span>{props.msg}</span>
                    </div>
                    <span className="modalFooter d-flex justify-content-end align-items-center">
                        <button onClick={closeModal} className="btn-grad" data-bs-dismiss="modal" >Cancel</button>
                        {props.updateObj ?
                            <button onClick={() => { props.modalAction(props.updateObj._id); closeModal() }} className="btn-grad" >{props.option}</button>
                            :
                            <button onClick={() => { logoutUser(); closeModal() }} className="btn-grad" >{props.option}</button>
                        }
                    </span>
                </div>
            </div>
        </>
    )
}
