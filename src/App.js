import './App.css';
import { Users } from './Components/Users';
import { useEffect, useState } from 'react';
import Table from './Components/Table';
import axios from 'axios';

function App() {

  const[search, setSearch]=useState("")
  const[fetchdata, setfetchData]=useState([])

  const searchName = (allusers) => {
    return allusers.filter(user => user.name.toLocaleLowerCase().includes(search))
  }

  useEffect(() =>{
    const fetchUsers = async () => {
      const res = await axios.get(`https://gorest.co.in/public/v2/users`);
      setfetchData(res.data);
    };
    fetchUsers()
  },[]);
  return (
    <div className="App">
      <input type="text" 
             placeholder="Search here" 
             className="search" 
             onChange={(e) => setSearch(e.target.value)}
      />
      <Table dataprops={searchName(fetchdata)}/>
    </div>
  );
}

export default App;
