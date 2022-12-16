import { useState } from "react";
import "./style.css";
import FactGrid from "../fact-grid";
import { observer } from "mobx-react";

function App() {
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <div className="App">
      <h1>Cats Facts MobX</h1>
      <div className="card">
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? "Favorite Facts" : "All Facts"}
        </button>
      </div>
      <FactGrid showFavorites={showFavorites} />
    </div>
  );
}

export default observer(App);
