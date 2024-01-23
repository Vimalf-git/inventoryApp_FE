import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify';
// import ApiService from '../../Common/ApiService';
import resetPassImg from '../../assets/resetImg.svg'
import { Button, TextField } from '@mui/material';
import {PublishedWithChanges } from '@mui/icons-material';
import './ResetPassword.css'
import ApiService from '../../Common/ApiService';
function ResetPassword() {
    const navigate = useNavigate();
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [searchParam, setSearchparam] = useSearchParams();
    const token = searchParam.get('emailtoken');
    const id = searchParam.get('id');
    const getData = async () => {

        try {
            let res = await ApiService.get(`forgetpass/getres/${id}/${token}`)
            if (res.status === 200) {
                setMail(res.data.mail)
                toast.success("verified");
            } else {
                toast.error("invalid token")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
        getData();
    }, [])
    const changePassword = async (e) => {
        // e.preventDefault()
        try {
            const res = await ApiService.post('/forgetpass/updatepassword', {
                email: mail,
                password: pass
            })
            if (res.status === 200) {
                setPass(" ")
                navigate('/')
                toast.success('Password changed');
            }
        } catch (error) {
            if (error.response.data.status === 400) {
                navigate('/forget')
                toast.error('Invalid user')
            } else {
                navigate('/forget')
                toast.error(error.response.data.message);
            }
        }
    }
    return (<>
        <div className='resetPass'>
            {/* */}
            <div className='resetPass-l'>
                <img className='resetPassImg' src={resetPassImg}/>
            </div>
            <div className='resetPass-r'>
                <h1>
                    Reset Password
                </h1>
                <TextField sx={{ m: 1, width: '15rem' }}
                    required id="outlined-basic" label="Password" variant="outlined"
                    value={pass} name='pass' onChange={(e) => setPass(e.target.value)}
                />
                <Button onClick={() => { changePassword() }}
                    variant='contained'
                // color=''
                >
                    Change &nbsp;<PublishedWithChanges />
                    {/* <SendIcon /> */}
                </Button>
            </div>

        </div>
    </>
    )
}

export default ResetPassword