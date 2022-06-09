import React from 'react'

import Sidebar from "../Sidebar/Sidebar";


const Dashboard = () => {
  return (
    <div className="container-fluid">
    <div className="col-12">
      <div className="row">
        <div className={"col-md-2 m-0 p-0"}>
          <Sidebar />
        </div>
        <div className="col-md-10">
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default Dashboard