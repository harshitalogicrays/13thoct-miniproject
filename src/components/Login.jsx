import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from './Loader'
const Login = () => {
  let [user,setUser]=useState({email:'',password:''})
  let [errors,setErrors]=useState({})
  let [isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()
  let validations=(user)=>{
      let formerrors={}
      let emailpattern=/^([\w\d_\!\@\#\$|%\&\*\-\+\.]+)\@([\w\d_]+)\.([a-zA-Z]{3})$/
      if(user.email=='')
          formerrors.emailerr="email is required"
      else if(!emailpattern.test(user.email))
          formerrors.emailerr="invalid email"
      if(user.password=='')
          formerrors.pwderr="password is required"
      return formerrors
  }

  let handleSubmit=async(e)=>{
      e.preventDefault()
      let myerrors=validations(user)
      if(Object.keys(myerrors).length==0){
          setErrors({})
          setIsLoading(true)
          try{
              let res= await fetch(`https://65d5689d3f1ab8c63436e7a7.mockapi.io/users?email=${user.email}`)
              let data=await res.json()
              if(data[0].password == user.password){
                let obj={isLoggedIn:true,name:data[0].username,role:data[0].role}
                sessionStorage.setItem("auth",JSON.stringify(obj))
                setIsLoading(false)
                toast.success("loggedIn Successfully")
                if(data[0].role=="admin") navigate('/admin')
                else if(data[0].role=="user") navigate('/')
            }
             else { setIsLoading(false)
              toast.error("Invalid Credenitals")
             }
          }
          catch(err){
              setIsLoading(false)
              toast.error("Invalid Credenitals")
          } 
         
      }
          else  setErrors(myerrors)
  }
  return (
    <Container>
       
        {isLoading &&  <Loader/>}
    <Row className='shadow p-3'>
    <Col>
        <img src='/src/assets/login.png' height={400} />
    </Col>
    <Col>   
            <Form onSubmit={handleSubmit}>
            <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email"  value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
                    </Form.Group>
                    {errors.emailerr && <span className='text-danger'>{errors.emailerr}</span>}
    
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password"  value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
                    </Form.Group>
                    {errors.pwderr && <span className='text-danger'>{errors.pwderr}</span>}
    <br/>
                <Button type="submit" variant='primary' className='mt-3'>Submit</Button> 
            </Form>
            <p>create an account?? <Link to='/register'>Signup</Link></p>
    </Col>
   </Row>
   </Container>
  )
}

export default Login
