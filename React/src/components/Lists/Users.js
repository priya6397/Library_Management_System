import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import UserServices from '../Service/UserService';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


export default function Users() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    useEffect(()=>{
        loadUsers();
    }, []);

    const loadUsers = async()=>{
    const result = await UserServices.loadUsers();
        setUsers(result.data);
    }

    const UserIssuedBook = (id) => {
        navigate("/UserIssueBooks",{
            state: {id: id},
        });
    }

    const deleteUser = async(id) => {
        const result = await UserServices.deleteUserById(id);
        loadUsers();
    }

    const getUser = async(id) => {
        handleShow();
        const result = await UserServices.getUser(id);
        setCurrentData(result.data);
    };
    // console.log(currentData, "hii");

    const updateUser = () =>{
        UserServices.updateUser(currentData.id, currentData).then((response)=>{
            if(response.status === 200){
                // setCurrentData(initialUserData);
                console.log(response.data);
                handleClose();
                loadUsers();
            }
        }).catch((error)=>{
            console.log("error", error)
        })
    }

    const handleInputChange = (event) => {
        const{name, value} = event.target;
        setCurrentData({...currentData,[name]:value});
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div  style={{ width: '80%', margin: '20px auto' }}>
        <h2 style={{ fontWeight: 'bold' }}>Users List</h2>
        <Table stripped bordered hover variant="light">
            <thead style={{backgroundColor:"#1976d2",height:"40px"}}>
                <th style={{textAlign:"center"}}>User Id</th>
                <th style={{textAlign:"center"}}>User Name</th>
                <th style={{textAlign:"center"}}>User Address</th>
                <th style={{textAlign:"center"}}>User Phoneno.</th>
                <th style={{textAlign:"center"}}>User Email</th>
                <th style={{textAlign:"center"}}>Confirmation Code</th>
                <th style={{textAlign:"center"}}>Created At</th>
                <th style={{textAlign:"center"}}>Action</th>
            </thead>
            <tbody>
                {
                    users.map((row) => 
                    (
                        <tr key={row.id}>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.id}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.fullName}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.address}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.phoneNo}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.email}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.confirmationCode}
                            </td>
                            <td component="th" style={{textAlign:"center"}}>
                                {row.createdAt}
                            </td>
                            <td><button onClick={() => UserIssuedBook(row.id)}>Issued Book</button>{" "}
                            <button onClick={() => getUser(row.id)}>Edit</button> {" "}
                            <button onClick={() => deleteUser(row.id)}>Delete</button>
                            </td> 
                        </tr>
                    ))
                }
            </tbody>
            <div  style={{display:'table-caption', width: '80%', margin: '20px auto'}}>
            <Link to="/AddUser">
                    <Button variant="primary">Add User</Button>
                </Link>
            </div>
        </Table>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontWeight: "bold"}}>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className='form-group mb-2'>
                                    <input name='fullName' className='form-control'
                                    value={currentData.fullName}
                                    onChange={handleInputChange}
                                        type="text" placeholder='Enter Full Name' />
                                </div>
                                <div className='form-group mb-2'>
                                    <input name='address' className='form-control'
                                    value={currentData.address}
                                    onChange={handleInputChange}
                                        type="text" placeholder='Enter Address' />
                                </div>
                                <div className='form-group mb-2'>
                                    <input name='phoneNo' className='form-control'
                                    value={currentData.phoneNo}
                                    onChange={handleInputChange}
                                        type="text" placeholder='Enter Phone No.' />
                                </div>
                                <div className='form-group mb-2'>
                                    <input name='email' className='form-control'
                                    value={currentData.email}
                                    onChange={handleInputChange}
                                        type="text" placeholder='Enter Email' />
                                </div></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Update User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
