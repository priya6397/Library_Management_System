import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserServices from '../Service/UserService';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
 
const AddUser = () => {
    const initialUserData ={
        fullName:"",
        address:"",
        phoneNo:"",
        email:"",
    };

    const[currentData, setCurrentData] = useState(initialUserData);

    const handleInputChange = (event) => {
        const{name, value} = event.target;
        setCurrentData({...currentData,[name]:value});
    };

    const postUsers = () =>{
        UserServices.createUser(currentData).then((response)=>{
            toast.success("User Created successfully!!!");
            if(response.status === 200){
                setCurrentData(initialUserData);
                console.log(response.data);
            }
        }).catch((error)=>{
            console.log("error", error)
        })
    }
 
  return (
    <div>
        <div className='container mt-5'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        <h2 className='text-center' style={{fontWeight:"bold"}}> USER DETAILS</h2>
                        <div className='card-body'>
                                <div className='form-group mb-2'>
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
                                </div>
                                <button onClick={postUsers} className='btn btn-success'>Save</button> {" "}
                                <Link to={"/Users"} className='btn btn-danger' href=''>Cancel</Link>
                        </div>
                    </div>
                </div>
        </div>
        <ToastContainer/>
 
    </div>
  )
}
 
export default AddUser;