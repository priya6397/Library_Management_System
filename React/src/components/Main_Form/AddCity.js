import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CityServices from '../Service/CityService';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
 
const AddCity = () => {
    const initialCityData ={cityName:""};
    const[currentData, setCurrentData] = useState(initialCityData);

    const handleInputChange = (event) => {
        const{name, value} = event.target;
        setCurrentData({...currentData,[name]:value});
    };

    const postCity = () =>{
        CityServices.createCity(currentData).then((response)=>{
            toast.success("City created successfully!");
            if(response.status === 200){
                setCurrentData(initialCityData);
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
                    <h2 className='text-center' style={{fontWeight:"bold"}}> ADD CITY</h2>
                    <div className='card-body'>
                            <div className='form-group mb-2'>
                                <input name='cityName' className='form-control'
                                value={currentData.cityName}
                                onChange={handleInputChange}
                                    type="text" placeholder='Enter City Name' />
                            </div>
                            <button onClick={postCity} className='btn btn-success'>Save</button> {" "}
                            <Link to={"/City"} className='btn btn-danger' href=''>Cancel</Link>
                    </div>
                </div>
            </div>
        </div>
    <ToastContainer />
    </div>
  )
}
 
export default AddCity;