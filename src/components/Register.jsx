import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from './Loader'
import { createUser } from '../api'

const Register = () => {
    let [user,setUser]=useState({username:'',email:'',password:'',cpassword:'',role:'user'})
    let [errors,setErrors]=useState({})
    let [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    let validations=(user)=>{
        let formerrors={}
        let emailpattern=/^([\w\d_\!\@\#\$|%\&\*\-\+\.]+)\@([\w\d_]+)\.([a-zA-Z]{3})$/
        if(user.username=='')
            formerrors.unameerr="Username is required"
        if(user.email=='')
            formerrors.emailerr="email is required"
        else if(!emailpattern.test(user.email))
            formerrors.emailerr="invalid email"
        if(user.password=='')
            formerrors.pwderr="password is required"
         if(user.cpassword=='' || user.password != user.cpassword)
            formerrors.cpwderr="password not same"
        return formerrors
    }

    let handleSubmit=async(e)=>{
        e.preventDefault()
        let myerrors=validations(user)
        if(Object.keys(myerrors).length==0){
            setErrors({})
            setIsLoading(true)
            // try{
            //     await fetch("https://65d5689d3f1ab8c63436e7a7.mockapi.io/users",{
            //         method:"POST",
            //         headers:{'content-type':"application/json"},
            //         body:JSON.stringify(user)
            //     })
            //     setIsLoading(false)
            //     toast.success("Registered Successfully")
            //     navigate('/login')
            // }
            // catch(err){
            //     setIsLoading(false)
            //     toast.error("something went wrong. Please try again!!")
            // } 
            // try{
            //     await axios.post("https://65d5689d3f1ab8c63436e7a7.mockapi.io/users",user)
            //     setIsLoading(false)
            //     toast.success("Registered Successfully")
            //     navigate('/login')
            // }
            // catch(err){
            //     setIsLoading(false)
            //     toast.error("something went wrong. Please try again!!")
            // } 

            try{
                await createUser(user)
                setIsLoading(false)
                toast.success("Registered Successfully")
                navigate('/login')
            }
            catch(err){
                setIsLoading(false)
                toast.error("something went wrong. Please try again!!")
            } 
        }
            else  setErrors(myerrors)
    }
  return (
    <Container>
        {isLoading && <Loader/>}
    <Row className='shadow p-3'>
        <Col>
            <img src='/src/assets/register.png' height={400} />
        </Col>
        <Col>   
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})}/>
                    </Form.Group>
                    {errors.unameerr && <span className='text-danger'>{errors.unameerr}</span>}

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

                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="cpassword"  value={user.cpassword} onChange={(e)=>setUser({...user,cpassword:e.target.value})}/>
                    </Form.Group>
                    {errors.cpwderr && <span className='text-danger'>{errors.cpwderr}</span>}<br/>
                    <Button type="submit" variant='primary' className='mt-3'>Submit</Button>
                </Form>
                <p>Already an account?? <Link to='/login'>Login</Link></p>
        </Col>
    </Row>
    </Container>
  )
}

export default Register
