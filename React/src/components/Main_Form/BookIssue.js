import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BookServices from '../Service/BookService';
 
const BookIssue = () => {
    const location = useLocation();
    const path = location.state;
    // console.log(path, "priya");

    const initialIssueData ={
        bookId:path?.id,
        userId:"",
        confirmationCode:"",
        expiryDate:""
    };
    const[currentData, setCurrentData] = useState(initialIssueData);

    const handleInputChange = (event) => {
        const{name, value} = event.target;
        setCurrentData({...currentData,[name]:value});
    };

    const postIssueBook = () =>{
        BookServices.createIssueBook(currentData).then((response)=>{
            if(response.status === 200){
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
                    <h2 className='text-center' style={{fontWeight:"bold"}}> Issue Book</h2>
                    <div className='card-body'>
                        <div className='form-group mb-2'>
                            <input name='id' className='form-control' disabled value={path?.id}
                                type="text" placeholder='Enter Book Id' />
                        </div>
                        <div className='form-group mb-2'>
                            <input name='title' className='form-control' disabled value={path?.title}
                                type="text" placeholder='Enter Book Name' />
                        </div>
                        <div className='form-group mb-2'>
                            <input name='userId' className='form-control'
                            value={currentData.userId}
                            onChange={handleInputChange}
                                type="text" placeholder='Enter User Id' />
                        </div>
                        <div className='form-group mb-2'>
                            <input name='confirmationCode' className='form-control'
                            value={currentData.confirmationCode}
                            onChange={handleInputChange}
                                type="text" placeholder='Enter Confirmation Code' />
                        </div>
                        <div className='form-group mb-2'>
                            <input name='expiryDate' className='form-control'
                            value={currentData.expiryDate}
                            onChange={handleInputChange}
                                type="text" placeholder='Enter Expiry Date' />
                        </div>
                        <button onClick={postIssueBook} className='btn btn-success'>Save</button> {" "}
                        <Link to={"/Books"} className='btn btn-danger' href=''>Cancel</Link>
                    </div>
                </div>
            </div>
        </div>
 
</div>
  )
}
 
export default BookIssue;