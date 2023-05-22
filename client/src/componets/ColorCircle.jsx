import React from 'react';

const ColorCircle = ({ color, description }) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <div
                style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: color,
                    marginRight: "10px",
                    marginLeft: "20px",
                    marginTop:"20px"
                }}
            ></div>
            <span  style={{

                marginRight: "10px",

                marginTop:"20px"
            }}>{description}</span>
        </div>
    );
};

export default ColorCircle;