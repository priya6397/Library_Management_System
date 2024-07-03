import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import CityServices from '../Service/CityService';

export default function City() {

    const [city, setCity] = useState([]);
    useEffect(()=>{
        loadCity();
    }, []);

    const loadCity = async()=>{
    const result = await CityServices.loadCity();
        setCity(result.data);
    // console.log(result.data);
    }

  return (
    <div  style={{ width: '80%', margin: '20px auto' }}>
        <h2 style={{ fontWeight: 'bold' }}>City List</h2>
        <Table stripped bordered hover variant="light">
            <thead style={{backgroundColor:"#1976d2",height:"40px"}}>
                <th style={{textAlign:"center"}}>City Id</th>
                <th style={{textAlign:"center"}}>City Name</th>
                <th style={{textAlign:"center"}}>Created At</th>
            </thead>
            <tbody>
                {
                    city.map((row) => 
                    (
                        <tr key={row.id}>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.id}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.name}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.createdAt}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            <div  style={{display:'table-caption', width: '80%', margin: '20px auto'}}>
                <Link to="/AddCity">
                    <Button variant="primary">Add City</Button>
                </Link>
            </div>
        </Table>
    </div>
  )
}
