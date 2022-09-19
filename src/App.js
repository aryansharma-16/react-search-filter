import './App.css';
import { Users } from './Components/Users';
import { useEffect, useState } from 'react';
import Table from './Components/Table';
import axios from 'axios';

function App() {

  const[search, setSearch]=useState("")
  const[fetchdata, setfetchData]=useState([])
  // const[checked, setChecked]=useState(false)
  const[gender,setGender]=useState("all")
  const[status, setStatus]=useState("all")

  const userGender = ["all", "male", "female"]
  const userStatus = ["all", "active", "inactive"]

  const searchName = (allusers) => {
    // if(checked === true){
    //   allusers = allusers.filter((user) =>  user.gender === "female")
    // }
    

    if(gender === userGender[0]){
      allusers = allusers
    }
    else{
      allusers = allusers.filter((user) =>  user.gender === gender)
    }
    

    if(status === userStatus[0]){
      allusers = allusers
    }
    else{
      allusers = allusers.filter((user) =>  user.status === status)
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
          <input type="radio" name="gender" value={userGender[0]} defaultChecked onChange={(e) => setGender(e.target.value)} />
          All Users
          <input type="radio" name="gender" value={userGender[1]} onChange={(e) => setGender(e.target.value)} />
          Male
          <input type="radio" name="gender" value={userGender[2]} onChange={(e) => setGender(e.target.value)}/>
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
          <option value={userStatus[0]}>All</option>
          <option value={userStatus[1]}>Active</option>
          <option value={userStatus[2]}>Inactive</option>
        </select>
      </div>
      <Table dataprops={searchName(fetchdata)}/>
    </div>
  );
}

export default App;
