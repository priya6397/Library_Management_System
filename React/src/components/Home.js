import React from 'react';
// import Carousel from './Carousel';
import library from '../images/library.jpg';

const Home = () => {
  return (
    <div className='container-fluid mb-2'>
       {/* <Carousel/> */}
       <div style={{ display: 'list-item', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{fontWeight: 'bolder'}}>WELCOME TO OUR LIBRARY</h1>
        <img src={library}></img>
       </div>
       <div className='mt-2-mb-5'>3
           <div className='row'>
               <div className='col-md-2'>
                  
               </div>
               <div className='col-md-8'>
                   <div className='row row-cols-1 row-cols-md-3 g-3'></div>
               </div>

           </div>
           <div className='col-md-2'></div>
       </div>
      
    </div>
  )
}

export default Home