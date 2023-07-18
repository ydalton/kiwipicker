import './App.scss'
import Station from "./Station";
import stat from "./stations";

function AddButton() {
  return (
    <a href="#" class="add text-center col-11 col-lg-2 p m-2">
      <p>
        +
      </p>
    </a>
  );
}

function App() {
  let stations = stat['stations'];
  if(stations == null)
    return <p>No stations found. Try loading a different file</p>;
  return (
    <div className="App row justify-content-center">
      {stations.map(station => (
        <Station key={station['link']}
                 text={station['name']}
                 link={station['link']}/>
      ))}
      <AddButton/>
    </div>
  );
}

export default App;
