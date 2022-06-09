import React, { useEffect, useState } from "react";
import data from "../../Data/Data";
import Submenu from "./Submenu";
import "./App.css";

const Sidebar = () => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      document.querySelectorAll(".sub-menu").forEach((el) => {
        el.classList.remove("active");
      });
    }
  }, [inactive]);

  return (
    <div className={`sidebar-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          {inactive ? <h6>Digi</h6> : <h6>DigiKagaaz</h6>}
        </div>
        <div className="hamberg-icon">
          <i onClick={() => setInactive(!inactive)} class="bi bi-list"></i>
        </div>
      </div>

      <div className="main-menu">
        <ul>
          {data.map(({ iconName, Name, link, options }) => (
            <Submenu
              Name={Name}
              iconName={iconName}
              link={link}
              options={options}
              onClick={() => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
