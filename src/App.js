import React from 'react';
import './App.css';
import Sidebar from "./Components/Sidebar/Sidebar";
import TicketsListContainer from "./Components/TicketsListContainer/TicketsListContainer";

function App() {
  return (
    <div className="App container-fluid">
      <div className="row limit">
          <div className="col-lg-3"><Sidebar/></div>
          <div className="col-lg-9"><TicketsListContainer/></div>
      </div>
    </div>
  );
}

export default App;
