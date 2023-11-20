import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import ApiService from '../../common/ApiService';
import './Login.css';
import { Button, TextField, Typography } from '@mui/material';
function Login() {
    const [email, setMail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const loginVerify = async (e) => {
        e.preventDefault();
        try {
            const res = await ApiService.post('/login', {
                mail: email,
                password: password
            })
            if (res.status == 200) {
                toast.success("login success")
                sessionStorage.setItem('token', res.data.token)
                navigate('/dashboard')
            }
        } catch (error) {
            // console.log("hi");
            toast.error(error.response.data.message || "Error Occoured! Please try after some time")
        }

    }
    const toggleSign = (e) => {
        e.preventDefault();
        console.log('enter into');
        navigate('/signup')
    }
    return (
        <>
            <div className='loginPage'>
                <div className='designPart'>
                    <Typography variant='h5' component="p"
                        sx={{ color: "#ffff" }}>
                        New Here?</Typography>
                    <Typography variant='h5' component="p"
                        sx={{ color: "#ffff" }}>
                        Create your account and get started...
                    </Typography>
                    <Button variant='contained' color='warning' style={{ cursor: 'pointer' }}
                        onClick={(e) => toggleSign(e)}>Sigh Up</Button>
                </div>
                <div className='loginForm'>
                    <Typography variant='h5' component="p"
                        sx={{ color: "#4481eb" }}>
                        Login                   
                         </Typography>
                    <form >
                        <div className="form-floating login-box mb-3">
                            <TextField required id="outlined-basic" label="Email" variant="outlined"
                                onChange={(e) => setMail(e.target.value)}
                            />
                        </div>
                        <div className="form-floating  mb-3">

                            <TextField required id="outlined-basic" label="Password" variant="outlined"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='for-crt-link mb-3'>
                            <Link style={{ textDecoration: 'none', color:'#4481eb' }} to='/forget'>Forget password?</Link>
                        </div>
                        <div className="d-grid">
                            <Button variant='contained' color='primary'
                                onClick={(e) => loginVerify(e)} sx={{ backgroundColor: "#4481eb" }}
                                >
                                Sign in
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login