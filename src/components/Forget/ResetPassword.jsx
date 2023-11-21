import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import ApiService from '../../common/ApiService';
import { UserDetailContext } from './UserDetailContext';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import './ForgetPass.css'
import { Button, TextField, Typography } from '@mui/material';

function ResetPassword() {
    const navigate = useNavigate();
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
        }

    }
    useEffect(() => {
        getData();
    }, [])
    const changePassword = async (e) => {
        e.preventDefault()
        try {
            const res = await ApiService.post('/forgetpass/updatepassword', {
                email: mail,
                password: pass
            })
            if (res.status === 200) {
                toast.success('Password changed');
                setPass(" ")
                navigate('/')
            }
        } catch (error) {
            if (error.response.data.status === 400) {
                toast.error('Invalid user')
            } else {
                toast.error(error.response.data.message);
            }
        }
    }
    return (<>
        <div className='reset-form ' >
            <Typography
                component='h4'
                color={'#ffff'}
                sx={{
                    bgcolor: '#4481eb', width: '10rem', display: 'flex',
                    borderRadius: '.2rem', justifyContent: 'center', height: '3rem', alignItems: 'center'
                }}
            >
                Reset Password
            </Typography>
            <TextField sx={{ m: 1, width: '15rem' }}
                required id="outlined-basic" label="New password" variant="outlined"
                value={pass} name='password' onChange={(e) => setPass(e.target.value)}
            />
            <Button onClick={(e) => changePassword(e)}
                variant='contained'
                color='warning'
            >
                send &nbsp;
                <SaveAsIcon />
            </Button>
        </div>
    </>
    )
}

export default ResetPassword