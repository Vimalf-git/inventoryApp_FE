// import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
// import { Button, Form } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom'
// import { UserDetailContext } from './userDetailContext';
// import ApiService from '../common/ApiService';
import { toast } from 'react-toastify';
import useLogout from '../CustomHook/UseLogout';
import ApiService from '../../common/ApiService';
import { UserDetailContext } from './UserDetailContext';
// import UseLogout from '../components/CustomHooks/UseLogout'
import SaveAsIcon from '@mui/icons-material/SaveAs';
import './ForgetPass.css'
import { Button, TextField, Typography } from '@mui/material';

function ResetPassword() {
  const navigate=useNavigate();
  const logOut=useLogout()
  const { mail, setMail, pass, setPass } = useContext(UserDetailContext)

  const [searchParam, setSearchparam] = useSearchParams();
  const token = searchParam.get('emailtoken');
  const id = searchParam.get('id');
  const getData = async () => {
   
    try {
      let res = await ApiService.get(`forgetpass/getres/${id}/${token}`)
      console.log(res.data);
      setMail(res.data.mail)   
    } catch (error) {
      toast.error(error.response.data.message)
    //   logOut()
    }
    
  }
  useEffect(() => {
    getData();
  }, [])
  const changePassword = async (e) => {
    e.preventDefault()
   
    try {
      const res= await ApiService.post('/forgetpass/updatepassword', {
        email: mail,
        password: pass
      })
      if(res.status===200){
        toast.success('Password changed');
        setPass(" ")
        navigate('/')
      }   
    } catch (error) {
      if(error.response.data.status===400){
        toast.error('Invalid user')
      }else{
        toast.error(error.response.data.message);
      }
    }
  }
  return (<>
    {/* {
      OTP ? */}
        <div className='reset-form ' >
        <Typography
                component='h4'
                // variant='overline'
                color={'#ffff'}
                sx={{bgcolor:'#4481eb',width:'10rem',display:'flex',
            borderRadius:'.2rem',justifyContent:'center',height:'3rem',alignItems:'center'
            }}
                // width={}
                >
                    Reset Password
                </Typography>
          {/* <div className='reset-input form-floating'>
            <input type='text' className='form-control' value={pass}
              onChange={(e) => setPass(e.target.value)} />
            <label className='floatingInput'>Enter new password</label> */}

            <TextField sx={{ m: 1, width: '15rem' }}
                    required id="outlined-basic" label="New password" variant="outlined"
                    value={pass} name='password' onChange={(e) => setPass(e.target.value)}
                />
                 <Button onClick={(e) => changePassword(e)}
                variant='contained'
                color='warning'
                >
                    send &nbsp;
                    <SaveAsIcon/>
                    </Button>
            {/* <Button onClick={(e) => changePassword(e)}>change</Button> */}
          {/* </div> */}

        </div>
        {/* :
        <>
          <p>Invalid verification</p>
        </>
    } */}
  </>
  )
}

export default ResetPassword