import React, { useState, useEffect } from 'react';
import logoN from '../assets/NavLogo.png';
import proSet from '../assets/Image-40.png';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Search from './Search';

function Chats() {

    const [activeButton, setActiveButton] = useState('settings');

    const [search, setSearch] = useState('');

    const [activeButtonCon, setActiveButtonCon] = useState('tucuen');

    const [darkMode, setDarkMode] = useState(() => {
        // Inicializa el estado a partir de LocalStorage o usa el valor predeterminado (false)
        return JSON.parse(localStorage.getItem('darkMode')) || false;
    });

    useEffect(() => {
        // Actualiza LocalStorage cuando cambia el estado
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <div className={`bg-[#EEEFEF] h-screen w-screen ${darkMode ? 'dark-login-bg' : ''}`}>
            <div className={`bg-[#EEEFEF] h-auto ${darkMode ? 'dark-login-bg' : ''}`}>
                <nav className={`bg-[#FFF] p-4 flex justify-between items-center h-[84px] ${darkMode ? 'dark-register-bg' : ''} navbar margin-rightmove`}>
                    <div className="flex items-center ml-6">
                        <img src={logoN} alt="Logo" />
                    </div>
                    <div className="flex items-center space-x-4 mr-[42px]">
                        <i className={`fa-solid fa-bell mr-3 ${darkMode ? 'dark-text-white' : ''}`} style={{ fontSize: "18px" }}></i>
                        <img src={proSet} alt="Imagen" className="cursor-pointer" />
                        <p className={`${darkMode ? 'dark-text-white' : ''}`}></p>
                    </div>
                </nav>
                <div className='contain-principal w-screen h-screen'>
                    <div className='w-[23%] pt-6 pl-6'>
                        <div className='flex justify-between items-center'>
                            <p className='text-neutral-900 text-3xl font-bold leading-7'>Chats</p>
                            <i className="fa-regular fa-pen-to-square mr-7" style={{ fontSize: "20px" }} />
                        </div>
                        <div className='mt-4 flex items-center'>
                            <div className={`relative placeholder-black p-2 w-[96%] h-[38px] bg-[#FFF] rounded-2xl ${darkMode ? 'dark-login-bg placeholder-black-p' : ''}`}>
                                <i className="p-fa fa-solid fa-magnifying-glass mr-2 ml-2 relative" />
                                <input placeholder="Buscar en chats" className='w-[85%] h-[120%]' style={{ outline: 'none', border: 'none' }} />
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#141414] w-[1px]' />
                    <div className='w-[77%] flex justify-center items-center'>
                        <p className='text-neutral-900 text-[25px] font-semibold leading-normal'>No hay ningún chat seleccionado</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats
