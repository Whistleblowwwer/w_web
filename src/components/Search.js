import React, { useState, useEffect } from 'react';
import logoN from '../assets/NavLogo.png';
import proSet from '../assets/Image-40.png';
import logoSe from '../assets/User-35.svg';
import add from '../assets/add-photo.png';
import { useNavigate, useLocation } from 'react-router-dom';

const Search = ({ setAuth }) => {

  const location = useLocation();
  const recentSearches = location.state ? location.state.searchValue : null;
  const [darkMode, setDarkMode] = useState(() => {
    // Inicializa el estado a partir de LocalStorage o usa el valor predeterminado (false)
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });

  useEffect(() => {
    // Actualiza LocalStorage cuando cambia el estado
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navigate = useNavigate();

  const handleButtonClick = (url) => {
    setDarkMode(!darkMode); // Cambia el modo oscuro
    navigate(url, { state: { darkMode } }); // Navega a la siguiente pantalla y pasa el valor de darkMode
  };

  const [name, setName] = useState("");

  useEffect(() => {
    async function getName() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch("http://3.135.121.50:4000/users", requestOptions);
        const parseRes = await response.json();
        setName(parseRes.user.name);
      } catch (err) {
        console.error(err.message);
      }
    }

    getName();

  }, []);

  const [textPost, setText] = useState('');

  const [posts, setPosts] = useState([]);

  const [selectedImages, setSelectedImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [activeButton, setActiveButton] = useState('search');

  const [isTyping, setIsTyping] = useState(false);

  // Agregar un estado para controlar si se muestra el ícono de publicación
  const [showPublishIcon, setShowPublishIcon] = useState(false);

  // Modificar la función que maneja el cambio en el input
  const handleTextChange = (event) => {
    setText(event.target.value);

    // Comprobar si el usuario ha comenzado a escribir
    if (event.target.value.trim() !== '') {
      setIsTyping(true);
      setShowPublishIcon(true); // Mostrar el ícono de publicación
    } else {
      setIsTyping(false);
      setShowPublishIcon(false); // Ocultar el ícono de publicación
    }
  };

  // Modificar la función para hacer la publicación
  const handlePublish = () => {
    if (textPost || selectedImages.length > 0) {
      const newPost = {
        text: textPost,
        images: selectedImages.map((file) => URL.createObjectURL(file)), // Convierte los archivos en URLs de objeto
      };
      setPosts([newPost, ...posts]);
      setText('');
      setSelectedImages([]);
      setShowPublishIcon(false); // Ocultar el ícono de publicación
    } else if (textPost) {
      // Si el usuario ha escrito texto pero no ha seleccionado imágenes
      const newPost = {
        text: textPost,
        images: [],
      };
      setPosts([newPost, ...posts]);
      setText('');
      setSelectedImages([]);
      setShowPublishIcon(false); // Ocultar el ícono de publicación
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  }

  console.log(textPost);

  return (
    <div className={`bg-[#EEEFEF] h-screen w-screen ${darkMode ? 'dark-login-bg' : ''}`}>
      <div className={`bg-[#EEEFEF] h-auto ${darkMode ? 'dark-login-bg' : ''}`}>
        <nav className={`bg-[#FFF] p-4 flex justify-between items-center h-[84px] ${darkMode ? 'dark-register-bg' : ''} navbar margin-rightmove`}>
          <div className="flex items-center ml-6">
            <img src={logoN} alt="Logo" />
          </div>
          <div className="flex items-center space-x-4 mr-[42px]">
            <i className={`fa-solid fa-bell mr-3 ${darkMode ? 'dark-text-white' : ''}`} style={{ fontSize: "18px" }}></i>
            <img src={proSet} alt="Imagen" />
            <p className='ml-3'>{name}</p>
          </div>
        </nav>
        <div className="contain-principal">
          <div className="w-[100%] mt-6 ml-[40px] sidebar1">
            <div className={`margin-top ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
              <button className={activeButton === 'home' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''}
                onClick={() => {
                  setActiveButton('home')
                  navigate("/home");
                }}>
                <p className="ml-4"><i className="fa-solid fa-house mr-3"></i>Home</p>
              </button>
            </div>
            <div className={`margin-top mt-3 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
              <button className={activeButton === 'search' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''} onClick={() => {
                setActiveButton('search');
                navigate("/search");
              }}>
                <p className="ml-4 p-txt"><i className="fa-solid fa-magnifying-glass mr-3"></i>Search</p>
              </button>
            </div>
            <div className={`margin-top mt-3 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
              <button className={activeButton === 'mensajes' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''} onClick={() => {
                setActiveButton('mensajes');
                navigate("/chats");
              }}>
                <p className="ml-4 p-txt"><i className="fa-solid fa-message mr-3"></i>Mensajes</p>
              </button>
            </div>
          </div>
          <div className="w-[190%] mt-6 post-empresa">
            <div className="flex w-[100%]">
              <div className="w-full">
                <div className={`flex items-center rounded-[33.50px] w-[100%] h-[56px] bg-[#FFF] ${darkMode ? 'dark-register-bg' : ''} post-post`}>
                  <i class={`ml-4 fa-solid fa-magnifying-glass ${darkMode ? 'dark-text-white' : ''}`} />
                  <div className="ml-2 relative w-full">
                    <input value={textPost} onChange={handleTextChange} className={`placeholder-black p-2 w-[96%] h-[34px] bg-zinc-100 rounded-[5px] 
                              ${darkMode ? 'dark-login-bg placeholder-black-p' : ''}`}
                      placeholder={recentSearches}
                    />
                  </div>
                </div>
                <div className={`mt-6 p-6 w-[100%] h-auto bg-[#FFF] rounded-[10px] ${darkMode ? 'dark-register-bg' : ''} post-post`}>
                  <h1 className={`text-xl font-bold leading-[18.62px] ${darkMode ? 'dark-text-white' : ''} post-search`}>Personas</h1>
                  <div className='mt-6 flex w-[100%] post-search'>
                    <div className="flex justify-center items-center">
                      <img src={proSet} alt='logo' />
                    </div>
                    <div>
                      <p className={`ml-2 text-neutral-900 text-base font-bold ${darkMode ? 'dark-text-white' : ''}`}>Ximena
                        <br />
                        <span style={{ marginTop: '-1px' }} className={`flex text-neutral-400 text-opacity-75 text-[15px] font-normal leading-[13.96px]`}>@Mena</span>
                      </p>
                    </div>
                    <div>
                      <button className={`ml-[620%] w-[73px] h-[29px] bg-gray-500 rounded-2xl mr-3`}><span className={`flex items-center justify-center text-white text-xs font-medium leading-[11.17px] ${darkMode ? 'dark-text' : ''}`}><i class="fa-solid fa-user"></i></span></button>
                    </div>
                  </div>
                  <p className={`mt-2 ml-10 w-[100%] ${darkMode ? 'dark-text-white' : ''} search-txt`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc ultrices est in lectus laoreet, interdum sodales ex posuere.
                    Aliquam molestie auctor tortor ut pharetra.</p>

                  <div className='mt-6 flex w-[100%] post-search'>
                    <div className="flex justify-center items-center">
                      <img src={proSet} alt='logo' />
                    </div>
                    <div>
                      <p className={`ml-2 text-neutral-900 text-base font-bold ${darkMode ? 'dark-text-white' : ''}`}>Ximena
                        <br />
                        <span style={{ marginTop: '-1px' }} className={`flex text-neutral-400 text-opacity-75 text-[15px] font-normal leading-[13.96px]`}>@Mena</span>
                      </p>
                    </div>
                    <div>
                      <button className={`ml-[620%] w-[73px] h-[29px] bg-neutral-900 rounded-2xl mr-3 ${darkMode ? 'dark-button' : ''}`}><span className={`flex items-center justify-center text-white text-xs font-medium leading-[11.17px] ${darkMode ? 'dark-text' : ''}`}><i class="fa-solid fa-user-plus"></i></span></button>
                    </div>
                  </div>
                  <p className={`mt-2 ml-10 w-[100%] ${darkMode ? 'dark-text-white' : ''} search-txt`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc ultrices est in lectus laoreet, interdum sodales ex posuere.
                    Aliquam molestie auctor tortor ut pharetra.</p>

                  <div className='mt-6 flex w-[100%] post-search'>
                    <div className="flex justify-center items-center">
                      <img src={proSet} alt='logo' />
                    </div>
                    <div>
                      <p className={`ml-2 text-neutral-900 text-base font-bold ${darkMode ? 'dark-text-white' : ''}`}>Ximena
                        <br />
                        <span style={{ marginTop: '-1px' }} className={`flex text-neutral-400 text-opacity-75 text-[15px] font-normal leading-[13.96px]`}>@Mena</span>
                      </p>
                    </div>
                    <div>
                      <button className={`ml-[620%] w-[73px] h-[29px] bg-neutral-900 rounded-2xl mr-3 ${darkMode ? 'dark-button' : ''}`}><span className={`flex items-center justify-center text-white text-xs font-medium leading-[11.17px] ${darkMode ? 'dark-text' : ''}`}><i class="fa-solid fa-user-plus"></i></span></button>
                    </div>
                  </div>
                  <p className={`mt-2 ml-10 w-[100%] ${darkMode ? 'dark-text-white' : ''} search-txt`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc ultrices est in lectus laoreet, interdum sodales ex posuere.
                    Aliquam molestie auctor tortor ut pharetra.</p>
                  <p className={`mt-2 underline cursor-pointer ${darkMode ? 'dark-text-white' : ''} post-search`}>Ver todo</p>
                </div>
              </div>
              <div className="flex flex-col ml-6 mr-3 respohidden">
                <div className={`w-[150%] h-[auto] bg-[#FFF] border ${darkMode ? 'dark-register-bg' : ''}`}>
                  <div className='flex mt-5 mb-1 justify-between'>
                    <h1 className={`ml-5 text-neutral-900 text-lg font-bold leading-none ${darkMode ? 'dark-text-white' : ''}`}>Filtros</h1>
                    <i class={`fa-solid fa-sliders mr-8 ${darkMode ? 'dark-text-white' : ''}`}></i>
                  </div>
                  <div className={`ml-5 mt-6 w-[232px] h-[0px] border border-neutral-900 ${darkMode ? 'dark-border-white' : ''}`}></div>
                  <h1 className={`mt-5 ml-5 mb-3 text-neutral-900 text-lg font-bold leading-none ${darkMode ? 'dark-text-white' : ''}`}>About</h1>
                  <div className="flex justify-between">
                    <p className={`ml-5 w-[230px] text-neutral-900 text-[15px] font-normal leading-[13.96px] ${darkMode ? 'dark-text-white' : ''}`}>Cualquiera</p>
                    <input className='mr-8' type='radio' name='About' value="C" />
                  </div>
                  <div className="flex mt-3 justify-between">
                    <p className={`ml-5 w-[230px] text-neutral-900 text-[15px] font-normal leading-[13.96px] ${darkMode ? 'dark-text-white' : ''}`}>Personas a las que sigues</p>
                    <input className='mr-8' type='radio' name='About' value="F" />
                  </div>
                  <h1 className={`mt-5 ml-5 mb-3 text-neutral-900 text-lg font-bold leading-none ${darkMode ? 'dark-text-white' : ''}`}>Ubicación</h1>
                  <div>
                    <div className="flex justify-between">
                      <p className={`ml-5 w-[230px] text-neutral-900 text-[15px] font-normal leading-[13.96px] ${darkMode ? 'dark-text-white' : ''}`}>En cualquier lugar</p>
                      <input className='mr-8' type='radio' name='Ubicacion' value="CL" />
                    </div>
                    <div className="flex mt-3 justify-between mb-4">
                      <p className={`ml-5 w-[230px] text-neutral-900 text-[15px] font-normal leading-[13.96px] ${darkMode ? 'dark-text-white' : ''}`}>Cerca de ti</p>
                      <input className='mr-8' type='radio' name='Ubicacion' value="T" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className={`bg-[#FFF] w-[100%] h-[6%] flex bottombar ${darkMode ? 'dark-bg' : ''}`}>
        <div className="flex justify-around items-center mt-3">
          <i class={`fa-solid fa-house ${darkMode ? 'dark-text-white' : ''} text-[130%] iconeres`} onClick={() => navigate("/home")}></i>
          <i class={`fa-solid fa-magnifying-glass ${darkMode ? 'dark-text-white' : ''} text-[130%] iconeres`} onClick={() => navigate("/search")}></i>
          <i class={`fa-solid fa-message ${darkMode ? 'dark-text-white' : ''} text-[130%] iconeres`} onClick={() => navigate("/chats")}></i>
        </div>
      </div>
    </div>
  );
};

export default Search;

