import React from 'react';
import '../css/login.css';

function login({appName,user,onAuth, onLogout}) {
    function renderUserData() {
        return (

            <div className="login_derecha">
                <img src={user.photoURL} width='45' height='45' style={{borderRadius: 100,float: 'right'}}></img>
                <button onClick={onLogout} className='button_login'> LogOut</button>
            </div>

        )
    }
    
    function renderLoginButton() {

        return (
            <div className='login_derecha'>
                <button onClick={onAuth} className='button_pc'>LogIn</button>
            </div>
        )
    }

    return(
        <nav>
            <div>
                <h1>{appName}</h1>
                {user ? renderUserData() : renderLoginButton()}
            </div>
        </nav>
    )
}

export default login;
