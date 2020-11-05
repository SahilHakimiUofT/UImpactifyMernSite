import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const learnerItems = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        cName: 'lnav-text'
    },
    {
        title: 'My Classes',
        path: '/my-classes',
        icon: <FaIcons.FaBookOpen />,
        cName: 'lnav-text'
    }, {
        title: 'Profile',
        path: '/profile',
        icon: <AiIcons.AiFillProfile />,
        cName: 'lnav-text'
    }, {
        title: 'Courses',
        path: '/all-courses',
        icon: <FaIcons.FaGraduationCap />,
        cName: 'lnav-text'
    }, {
        title: 'Opportunities',
        path: '/opportunities',
        icon: <IoIcons.IoIosGlobe />,
        cName: 'lnav-text'
    }, {
        title: 'Settings',
        path: '/settings',
        icon: <IoIcons.IoIosSettings />,
        cName: 'lnav-text'
    }, {
        title: 'Logout',
        path: '/',
        icon: <AiIcons.AiOutlineLogout />,
        cName: 'lnav-text'
    },
]