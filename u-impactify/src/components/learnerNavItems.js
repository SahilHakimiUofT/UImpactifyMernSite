import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const learnerItems = [
    {
        title: 'Dashboard',
        path: '/',
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
        path: '/profile-learner',
        icon: <AiIcons.AiFillProfile />,
        cName: 'lnav-text'
    }, {
        title: 'Courses',
        path: '/courses',
        icon: <FaIcons.FaGraduationCap />,
        cName: 'lnav-text'
    }, {
        title: 'Oppurtunities',
        path: '/oppurtunities',
        icon: <IoIcons.IoIosGlobe />,
        cName: 'lnav-text'
    }, {
        title: 'Settings',
        path: '/settings',
        icon: <IoIcons.IoIosSettings />,
        cName: 'lnav-text'
    }, {
        title: 'Logout',
        path: '/logout',
        icon: <AiIcons.AiOutlineLogout />,
        cName: 'lnav-text'
    },
]