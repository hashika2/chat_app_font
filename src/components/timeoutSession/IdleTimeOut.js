import React,{ useRef, useState } from 'react';
import IdleTimer from 'react-idle-timer';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const IdleTimeOut = () =>{
    const idleTimerRef = useRef(null);
    const [isLoggedIn,setIsLoggedIn] = useState(true);
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const sessionTimeOutRef = useRef(null);
    const onIdle = () => {
        console.log("user id idle");
        setModalIsOpen(true);
        sessionTimeOutRef.current = setTimeout(logOut,5000)
    }
    const logOut =()=>{
        setModalIsOpen(false);
        setIsLoggedIn(false);
        clearTimeout(sessionTimeOutRef.current)
        console.log("user logout")
    }
    const stayActive =() =>{
        setModalIsOpen(false);
        clearTimeout(sessionTimeOutRef.current)
    }
    return(
        <div>
            {
                isLoggedIn ? <h2>hello world</h2> :<h2>hello guest</h2>
            }
            <Modal isOpen={modalIsOpen}>
                <h2> You have been idle for a while</h2>
                <p> You have been logout soon</p>
                <div>
                    <button onClick={logOut} className="btn btn-danger">Logout me</button>
                    <button onClick={stayActive} className="btn btn-success">Keep me active</button>
                </div>
            </Modal>
            <IdleTimer ref={idleTimerRef} timeout={5 * 1000} onIdle={onIdle}></IdleTimer>
        </div>
    )
}

export default IdleTimeOut;