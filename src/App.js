import './App.css';
import { Users } from './Components/Users';
import { useEffect, useState } from 'react';
import Table from './Components/Table';
import axios from 'axios';

function App() {

  const[search, setSearch]=useState("")
  const[fetchdata, setfetchData]=useState([])
  // const[checked, setChecked]=useState(false)
  const[gender,setGender]=useState()
  const[status, setStatus]=useState("all")

  const searchName = (allusers) => {
    // if(checked === true){
    //   allusers = allusers.filter((user) =>  user.gender === "female")
    // }
    if(gender === "female"){
      allusers = allusers.filter((user) =>  user.gender === "female")
      }
    else if(gender === "male"){
      allusers = allusers.filter((user) =>  user.gender === "male")
    }
    if(status === "active"){
      debugger
      allusers = allusers.filter((user) =>  user.status === "active")
      }
    else if(status === "inactive"){
      debugger
      allusers = allusers.filter((user) =>  user.status === "inactive")
    }    
    return allusers.filter((user) => user.name.toLocaleLowerCase().includes(search))  
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
      /><br/>
       <div>
          <label>Filter By Gender</label>
          <input type="radio" name="gender" value="all" defaultChecked onChange={(e) => setGender(e.target.value)} />
          All Users
          <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />
          Male
          <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)}/>
          Female
        </div>
      {/* <label>
        <input type="checkbox"
               defaultChecked={checked}
               onChange={() => setChecked(!checked)}
        />
        Female
      </label> */}
      <div>
        <label>Filter By Status </label>
        <select onClick={(e) => setStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <Table dataprops={searchName(fetchdata)}/>
    </div>
  );
}

export default App;
