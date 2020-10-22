import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const navbarItems = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'My Classes',
        path: '/my-classes',
        icon: <FaIcons.FaBookOpen />,
        cName: 'nav-text'
    }, {
        title: 'Profile',
        path: '/profile-consultant',
        icon: <AiIcons.AiFillProfile />,
        cName: 'nav-text'
    }, {
        title: 'Courses',
        path: '/courses',
        icon: <FaIcons.FaGraduationCap />,
        cName: 'nav-text'
    }, {
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