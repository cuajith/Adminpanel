import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Submenu = ({ Name, iconName, options, onClick }) => {
  const [inactive, setInactive] = useState(false);
  const [expand, setExpand] = useState(false);
  return (
    <div>
      <li onClick={onClick}>
        <a onClick={() => setExpand(!expand)} className="menu-item">
          <div className="menu-icon">
            <i class={iconName}></i>
          </div>
          <span>{Name}</span>
          {options && <ExpandMoreIcon className="dropicon" />}
        </a>
        {options &&
          options.map(({ optionName }) => (
            <ul className={`sub-menu ${expand ? "active" : ""}`}>
              <li>
                <a>{optionName}</a>
              </li>
            </ul>
          ))}
      </li>
    </div>
  );
};

export default Submenu;
