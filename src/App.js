import { useState } from "react";
import useWebSocket from "react-use-websocket";
import "./App.css";

const WS_URL = "ws://localhost:5000";

function App() {
  const [data, setData] = useState([{}]);
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    onMessage: ({ data }) => setData(JSON.parse(data)),
  });
  console.log("data", data);
  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        {/* <table>
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
                  <td>{line.startTime}</td>
                  <td>{line.name}</td>
                  <td>{line.payout}</td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
        {data &&
          data.map((test) => {
            return (
              <div>
                <p>{`${test.title}`}</p>
                <p>{`${test.time}`}</p>
                <p>{`${test.payout}`}</p>
              </div>
            );
          })}
      </main>
    </div>
  );
}

export default App;
