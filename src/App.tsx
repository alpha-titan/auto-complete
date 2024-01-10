import "./App.css";
import AutoCompleteContainer from "./container/Autocomplete/AutoCompleteContainer";
import CrossTeamContainer from "./container/CrossTeamContainer/CrossTeamContainer";

function App() {
  return (
    <div className="appContainer">
      <AutoCompleteContainer />
      <CrossTeamContainer />
    </div>
  );
}

export default App;
