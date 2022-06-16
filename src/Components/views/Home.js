import React, { useState } from "react";
import axios from "axios";
import InputAuto from "./InputAuto";
import Sidebar from "../Sidebar/Sidebar";
import "./index.css";

export default function Home() {
  const [roles, setRoles] = useState([""]);
  const [apiNames, setApiNames] = useState([]);
  const [onAPI, setOnApi] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhjYmYwZDE3MjY4ZDQwZjFiMGYyNzMiLCJpYXQiOjE2NTQ4ODA1NzgsImV4cCI6MTY1NTc0NDU3OH0.l7COlseJmU2hEzmzc58qxZkuXtyxJaWnNuhO5uv33wA",
  };
  React.useEffect(() => {
    let abortController = new AbortController();
    let aborted = abortController.signal.aborted; // true || false
    async function fetchAPI() {
      try {
        const response = await axios.get("http://localhost:3001/roles/", {
          headers: headers,
        });
        const allScopes = await axios.get("http://localhost:3001/scopes/", {
          headers: headers,
        });
        const listScopeNames = allScopes.data.result.map((res) => res.name);
        const listScopewithcrud = allScopes.data.result.map((res) => res.name);
        const lsnstring = listScopeNames.toString();
        const splitScope = lsnstring.split(/[.,!,:]/);
        const apinames = splitScope.filter((val, index) => index % 2 === 0);
        const unique = apinames.filter(onlyUnique);
        aborted = abortController.signal.aborted; // before 'if' statement check again if aborted
        if (aborted === false) {
          setRoles(response.data.result.map((res) => res.name));
          setApiNames(unique);
          setPermissions(listScopewithcrud);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchAPI();

    return () => {
      abortController.abort();
    };
  }, [getApiRows]);

  const getSelectedVal = async (value) => {
    findlonely();
    try {
      const roleId = await axios.post("http://localhost:3001/role/", { value });
      const rolescopes = await axios.get(
        "http://localhost:3001/roles/" + roleId.data + "/scope",
        { headers: headers }
      );
      const listScope = rolescopes.data.scopes.map((res) => res.name);
      console.log(listScope);
      setOnApi(listScope);
    } catch (err) {
      console.log(err);
    }
  };
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  function getApiRows() {
    var api = apiNames;

    return api.map(function (obj, i) {
      return (
        <tr key={i}>
          <th scope="row">{obj}</th>
          {getPermissionRows(permissions, obj)}
        </tr>
      );
    });
  }
  function getPermissionRows(permissions, b) {
    var listname = permissions.map((res) => res);
    const permisions = listname.filter(
      (listname,
      function (val) {
        return val.indexOf(b) !== -1;
      })
    );
    return permisions.map(function (obj, i) {
      return (
        <td className="centertext" key={i}>
          <input
            id={obj}
            key={i}
            type="checkbox"
            value={obj}
            checked={checkForExisitance(obj, onAPI)}
            onChange={() => changePermissionState(obj)}
            className="switch"
          />
        </td>
      );
    });
  }
  function checkForExisitance(scopeObj, roleScopeObj) {
    const a = roleScopeObj.some((obj) => obj === scopeObj);
    if (!a) {
      return false;
    } else {
      return true;
    }
  }
  function changePermissionState(obj) {
    var newArray = onAPI;
    var itemName = newArray.some((item) => item === obj);
    var indexNo = newArray.indexOf(obj);
    if (itemName) {
      newArray.splice(indexNo, 1);
      setOnApi(newArray);
    } else {
      newArray.push(obj);
    }
    console.log(onAPI);
  }
  const getChanges = (value) => {
    // console.log(value);
  };

  const findlonely = () => {
    var a = [10, 6, 5, 8, 1, 3];
    var b = a.map((res) => {
      var native1 = res + 1;
      var native2 = res - 1;
      if (!a.includes(native1) && !a.includes(native2)) {
        console.log("lonly numbers are", res);
      }
    });
  };
  return (
    <div>
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
                    <strong>Roles and Scope</strong>
                  </h2>
                  <div className="rc-autodropbox">
                    <InputAuto
                      label="Roles"
                      pholder="Select Roles ......"
                      data={roles}
                      onSelected={getSelectedVal}
                      onChange={getChanges}
                      onClick={getSelectedVal}
                    />
                  </div>

                  <div className="roles-scope-box-body">
                    <div className="container table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                          <tr>
                            <th className="apiendpoint" scope="col">
                              Operations
                            </th>
                            <th className="centertext" scope="col">
                              Create
                            </th>
                            <th className="centertext" scope="col">
                              Read
                            </th>
                            <th className="centertext" scope="col">
                              Update
                            </th>
                            <th className="centertext" scope="col">
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody>{getApiRows()}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
