import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import "./App.css";

const WS_URL = "wss://mpaukov-ematiq.onrender.com";
// const WS_URL = "ws://localhost:5000";

function App() {
  const [data, setData] = useState([{}]);
  const [filteredData, setFilteredData] = useState([{}]);
  const [payoutFilter, setPayoutFilter] = useState("98.00");

  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    onMessage: ({ data }) =>
      setData(() => {
        console.log("Received new data", Date.now());
        return JSON.parse(data).map((data) => {
          const fullDate = new Date(data.date * 1000);
          const now = new Date().getDate();
          const date = fullDate.getDate();
          const hour = fullDate.getHours().toString().padStart(2, "0");
          const min = fullDate.getMinutes().toString().padStart(2, "0");
          let day;
          switch (now - date) {
            case 1:
              day = "Yesterday";
              break;
            case 0:
              day = "Today";
              break;
            case -1:
              day = "Tomorrow";
              break;
            case -2:
              day = "Day after tomorrow";
              break;
            default:
              day = "";
          }
          data.date = { day, hour, min };
          return data;
        });
      }),
  });

  const handleChange = (e) => {
    setPayoutFilter(e.target.value);
  };

  useEffect(() => {
    setFilteredData(() =>
      data.filter(
        ({ payout }) => parseFloat(payout) >= parseFloat(payoutFilter)
      )
    );
  }, [data, payoutFilter]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Data from the server</h1>
      </header>
      <main>
        <div className="wrapper">
          <div className="tableWrapper">
            {filteredData && filteredData.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    <th>Start Time</th>
                    <th>Name</th>
                    <th>Payout</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((line, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {line.date?.day} {line.date?.hour}:{line.date?.min}
                        </td>
                        <td className="name">
                          {line.homeName} --- {line.awayName}
                        </td>
                        <td>{line.payout}</td>
                        <td>
                          {(line.homeResult || line.awayResult) &&
                            `${line.homeResult}:${line.awayResult}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          <div className="panel">
            <label className="label">
              Payout Filter
              <input
                className="input"
                type="number"
                min="0"
                max="200"
                step={0.01}
                value={payoutFilter}
                onChange={handleChange}
              ></input>
            </label>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
