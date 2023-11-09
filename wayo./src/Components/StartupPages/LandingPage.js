import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';
// import FadePic from '../Pictures/frames/FadePic.svg';
import FadePic from '../../Pictures/png-frames/Fotolia_72116619_L.png';
import cms from '../../Pictures/frames/controlling made simple..svg';
import logo from '../../Pictures/logos/wayo..png';


function LandingPage() {
    return (
        <div>
            <div className="Rectangle1" style={{width: '100%', height: '100%', background: 'linear-gradient(271deg, #030D2A 30%, rgba(2, 14, 45, 0.42) 100%)'}} />
            <img className="BG" src={FadePic} /> 
            <img className="cms" src={cms} />
            <Link to="/login" className="loginLP">login</Link>
            <div className="registerLP">register</div>
            <img className="logo" src={logo} /> 
        </div>
    );
}

export default LandingPage;
