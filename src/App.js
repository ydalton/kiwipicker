// Copyright (c) 2023 ydalton

import './App.scss'
import Station from "./components/Station";
import { useState } from "react";

export default function App() {
  let appContents;
  let [stations, setStations] = useState(null);
  let fileReader;
  let [popupVisible, isPopupVisible] = useState(false);
  let stationName, stationLink;

  const fileReadHandler = (e) => {
    const content = fileReader.result;
    const res = JSON.parse(content);
    try{
      setStations(res['stations']);
    } catch {
      setStations(-1);
    }
    console.log(res['stations']);
  }

  function AddButton() {
    return <Station text="+"
                    onclick={() => isPopupVisible(true)}
                    link="#"/>;
  }

  function Popup() {
    let output;

    const addHandler = (e) => {
      console.log("Not implemented, sorry.");
      setStations(arr => [...arr, {name: stationName, link: stationLink}]);
      isPopupVisible(false);
    }

    if(popupVisible)
      output = (
        <div id="bg-shadow">
          <div className="popup p-4">
            <p>Add new station</p>
            <form onSubmit={addHandler}>
              <label>Name</label>
              <input className="m-1"
                     type="text"
                     name="name"
                     onChange={(e) => stationName = e.target.value}
                     id="name"/>
              <br/>
              <label>Link</label>
              <input className="m-1"
                     type="text"
                     name="link"
                     onChange={(e) => stationLink = e.target.value}
                     id="link"/>
              <br/>
              <input type="submit" value="Submit" />
            </form>
            <a id="close-btn" href="#" onClick={() => isPopupVisible(false)}>x</a>
          </div>
        </div>
      );
    return output;
  }

  const changeHandler = (file) => {
    if(file == null) {
      console.log("changeHandler: file not loaded or is empty, bailing...");
      return;
    }
    fileReader = new FileReader();
    fileReader.onloadend = fileReadHandler;
    fileReader.readAsText(file);
  }

  const saveHandler = () => {
    if(stations == null) {
      console.log("saveHandler: file not loaded or is empty, bailing...");
      return;
    }
    let stringed =`{"stations": ${JSON.stringify(stations)}}`;
    // hack, but it works
    let element = document.createElement('a');
    const file = new Blob([stringed], {type: "application/json;charset=utf-8"});
    element.href = URL.createObjectURL(file);
    element.download = "stations.json";
    document.body.appendChild(element);
    element.click();
    element.remove();
  }

  switch(stations) {
    case null:
    case -1: {
      let errString = (stations == -1)
          ? "An error occurred. Please load a valid station file."
          : "No stations found. Try loading a stations file.";
      appContents =  (
        <div className="p-4">
          <p>{errString}</p>
        </div>
      );
    } break;
    default:
      appContents = (
        <div id="stations" className="row justify-content-center">
          {stations.map(station => (
            <Station key={station['link']}
                    text={station['name']}
                    target="_blank"
                    link={station['link']}/>
          ))}
          <AddButton/>
        </div>
      );
    break;
  }

  return (
    <div className="App ">
      <h1 className="text-center p-4">Kiwipicker</h1>
      <div className="file-upload p-4 m-4">
        <p>Load stations file: </p>
        <input type="file"
               id="file"
               accept=".json"
               onChange={e => changeHandler(e.target.files[0])}
               className="m-2"/>
        <br/>
        <button onClick={saveHandler} className="m-2">
          Save file
        </button>
      </div>
      {appContents}
      <Popup />
    </div>
  );
}
