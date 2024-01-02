import React, { useState, useEffect } from 'react';
import logoN from '../assets/NavLogo.png';
import proSet from '../assets/Image-40.png';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

function Settings() {

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    
    const navigate = useNavigate();

    const [activeButton, setActiveButton] = useState('settings');

    const [activeButtonCon, setActiveButtonCon] = useState('tucuen');

    const [darkMode, setDarkMode] = useState(() => {
        // Inicializa el estado a partir de LocalStorage o usa el valor predeterminado (false)
        return JSON.parse(localStorage.getItem('darkMode')) || false;
    });

    const [divsVisibility, setDivsVisibility] = useState({
        tucuen: true,
        seguridad: false,
        privacidad: false,
        notificaciones: false,
        accesibilidad: false,
    });

    const handleButtonClick = (buttonName) => {
        setActiveButtonCon(buttonName);
        setDivsVisibility((prevVisibility) => {
            const updatedVisibility = { ...prevVisibility };
            for (const key in updatedVisibility) {
                updatedVisibility[key] = key === buttonName;
            }
            return updatedVisibility;
        });
    };
    
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
            <div className="contain-principal">
                <div className="w-[60%] mt-6 ml-[40px] sidebar1">
                <div className={`margin-top ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                <button className={activeButton === 'home' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''} 
                    onClick={() => {
                    setActiveButton('home');
                    navigate("/home");
                    }}>
                    <p className="ml-4 p-txt"><i className="p-fa fa-solid fa-house mr-3"></i>Home</p>
                </button>
                </div>
                <div className={`margin-top mt-3 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                <button className={activeButton === 'search' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''} 
                    onClick={() => {
                    setActiveButton('search');
                    navigate("/search");
                    }}>
                    <p className="ml-4 p-txt"><i className="p-fa fa-solid fa-magnifying-glass mr-3"></i>Search</p>
                </button> 
                </div>
                <div className={`margin-top mt-3 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                <button className={activeButton === 'mensajes' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''} onClick={() => {
                    setActiveButton('mensajes');
                    navigate("/chats");
                    }}>
                    <p className="ml-4 p-txt"><i className="p-fa fa-solid fa-message mr-3"></i>Mensajes</p>
                </button>
                </div>
                <div className={`margin-top mt-3 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                <button className={activeButton === 'settings' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''} onClick={() => {
                    setActiveButton('settings');
                    navigate("/settings");
                    }}>
                    <p className="ml-4 p-txt"><i className="p-fa fa-solid fa-gear mr-3"></i>Configuracion</p>
                </button>
                </div>
            </div>
                <div className="w-[60%] mt-6">
                    <p className={`text-xl font-bold leading-[18.62px] ${darkMode ? 'dark-text-white' : ''}`}>Configuración</p>
                    <div className={`margin-top mt-3 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                    <button className={activeButtonCon === 'tucuen' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''} onClick={() => {
                        setActiveButtonCon('tucuen');
                        }}>
                        <p className="ml-4 p-txt">Tu cuenta<i class="ml-[200px] mt-1 fa-solid fa-chevron-right"></i></p>
                    </button>
                    </div>
                    <div className={`margin-top mt-3 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                    <button className={activeButtonCon === 'seguridad' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''} onClick={() => {
                        setActiveButtonCon('seguridad');
                        }}>
                        <p className="ml-4 p-txt">Seguridad y acceso a la cuenta<i class="ml-8 mt-1 fa-solid fa-chevron-right"></i></p>
                    </button>
                    </div>
                    <div className={`margin-top mt-3 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                    <button className={activeButtonCon === 'privacidad' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''} onClick={() => {
                        setActiveButtonCon('privacidad');
                        }}>
                        <p className="ml-4 p-txt">Privacidad y seguridad<i class="ml-[97px] mt-1 fa-solid fa-chevron-right"></i></p>
                    </button>
                    </div>
                    <div className={`margin-top mt-3 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                    <button className={activeButtonCon === 'notificaciones' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''} onClick={() => {
                        setActiveButtonCon('notificaciones');
                        }}>
                        <p className="ml-4 p-txt">Notificaciones<i class="ml-[165px] mt-1 fa-solid fa-chevron-right"></i></p>
                    </button>
                    </div>
                    <div className={`margin-top mt-3 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                    <button className={activeButtonCon === 'acceses' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''} onClick={() => {
                        setActiveButtonCon('acceses');
                        }}>
                        <p className="ml-4 p-txt">Accesibilidad, pantalla e idiomas<i class="ml-4 mt-1 fa-solid fa-chevron-right"></i></p>
                    </button>
                    </div>
                </div>
                <div className="w-[100%] mt-6">
                    {activeButtonCon === 'tucuen' && (
                        <div className="w-[100%] mt-6">
                            <p className={`text-xl font-bold leading-[18.62px] ${darkMode ? 'dark-text-white' : ''}`}>Tu cuenta</p>
                                <p className={`mt-4 w-[80%] text-[14px] font-medium leading-[10.71px] ${darkMode ? 'dark-text-white' : ''}`}>Ve la información de la cuenta, descarga un archivo con tus datos u obtén más información acerca de las opciones de desactivación de la cuenta</p>
                                <div className={`w-[100%] margin-top mt-3 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                                <button className={activeButtonCon === 'seguridad' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''} >
                                    <p className="mr-[58%] p-txt">Información de la cuenta<i class="ml-8 mt-1 fa-solid fa-chevron-right"></i></p>
                                    <p className='ml-1 text-[12px] font-medium leading-[10.71px]'>Ve la información de tu cuenta, como el número de teléfono y la dirección de correo electrónico.</p>
                                </button>
                                </div>
                                <div className={`w-[100%] margin-top mt-3 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                                <button className={activeButtonCon === 'seguridad' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''} >
                                    <p className="mr-[22%] p-txt">Cambia tu contraseña<i class="ml-8 mt-1 fa-solid fa-chevron-right"></i></p>
                                    <p className='ml-1 text-[12px] font-medium leading-[10.71px]'>Cambia tu contraseña en cualquier momento.</p>
                                </button>
                                </div>
                                <div className={`w-[100%] margin-top mt-3 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                                <button className={activeButtonCon === 'seguridad' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''}>
                                    <p className="mr-[28%] p-txt">Elimina tu cuenta<i class="ml-8 mt-1 fa-solid fa-chevron-right"></i></p>
                                    <p className='ml-1 text-[12px] font-medium leading-[10.71px]'>Averigua cómo puedes eliminar tu cuenta</p>
                                </button>
                                </div>
                        </div>
                    )}
                    {activeButtonCon === 'seguridad' && (
                        <div>
                            <p className={`text-xl font-bold leading-[18.62px] ${darkMode ? 'dark-text-white' : ''}`}>Seguridad</p>
                        </div>
                    )}
                    {activeButtonCon === 'privacidad' && (
                        <div>
                           <p className={`text-xl font-bold leading-[18.62px] ${darkMode ? 'dark-text-white' : ''}`}>Privacidad</p>
                        </div>
                    )}
                    {activeButtonCon === 'notificaciones' && (
                        <div>
                            <p className={`text-xl font-bold leading-[18.62px] ${darkMode ? 'dark-text-white' : ''}`}>Notificaciones</p>
                        </div>
                    )}
                    {activeButtonCon === 'acceses' && (
                        <div>
                            <p className={`text-xl font-bold leading-[18.62px] ${darkMode ? 'dark-text-white' : ''}`}>Accesibilidad</p>
                            <div className="mt-3 margin-top">
                            <button className="toggle-dark-mode" onClick={toggleDarkMode}>
                                {darkMode ? (
                                    <>
                                    <p className='text-white'>Desactivar Dark Mode <i className="fa-solid fa-moon text-white"></i></p>
                                    </>
                                ) : (
                                    <>
                                    <p className='text-neutral-900'>Activar Dark Mode <i className="fa-regular fa-moon"></i></p>
                                    </>
                                )}
                            </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Settings;
