// import { Button } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
// import { UserDetailContext } from './userDetailContext';
// import ApiService from '../common/ApiService';
import { toast } from 'react-toastify';
import ApiService from '../../common/ApiService';
import { UserDetailContext } from './UserDetailContext';
import { Button, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './ForgetPass.css'
function Forget() {

    const { mail, setMail } = useContext(UserDetailContext)
    // const[email,setEmail]=useState("")
    const mailSend = async () => {

        try {
            if(mail !==""){
            const res = await ApiService.post('/forgetpass', { email: mail })
            if (res.status === 200) {
                toast.success('check your mail')
            }
        }else{
            toast.error('please enter your mail')
        }
        } catch (error) {
            if (error.response.data.status === 400) {
                toast.error('Invalid mail')
            } else {
                toast.error(error.response.data.message);
            }
        }
    }
    return (
        <>
            <div className='reset-form'>
                <Typography
                component='h4'
                // variant='overline'
                color={'#ffff'}
                // width={}
                sx={{bgcolor:'#4481eb',width:'10rem',display:'flex',
            borderRadius:'.2rem',justifyContent:'center',height:'3rem',alignItems:'center'
            }}
                >
                    Forget Password
                </Typography>
                <TextField sx={{ m: 1, width: '15rem' }}
                    required id="outlined-basic" label="Mail" variant="outlined"
                    value={mail} name='Mail' onChange={(e) => setMail(e.target.value)}
                />
                {/* <div className='reset-input form-floating'>
        <input type='text'  className='form-control' value={mail}  onChange={} />
        <label className='floatingInput'>Enter your mail</label> */}
                <Button onClick={() => mailSend()}
                variant='contained'
                color='warning'
                >
                    send &nbsp;
                    <SendIcon/>
                    </Button>
                {/* </div> */}

            </div>

        </>
    )
}

export default Forget