import React, { useEffect, useState } from 'react';
import BookServices from '../Service/BookService';
import { Link } from 'react-router-dom'; 
import Form from 'react-bootstrap/Form';
import LibraryServices from '../Service/LibraryService';


const AddBook = () => {
    const initialBookData ={
        title:"",
        authorName:"",
        publisherName:"",
        publisherNo:"",
        publisherEmail:"",
        bookType:"",
        price:"",
        quantity:"",
        libraryId:"",
    };
    const[currentData, setCurrentData] = useState(initialBookData);
    const[viewLibraryData, setViewLibraryData] = useState([]);

    const handleInputChange = (event) => {
        const{name, value} = event.target;
        setCurrentData({...currentData,[name]:value});
    };

    const postBook = () =>{
        BookServices.createBook(currentData).then((response)=>{
            if(response.status === 200){
                setCurrentData(initialBookData);
                console.log(response.data);
            }
        }).catch((error)=>{
            console.log("error", error)
        })
    }

    const getLibraries = () =>{
        LibraryServices.loadLibrary().then((response) =>{
          setViewLibraryData(response.data)
        }).catch((error) =>{
          console.log("error",error);
        })
    }

    useEffect(()=>{
        getLibraries();
    }, []);
 
  return (
    <div>
    <div className='container mt-5'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center' style={{fontWeight:"bold"}}> ADD BOOK</h2>
                    <div className='card-body'>
                            <Form.Group className="mb-3">
                                <Form.Select enabled value={currentData.libraryId} onChange={handleInputChange} name='libraryId'>
                                <option>Select Library</option>
                                {viewLibraryData.map((item) => (
                                    <option value={item.id}>{item.name}</option>
                                    
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <div className='form-group mb-2'>
                                <input name='title' className='form-control'
                                value={currentData.title}
                                onChange={handleInputChange}
                                    type="text" placeholder='Enter Book Title' />
                            </div>
                            <div className='form-group mb-2'>
                                <input name='authorName' className='form-control'
                                value={currentData.authorName}
                                onChange={handleInputChange}
                                    type="text" placeholder='Enter Author Name' />
                            </div>
                            <div className='form-group mb-2'>
                                <input name='publisherName' className='form-control'
                                value={currentData.publisherName}
                                onChange={handleInputChange}
                                    type="text" placeholder='Enter Publisher Name' />
                            </div>
                            <div className='form-group mb-2'>
                                <input name='publisherNo' className='form-control'
                                value={currentData.publisherNo}
                                onChange={handleInputChange}
                                    type="text" placeholder='Enter Publisher No' />
                            </div>
                            <div className='form-group mb-2'>
                                <input name='publisherEmail' className='form-control'
                                value={currentData.publisherEmail}
                                onChange={handleInputChange}
                                    type="text" placeholder='Enter Publisher Email' />
                            </div>
                            <div className='form-group mb-2'>
                                <input name='bookType' className='form-control'
                                value={currentData.bookType}
                                onChange={handleInputChange}
                                    type="text" placeholder='Enter Book Type' />
                            </div>
                            <div className='form-group mb-2'>
                                <input name='price' className='form-control'
                                value={currentData.price}
                                onChange={handleInputChange}
                                    type="text" placeholder='Enter Price' />
                            </div>
                            <div className='form-group mb-2'>
                                <input name='quantity' className='form-control'
                                value={currentData.quantity}
                                onChange={handleInputChange}
                                    type="text" placeholder='Enter Quantity' />
                            </div>
                            <button onClick={postBook} className='btn btn-success'>Save</button> {" "}
                            <Link to={"/Books"} className='btn btn-danger' href=''>Cancel</Link>
                    </div>
                </div>
            </div>
        </div>
 
</div>
  )
}
 
export default AddBook;