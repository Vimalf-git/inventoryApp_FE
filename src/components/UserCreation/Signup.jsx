import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import './Signup.css'
function Signup() {
    const [email, setMail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const toggleLogin=()=>{
        console.log("inside fun");
        navigate('/login');
    }
    return (
        <>
            <div className='signupPage'>
            <div className='designSignupPart'>
                    <Typography variant='h5' component="p"
                        sx={{ color: "#ffff" }}>
                        Already Have an account?</Typography>
                    <Typography variant='h5' component="p"
                        sx={{ color: "#ffff" }}>
                            please login...
                    </Typography>
                    <Button variant='contained' color='warning' onClick={() =>  toggleLogin() }>Sigh In</Button>
                </div>
                <form className='signupForm'>
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
                        <Link style={{ textDecoration: 'none' }} to='/forget'>Forget password?</Link>
                    </div>
                    <div className="d-grid">
                        <Button variant='contained' color='primary'
                            onClick={(e) => loginVerify(e)}>
                            Sign in
                        </Button>
                    </div>
                </form>
                
            </div>
        </>
    )
}

export default Signup