import './App.scss'
import Station from "./Components";
import stat from "./stations";


function App() {
  let stations = stat['stations'];
  return (
    <div className="App" class="row justify-content-center">
      {stations.map(station => (
        <Station text={station['name']} link={station['link']}/>
      ))}
    </div>
  );
}

export default App;
