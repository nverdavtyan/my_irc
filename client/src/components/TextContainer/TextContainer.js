import React from "react";
import onlineIcon from "../../assets/onlineIcon.png";
import "./TextContainer.css";

const TextContainer = ({ users }) => (

  <div className="textContainer">
    {users ? (
      <div>
        <h3>People currently in the room : </h3>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
