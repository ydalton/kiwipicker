// Copyright (c) 2023 ydalton

import './App.scss'
import Station from "./Station";
import defaultStations from "./defaultStations";
import { useState, changeEvent } from "react";

function AddButton() {
  return (
    <a href="#"
      title="Click here to add a station!"
      className="add text-center col-11 col-lg-2 p m-2">
      <p>
        +
      </p>
    </a>
  );
}

function App() {
  let appContents;
  let [stations, setStations] = useState(null);
  let fileReader;

  const fileReadHandler = (e) => {
    const content = fileReader.result;
    const result = JSON.parse(content);
    setStations(result['stations']);
    console.log(result);
  }

  const changeHandler = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = fileReadHandler;
    fileReader.readAsText(file);
  }

  const saveHandler = () => {
    // hack:
    let stringed =`{"stations": ${JSON.stringify(stations)}}`;
    console.log(stringed);
  }

  appContents = (stations == null) ? (
    <div className="p-4">
      <p>No stations found. Try loading a stations file.</p>
    </div>
  ) : (
    <div id="stations" className="row justify-content-center">
      {stations.map(station => (
        <Station key={station['link']}
                text={station['name']}
                link={station['link']}/>
      ))}
      <AddButton/>
    </div>
  );

  return (
    <div className="App ">
      <h1 className="text-center p-4">Kiwipicker</h1>
      <div className="file-upload p-4 m-4">
        <p>Enter a file: </p>
        <input type="file"
               id="file"
               accept=".json"
               onChange={e => changeHandler(e.target.files[0])}
               className="m-2"/>
        <br/>
        <br/>
        <button onClick={saveHandler} className="m-2">
          Save file
        </button>
      </div>
      {appContents}
    </div>
  );
}

export default App;
