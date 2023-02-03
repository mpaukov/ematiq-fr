import { useState } from "react";
import useWebSocket from "react-use-websocket";
import "./App.css";

const WS_URL = "ws://ematiq-bc-production.up.railway.app";

function App() {
  const [data, setData] = useState([{}]);
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    onMessage: ({ data }) => setData(JSON.parse(data)),
  });
  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        {data && data.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Start Time</th>
                <th>Name</th>
                <th>Payout</th>
              </tr>
            </thead>
            <tbody>
              {data.map((line, index) => {
                return (
                  <tr key={index}>
                    <td>{line.time}</td>
                    <td>{line.title}</td>
                    <td>{line.payout}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default App;
