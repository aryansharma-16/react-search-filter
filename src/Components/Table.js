import React from 'react';
import './Table.css';

const Table = ({dataprops}) => {
  return (
    <table>
        <tbody>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>State</th>
            </tr>
            {dataprops.map((item) => 
            <tr key={item.id}>
                <th>{item.name}</th>
                <th>{item.email}</th>
                <th>{item.gender}</th>
                <th>{item.status}</th>
            </tr>)}
        </tbody>
    </table>
  )
}
export default Table;