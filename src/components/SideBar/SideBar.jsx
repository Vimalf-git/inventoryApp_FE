import React, { useEffect, useState } from 'react'
import './SideBar.css'
import {
    BsGrid1X2Fill, BsFillArchiveFill,
    BsFillGrid3X3GapFill
} from 'react-icons/bs'
import PostAddIcon from '@mui/icons-material/PostAdd';
import Avatar from '@mui/material/Avatar';
import { Link, NavLink } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { deepPurple,deepOrange } from '@mui/material/colors';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import UseLogout from '../CustomHook/UseLogout'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import BarChartIcon from '@mui/icons-material/BarChart';
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

function SideBar() {
    const logout = UseLogout();
    const [name, setName] = useState("");
    const menu = [
        {
            listName: "DashBoard",
            logo: <BsGrid1X2Fill />,
            path: '/dashboard'

        }, {
            listName: "AddProduct",
            logo: <PostAddIcon />,
            path: '/addproduct'
        }, {
            listName: "Sales",
            logo: <BarChartIcon />,
            path: '/saleschart'
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
                <StyledBadge
                    overlap="circular"
                    variant="dot"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Avatar sx={{ bgcolor: deepOrange[500] }} >{name.charAt(0) + name.charAt(1)}</Avatar>
                </StyledBadge>
                <span className='list-data-con'>{name}</span>
            </div>
            <div className='menuList'>
                {menu.map((e, i) => {
                    return e.listName === "Sign Out" ?
                        <div className='list-data' style={{ color: '#FFFF' }}>
                            <Button onClick={() => logout()} className='signbtn'>
                                <span>{e.logo}</span>&nbsp;
                                &nbsp;<spn className="sidebarListName">{e.listName}</spn>
                            </Button>
                        </div>
                        :
                        <NavLink key={i} className='list-data' to={e.path}
                            style={{ color: '#FFFF', textDecoration: 'none'}}>
                            <span 
                                style={{ marginLeft: '1rem', }}>
                                {e.logo}&nbsp; &nbsp;
                                <span className='list-data-con'>
                                    {e.listName}</span></span>
                        </NavLink>
                })
                }
            </div>
        </div>
    )
}

export default SideBar