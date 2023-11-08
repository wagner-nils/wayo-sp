import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div>
            <div>Welcome to the Landing Page</div>
            <div><Link to="/login">login</Link></div>
            <div>register</div>
            <img className="WOIM" style={{width: 1476, height: 1032}} src="Pictures/frames/Fotolia_72116619_L.jpg" />        
            <div className="Mask" style={{width: 1728, height: 1032, background: 'linear-gradient(271deg, #030D2A 0%, rgba(2, 14, 45, 0.42) 100%)'}} />
        </div>
    );
}

export default LandingPage;
