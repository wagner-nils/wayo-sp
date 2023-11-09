import React from "react";
import './HeaderInfo.css';


function HeaderInfo() {
    return (
        <>
            <div className="headBoxes">
                <div className="box1">
                    <div className="text1">
                        12
                    </div>
                    <div className="text2">
                        orders in progress
                    </div>
                </div>

                <div className="box2">
                    <div className="text1">
                        3
                    </div>
                    <div className="text2">
                        orders due by end of week
                    </div>
                </div>

                <div className="box3">
                    <div className="text1">
                        40.043€
                    </div>
                    <div className="text2">
                        revenue this month
                    </div>
                </div>

            </div>
        </>
    )
};

export default HeaderInfo;
