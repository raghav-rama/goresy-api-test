import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import DataTable from "./components/Data";

interface IUser {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
  created_at: string;
  updated_at: string;
}

function App() {
  // const [count, setCount] = useState(0);
  const [data, setData] = useState<IUser[] | undefined>(undefined);
  useEffect(() => {
    axios.get("http://localhost:5000/api/users").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <>
      {/* <button onClick={() => console.log(data)}>Click</button> */}
      <h1>Users</h1>
      {data ? <DataTable data={data} /> : <h1>Loading...</h1>}
    </>
  );
}

export default App;
