import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '../assets/w_logo.svg'
import google from '../assets/Group 3.svg'

function Begin() {
  const [showComingSoon] = useState(true)

  const [darkMode, setDarkMode] = useState(() => {
    // Inicializa el estado a partir de LocalStorage o usa el valor predeterminado (false)
    return JSON.parse(localStorage.getItem('darkMode')) || false
  })

  useEffect(() => {
    // Actualiza LocalStorage cuando cambia el estado
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const navigate = useNavigate()

  const handleButtonClick = (url) => {
    setDarkMode(!darkMode) // Cambia el modo oscuro
    navigate(url, { state: { darkMode } }) // Navega a la siguiente pantalla y pasa el valor de darkMode
  }

  return (
    <div
      className={`contain-begin overflow-y-hidden flex justify-center items-center h-screen w-screen ${darkMode ? 'dark-register-bg' : ''}`}
    >
      <div className={`flex justify-center items-center h-screen ${darkMode ? 'dark-register-bg' : ''}`}>
        {showComingSoon && (
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
            <div className='absolute top-0 left-0 w-full h-full bg-[#FFF] opacity-100'></div>
            <div className={`z-50 p-4 w-auto flex flex-col justify-center items-center ${darkMode ? 'dark-register-bg' : ''}`}>
              <img src={logo} alt='logo' className='w-[30%]' />
              <p className='text-[80px] font-bold'>COMING SOON..</p>
            </div>
          </div>
        )}

        <div className='contain-principal-begin flex ml-[12%]'>
          <div className='w-[50%] relative p-4 mt-20 imagenresponb'>
            <img src={logo} alt='logo' className='max-w-full' />
          </div>

          <div className='w-1/2 p-4 flex flex-col contain-principal-begin'>
            <h1 className={`w-[580px] text-neutral-900 text-[70px] font-bold leading-[88px] mb-8 ${darkMode ? 'dark-text-white' : ''}`}>
              Lorem ipsum <br /> dolor sit amet
            </h1>
            <h2 className={`text-neutral-900 text-[25px] font-semibold leading-normal ${darkMode ? 'dark-text-white' : ''}`}>Únete hoy</h2>
            <button
              className={`hover:bg-gray-700 py-2 px-4 mt-4 w-[280px] h-[41px] bg-neutral-900 rounded-[44px] relative ${
                darkMode ? 'dark-button' : ''
              }`}
            >
              <img src={google} alt='google' className='w-4.5 h-4.5 mr-2 absolute left-10 top-1/2 transform -translate-y-1/2' />

              <span className={`text-stone-50 text-[15px] font-medium leading-[13.96px] pl-6 ${darkMode ? 'dark-text' : ''}`}>
                Registrase con Google
              </span>
            </button>
            <button
              className={`hover:bg-gray-700 py-2 px-4 mt-4 w-[280px] h-[41px] bg-neutral-900 rounded-[44px] relative ${
                darkMode ? 'dark-button' : ''
              }`}
              onClick={() => handleButtonClick('/register')}
            >
              <span className={`text-stone-50 text-[15px] font-medium leading-[13.96px] ${darkMode ? 'dark-text' : ''}`}>Crear cuenta</span>
            </button>
            <p className={`text-neutral-900 text-[12px] font-medium mt-4 ${darkMode ? 'dark-text-white' : ''}`}>
              Al registrarte, aceptas los <span className='underline'>Términos de legales</span> y la{' '}
              <span className='underline'>
                Política
                <br /> de privacidad,
              </span>{' '}
              incluida la política de <span className='underline'>Uso de Cookies.</span>
            </p>
            <br />
            <p className={`text-neutral-900 text-lg font-medium leading-none ${darkMode ? 'dark-text-white' : ''}`}>
              ¿Ya tienes una cuenta?
            </p>
            <button
              className={`hover:bg-gray-200 py-2 px-4 mt-4 w-[280px] h-[41px] border border-neutral-900 rounded-[44px] relative" ${
                darkMode ? 'dark-button-login' : ''
              }`}
              onClick={() => handleButtonClick('/login')}
            >
              <span className={`text-neutral-900 text-[15px] font-medium leading-[13.96px] ${darkMode ? 'dark-text-white' : ''}`}>
                Iniciar sesión
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Begin
