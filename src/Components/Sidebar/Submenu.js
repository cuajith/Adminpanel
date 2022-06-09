import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link, Outlet } from "react-router-dom";

const Submenu = ({ Name, iconName, link, options, onClick, setInactive }) => {
  const [expand, setExpand] = useState(false);

  const icon = expand ? (
    <ExpandMoreIcon className="dropicon" />
  ) : (
    <ExpandLessIcon className="dropicon" />
  );

  return (
    <div>
      <li onClick={onClick}>
        <a onClick={() => setExpand(!expand)} className="menu-item">
          <div className="menu-icon">
            <i class={iconName}></i>
          </div>
          <span>
            <a
              href={link}
              className={`menu-item ${setInactive ? "inactive" : ""}`}
            >
              {Name}
            </a>
          </span>
          {options ? icon : ""}
        </a>
        {options &&
          options.map(({ optionName, link }) => (
            <ul className={`sub-menu ${expand ? "active" : ""}`}>
              <li>
                <a href={link} className="menu-item">
                  {optionName}
                </a>
              </li>
            </ul>
          ))}
      </li>
    </div>
  );
};

export default Submenu;
