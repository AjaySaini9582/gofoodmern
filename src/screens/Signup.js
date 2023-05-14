/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function signup() {
    const [creadentials,setcreadentials]=useState({name:"",email:"",password:"",geolocation:""})

    const handleSubmit=async(e)=>{
      
        e.preventDefault();
        const response =await fetch("http://localhost:5000/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:creadentials.name,email:creadentials.email,password:creadentials.password,location:creadentials.geolocation})
        });
        const Json=await response.json()
      
        

        if(!Json.success){
          alert("Enter Valid credentials")
        }
        
    } 
    const onChange=(event)=>{
        setcreadentials({...creadentials,[event.target.name]:event.target.value})
    }
  return (
    <>
    <div className='container'>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
    <label >Name</label>
    <input type="text" className="form-control" name='name'value={creadentials.name}  placeholder="Enter Your Name" onChange={onChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={creadentials.email} onChange={onChange}/>
   
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" name='password' value={creadentials.password} id="exampleInputPassword1"   onChange={onChange} />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputAddress">Address</label>
    <input type="text" className="form-control" name='geolocation' value={creadentials.geolocation}  onChange={onChange}/>
  </div>
  
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/login" className='m-2 btn btn-danger'>Already a user</Link>

</form>
    </div>
    </>
  )
}
