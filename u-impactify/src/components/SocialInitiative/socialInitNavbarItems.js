import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const navbarItems = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Add Positions',
        path: '/add_position',
        icon: <IoIcons.IoIosGlobe />,
        cName: 'nav-text'
    }, {
        title: 'Our Positions',
        path: '/my_positions',
        icon: <IoIcons.IoIosGlobe />,
        cName: 'nav-text'
    },{
        title: 'Settings',
        path: '/settings',
        icon: <IoIcons.IoIosSettings />,
        cName: 'nav-text'
    }, {
        title: 'Logout',
        path: '/',
        icon: <AiIcons.AiOutlineLogout />,
        cName: 'nav-text'
    },
]