import React from "react";
import { Link } from "react-router-dom";
import Sylt from '../../Pictures/png-frames/Wohnimmobilie_shutterstock_745128145.png';
import wayoList from '../../Pictures/logos/wayo. outline.svg';
import './LoginPage.css';

function LoginPage() {
    return <>
        <div className="Rectangle1" style={{ width: '100%', height: '100%', background: 'linear-gradient(271deg, #030D2A 30%, rgba(2, 14, 45, 0.42) 100%)' }} />
        <img className="BG" src={Sylt} />
        <img className="wayoList" src={wayoList} />
        <img className="wayoList2" src={wayoList} />

        <div className="LoginDiv" style={{ background: 'linear-gradient(180deg, rgba(3, 13, 42, 0) 0%, rgba(3, 13, 42, 0.70) 22%, #030D2A 51%, rgba(3, 13, 42, 0.70) 83%, rgba(3, 13, 42, 0) 100%)' }} />
        <div className="ContLogDiv">
            <div className="psi">please sign in</div>
            <div className="EmailDiv">
                <input className="Email" type="email" placeholder="e-mail" />
            </div>
            <div className="PasswordDiv">
                <input className="Password" type="password" placeholder="password" />
            </div>

            <div className="loginButtonContainer">
            <Link to="/dashboard" className="loginService"><div className="loginButton">login</div></Link>
            </div>
        </div>
    </>;

}

export default LoginPage;
