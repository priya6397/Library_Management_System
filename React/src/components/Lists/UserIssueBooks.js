import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
import UserServices from '../Service/UserService';

export default function UserIssueBooks() {
    const location = useLocation();
    const path = location.state;

    const [userIssue, setuserIssue] = useState([]);
    useEffect(()=>{
        getUserIssuedBooks();
    }, []);

    const getUserIssuedBooks = async()=>{
    const result = await UserServices.getUserIssuedBooks(path.id);
        setuserIssue(result.data);
    // console.log(result.data);
    }

    const returnBook = async(id)=> {
        const result = await UserServices.returnBook(id);
        getUserIssuedBooks();
    }

  return (
    <div  style={{ width: '80%', margin: '20px auto' }}>
        <h2 style={{ fontWeight: 'bold' }}>User Issued Books List</h2>
      {/* <Table sx={{ minWidth: 500 }} aria-label="custom pagination table"> */}
        <Table stripped bordered hover variant="light">
            <thead style={{backgroundColor:"#1976d2",height:"40px"}}>
                <th style={{textAlign:"center"}}>Book Id</th>
                <th style={{textAlign:"center"}}>Book Name</th>
                <th style={{textAlign:"center"}}>Issue Date</th>
                <th style={{textAlign:"center"}}>Expiry Date</th>
                <th style={{textAlign:"center"}}>Return Date</th>
                <th style={{textAlign:"center"}}>Action</th>
            </thead>
            <tbody>
                {
                    userIssue.map((row) => 
                    (
                        <tr key={row.id}>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.book.id}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.book.title}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.issueDate}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.expiryDate}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.returnDate}
                            </td>
                            <td>{row.returnDate === null ? <button onClick={() => returnBook(row.id)}>Return Book</button>: null}</td> 
                        </tr>
                    ))
                }
            </tbody>
            <div  style={{display:'table-caption', width: '80%', margin: '20px auto'}}>
            </div>
        </Table>
    </div>
  )
}
