import React, { useEffect, useState } from 'react'
import './SideBar.css'
import {
     BsGrid1X2Fill, BsFillArchiveFill,
    BsFillGrid3X3GapFill
} from 'react-icons/bs'
import PostAddIcon from '@mui/icons-material/PostAdd';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { deepPurple } from '@mui/material/colors';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import UseLogout from '../CustomHook/UseLogout'
function SideBar() {
    const logout = UseLogout();
    const [name, setName] = useState("");
    const menu = [
        {
            listName: "DashBoard",
            logo: <BsGrid1X2Fill />,
            path: '/dashboard'

        }, {
            listName: "Add Product",
            logo: <PostAddIcon />,
            path: '/addproduct'
        }, {
            listName: "Product",
            logo: <BsFillArchiveFill />,
            path: '/product'
        }, {
            listName: "Category",
            logo: <BsFillGrid3X3GapFill />,
            path: '/category'
        },
        {
            listName: "Sign Out",
            logo: <ExitToAppIcon />,
        }
    ]
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setName(jwtDecode(token).username)
        // console.log(jwtDecode(token).username);
    }, [])
    return (
        <div className='sidebar'>
            <div className='avatarSection'>
                <Avatar sx={{ bgcolor: deepPurple[500] }} >{name.charAt(0) + name.charAt(1)}</Avatar>
                <span>{name}</span>
            </div>
            <div className='menuList'>
                {menu.map((e, i) => {
                    return e.listName === "Sign Out" ?
                        <div className='list-data' style={{ color: '#FFFF' }}>
                            <Button onClick={() => logout()} className='signbtn'>
                                {e.logo}&nbsp; &nbsp;{e.listName}
                            </Button>
                         </div>
                        :
                        <Link key={i} className='list-data' to={e.path} style={{ color: '#FFFF', textDecoration: 'none' }}>
                            <span className='list-data-con' style={{ marginLeft: '1rem' }}>{e.logo}&nbsp; &nbsp;{e.listName}</span>
                        </Link>
                })
                }
            </div>
        </div>
    )
}

export default SideBar