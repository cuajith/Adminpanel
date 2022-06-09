import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import "./style.css";

const State = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="col-12">
          <div className="row">
            <div className={"col-md-2 m-0 p-0"}>
              <Sidebar />
            </div>
            <div className="col-md-10">
              <div className="container">
                <div className="roles-scope-box">
                  <h2 className="rc-header">
                    <strong>Select State</strong>
                  </h2>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-4 m-3 px-4">
                        <Button variant="primary">Add State</Button>
                      </div>
                      <div className="col-3 m-3">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="secondary"
                            id="dropdown-basic"
                          >
                            Select Country
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                              India
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">USA</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">UAE</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="col-4 m-3">
                        <Button variant="success" style={{ float: "right" }}>
                          Upload countries CSV
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="roles-scope-box-body">
                    <div className="container table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                          <tr>
                            <th className="apiendpoint" scope="col">
                              Sl.No
                            </th>
                            <th className="centertext" scope="col">
                              State Name
                            </th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default State;
