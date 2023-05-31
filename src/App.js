import './App.scss'
import Station from "./Components";

function App() {
  let station = <Station text="Google" link="https://www.google.com"/>
  const children = this.myData.map((val) => (
    {station}
  ));
  let app = <div className="App" class="row justify-content-center">
              {children}
            </div>;
  return app;
}

export default App;
