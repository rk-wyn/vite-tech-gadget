import { useState } from "react";
import "./App.css";

function App() {
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [maker, setMaker] = useState("");
  const [healthScore, setHealthScore] = useState("");

  return (
    <>
      <h1>Tech Gadget & Inventory Hub</h1>

      <form>
        <div>
          <label htmlFor="deviceName">Gadget Name</label>
          <input
            id="deviceName"
            type="text"
            value={deviceName}
            onChange={(event) => setDeviceName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="deviceType">Category</label>
          <select
            id="deviceType"
            value={deviceType}
            onChange={(event) => setDeviceType(event.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Laptop">Laptop</option>
            <option value="Wearable">Wearable</option>
            <option value="Audio">Audio</option>
          </select>
        </div>

        <div>
          <label htmlFor="maker">Manufacturer</label>
          <input
            id="maker"
            type="text"
            value={maker}
            onChange={(event) => setMaker(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="healthScore">Health Rating</label>
          <input
            id="healthScore"
            type="number"
            value={healthScore}
            onChange={(event) => setHealthScore(event.target.value)}
          />
        </div>
      </form>
    </>
  );
}

export default App;
