import React ,{useState}from 'react'
import { Link ,json,useNavigate} from 'react-router-dom';

export default function Login() {
  
  const [creadentials,setcreadentials]=useState({email:"",password:""})
let navigate=useNavigate();
  const handleSubmit=async(e)=>{
      e.preventDefault();
      const response =await fetch("http://localhost:5000/api/loginuser",{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({email:creadentials.email,password:creadentials.password})
      });
      const Json=await response.json()
      console.log(Json);

      if(!Json.success){
        alert("Enter Valid credentials")
      }
      if(Json.success){
        localStorage.setItem("userEmail",creadentials.email);
        localStorage.setItem("authToken",json.authToken)
        console.log(localStorage.getItem("authToken"))
        navigate("/");
      }
      
  } 
  const onChange=(event)=>{
      setcreadentials({...creadentials,[event.target.name]:event.target.value})
  }
  return (
    <div>

<div className='container'>
    <form onSubmit={handleSubmit}>
   
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={creadentials.email} onChange={onChange}/>
   
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" name='password' value={creadentials.password} id="exampleInputPassword1"   onChange={onChange} />
  </div>
  
  
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/createuser" className='m-2 btn btn-danger'>I'm a new user</Link>

</form>
    </div>
    </div>
  )
}
