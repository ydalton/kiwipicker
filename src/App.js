import './App.scss'
import Station from "./Station";
// import Bar from "./Bar"
import stat from "./stations";

function App() {
  let stations = stat['stations'];
  if(stations == null)
    return <p>No stations found. Try loading a different file</p>;
  return (
    <div className="App row justify-content-center">
      {stations.map(station => (
        <Station key={station['link']} text={station['name']} link={station['link']}/>
      ))}
      {/* <Bar/> */}
    </div>
  );
}

export default App;
