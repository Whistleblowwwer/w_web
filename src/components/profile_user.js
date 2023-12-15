import React, { useState, useEffect } from 'react';
import logoN from '../assets/NavLogo.png';
import proSet from '../assets/Image-40.png';
import Location from '../assets/Location.svg';
import Like from '../assets/Like.svg';
import Comment from '../assets/Comment Review.svg';
import Liked from '../assets/IsLiked.svg';
import paginaEmpre from '../assets/CTA.svg';
import Share from '../assets/Send.svg';
import { useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
import NewPostModal from '../auxComponents/NewPostModal';
import NewCommentModal from '../auxComponents/NewCommentModal';
import UpdateProfileModal from '../auxComponents/UpdateProfileModal';
import { differenceInMilliseconds, differenceInHours, differenceInDays, differenceInMonths, format, parseISO } from 'date-fns';

const Profile_user = ({ setAuth }) => {

  //search variables
  const [showResults, setShowResults] = useState(false);
  const [search, setSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);


  //editable variables
  const [editable, setEditable] = useState("");

  //user variables
  const location = useLocation();
  const users = location.state ? location.state.users : null;
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "",
    address: "",
    entity: "",
    country: "",
    state: "",
    city: "",
    category: "",
  });


  //post variables
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [textPost, setText] = useState('');
  const [textPost2, setText2] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  //comments variables
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [textComment, setTextComment] = useState('');
  const [idReviewComment, setIdReviewComment] = useState('')

  //general variables
  const [activeButton, setActiveButton] = useState('home');
  const [activeTabView, setActiveTabView] = useState('reseñas');
  const [darkMode, setDarkMode] = useState(() => {
    // Inicializa el estado a partir de LocalStorage o usa el valor predeterminado (false)
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });
  const [isTyping, setIsTyping] = useState(false);
  const [showPublishIcon, setShowPublishIcon] = useState(false);
  const [name, setName] = useState([]);
  const [userDetail, setUserDetail] = useState("");
  const [postes, setPostes] = useState([]);
  const navigate = useNavigate();

  const maxLength = 1200;

    const formatDate = (createdAt) => {
      const parsedDate = parseISO(createdAt);
      const currentDate = new Date();
      const millisecondsDifference = differenceInMilliseconds(currentDate, parsedDate);
      const secondsDifference = Math.floor(millisecondsDifference / 1000);
      const hoursDifference = differenceInHours(currentDate, parsedDate);
      const daysDifference = differenceInDays(currentDate, parsedDate);
      const monthsDifference = differenceInMonths(currentDate, parsedDate);

      if (secondsDifference < 60) {
        return `${secondsDifference}s`;
      } else if (hoursDifference < 24) {
        return `${hoursDifference}h`;
      } else if (daysDifference < 30) {
        return `${daysDifference}d`;
      } else {
        return `${monthsDifference}m`;
      }
    };

  const handleUserClick = async (users) => {
    const newRecentSearches = [search, ...recentSearches.slice(0, 3)]; // Guardar los últimos 4 términos
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    navigate(`/${users.name}`, { state: { users } });
  };

  const handlePostModal = () => {
    setPostModalOpen(!postModalOpen);
  };

  const handlePostTextChange = (event) => {
    setText(event.target.value);
    if (event.target.value.trim() !== '') {
      setIsTyping(true);
      setShowPublishIcon(true);
    } else {
      setIsTyping(false);
      setShowPublishIcon(false);
    }
  };
  console.log("commnent text", textComment)
  const handleTextCommnetChange = (event) => {
    setTextComment(event.target.value);
    if (event.target.value.trim() !== '') {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  const handleCommentClick = (_id_review) => {
    setIdReviewComment(_id_review)
    setCommentModalOpen(!commentModalOpen)
    console.log("Comment clicked!")
    console.log("Comment modal status => ", commentModalOpen)
  }

  const handleTextChange2 = (event) => {
    setText2(event.target.value);
    if (event.target.value.trim() !== '') {
      setIsTyping(true);
      setShowPublishIcon(true);
    } else {
      setIsTyping(false);
      setShowPublishIcon(false);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", profileForm);
    setUpdateModalOpen(false);
  };

  const handleChangeUpdateProfile = (e) => {
    console.log("re-remder here!");

    const { name, value } = e.target;
    setProfileForm((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const handleNewUpdateModal = () => {
    setUpdateModalOpen(!updateModalOpen);
  };

  const handleCreateUpdateProfile = () => {
    async function updateProfile() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(profileForm),
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `http://3.135.121.50:4000/users?_id_user=${users._id_user}`,
          requestOptions
        );
        const parseRes = await response.json();
        console.log(parseRes);
      } catch (err) {
        console.error(err.message);
      }
    }
    setUpdateModalOpen(!updateModalOpen);
    updateProfile();
  };

  const handleBusinessClick = async (business) => {
    const newRecentSearches = [search, ...recentSearches.slice(0, 3)]; // Guardar los últimos 4 términos
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    setShowResults(false);
    navigate(`/empresa/${business.name}`, { state: { business } });
  };

  const handleReview = async (reviewValue) => {
    navigate(`/review/${reviewValue._id_review}`, { state: { reviewValue } });
  }

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    async function getPostes() {
      try {
        if (users && users._id_user) {
          const myHeaders = new Headers();
          myHeaders.append("authorization", `Bearer ${localStorage.token}`);
  
          const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };
  
          const response = await fetch(`http://3.135.121.50:4000/users/reviews?_id_user=${users._id_user}`, requestOptions);
          const parseRes = await response.json();
  
          // Check if 'reviews' property exists before setting the state
          if (parseRes.reviews) {
            setPostes(parseRes.reviews);
          } else {
            console.warn("El objeto business no tiene la propiedad 'reviews'");
          }
        } else {
          console.error("El objeto business no tiene la propiedad _id_user");
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  
    getPostes();
  }, [users]);

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
        const response = await fetch(
          "http://3.135.121.50:4000/users",
          requestOptions
        );
        const parseRes = await response.json();
        setName(parseRes.user);
      } catch (err) {
        console.error(err.message);
      }
    }
    getName();
  }, []);

  useEffect(() => {
    async function getUserDetail() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(`http://3.135.121.50:4000/users/?_id_user=${users._id_user}`, requestOptions);
        const parseRes = await response.json();
        setUserDetail(parseRes.user);
        console.log(parseRes.user);
      } catch (err) {
        console.error(err.message);
      }
    }
    getUserDetail();

  }, []);

  useEffect(() => {
    const getEditable = () => {
      if (name.name == userDetail.name) {
        setEditable("true");
      } else {
        setEditable("false");
      }
      console.log(editable);
    };
    getEditable();
  }, [name, users.name, editable]);

  const addPost = () => {
    if (textPost || selectedImages.length > 0) {
      const newPost = {
        text: textPost,
        images: selectedImages.map((file) => URL.createObjectURL(file)),
      };
      setPosts([newPost, ...posts]);
      setText('');
      setSelectedImages([]);
      handlePostModal();
    } else if (textPost || selectedImages.length <= 0) {
      const newPost = {
        text: textPost,
        images: [],
      };
      setPosts([newPost, ...posts]);
      setText('');
      handlePostModal();
    }
  };

  const addPost2 = () => {
    if (textPost2 || selectedImages.length > 0) {
      const newPost = {
        text: textPost2,
        images: selectedImages.map((file) => URL.createObjectURL(file)),
      };
      setPosts([newPost, ...posts]);
      setText2('');
      setSelectedImages([]);
      setShowPublishIcon(false);
      handlePostModal();
    } else if (textPost2 || selectedImages.length <= 0) {
      const newPost = {
        text: textPost2,
        images: [],
      };
      setPosts([newPost, ...posts]);
      setText2('');
      handlePostModal();
      setShowPublishIcon(false);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  }

  const handleLike = (_id_review) => {
    console.log("Liked - ID => ", _id_review)
    async function postLike() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
      };

      try {
        const url = `http://3.135.121.50:4000/users/reviews/like/?_id_review=${_id_review}`;
        const response = await fetch(url, requestOptions);
        const parseRes = await response.json();
      } catch (err) {
        console.error(err.message);
      }
    }
    postLike();
  }

  const handleComment = () => {
    console.log("comment - ID => ", idReviewComment)
    async function postComment() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);
      console.log("content", textComment)
      var raw = JSON.stringify({
        "content": textComment,
        "_id_review": idReviewComment,
      });
      console.log("idreviww", idReviewComment)

      console.log("raw", raw)


      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      try {
        const response = await fetch("http://3.135.121.50:4000/comments", requestOptions);
      } catch (err) {
        console.error(err.message);
      }
    }
    postComment();
  }

  return (
    <div className={`bg-[#EEEFEF] h-screen w-screen ${darkMode ? 'dark-login-bg' : ''}`}>
      {postModalOpen && (
        <NewPostModal
          handlePostModal={handlePostModal}
          darkMode={darkMode}
          proSet={proSet}
          handleTextChange={handlePostTextChange}
          textPost={textPost}
          maxLength={maxLength}
          setSelectedImages={setSelectedImages}
          setShowPublishIcon={setShowPublishIcon}
          addPost={addPost}
        />
      )}
      {commentModalOpen && (
        <NewCommentModal
          handleCommentModal={handleCommentClick}
          darkMode={darkMode}
          proSet={proSet}
          handleTextCommentChange={handleTextCommnetChange}
          textComment={textComment}
          maxLength={maxLength}
          addComment={handleComment}
        />
      )}
      {updateModalOpen && (
        <UpdateProfileModal
        handleNewUpdateModal={handleNewUpdateModal}
        handleSubmit={handleUpdateProfile}
        handleChange={handleChangeUpdateProfile}
        darkMode={darkMode}
        name={profileForm.name}
        last_name={profileForm.last_name}
        phoneNumber={profileForm.phoneNumber}
        email={profileForm.email}
        nick_mame={profileForm.nick_mame}
        city={profileForm.city}
        category={profileForm.category}
        handleCreateBusiness={handleCreateUpdateProfile}
        />
      )}
      <div className={`bg-[#EEEFEF] w-screen h-auto flex ${darkMode ? 'dark-login-bg' : ''}`}>
        <div className='w-1/5 bg-[#FFF] fixed h-screen'>
          <div className="w-[100%] mt-6 ml-[13%] sidebar1">
            <div className='ml-[4%] mb-[8%]'>
              <img src={logoN} alt="Logo" className='cursor-pointer' 
                onClick={() => {setActiveButton('home');
                navigate("/home");
              }} />
            </div>
            <div className={`margin-top ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
              <button className={activeButton === 'home' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''}
                onClick={() => {
                  setActiveButton('home');
                  navigate("/home");
                }}>
                <p className="ml-4 text-[20px] p-txt"><i className="p-fa fa-solid fa-house mr-3"></i>Inicio</p>
              </button>
            </div>
            <div className={`margin-top mt-6 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
              <button className={activeButton === 'noticias' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''}
                onClick={() => {
                  setActiveButton('noticias');
                  navigate("/noticias");
                }}>
                <p className="ml-4 text-[20px] p-txt"><i className="p-fa fa-solid fa-book-open mr-3"></i>Noticias</p>
              </button>
            </div>
            <div className={`margin-top mt-6 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
              <button className={activeButton === 'search' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''}
                onClick={() => {
                  setActiveButton('search');
                  navigate("/search");
                }}>
                <p className="ml-4 text-[20px] p-txt"><i className="p-fa fa-solid fa-magnifying-glass mr-3"></i>Búsqueda</p>
              </button>
            </div>
            <div className={`margin-top mt-6 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
              <button className={activeButton === 'notificaciones' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''}
                onClick={() => {
                  setActiveButton('notificaciones');
                  navigate("/notificaciones");
                }}>
                <p className="ml-4 text-[20px] p-txt"><i className="p-fa fa-regular fa-bell mr-3"></i>Notificaciones</p>
              </button>
            </div>
            <div className={`margin-top mt-6 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
              <button className={activeButton === 'mensajes' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''} onClick={() => {
                setActiveButton('mensajes');
                navigate("/chats");
              }}>
                <p className="ml-4 text-[20px] p-txt"><i className="p-fa fa-solid fa-inbox mr-3"></i>Mensajes</p>
              </button>
            </div>
            <div className="mt-6">
              <button onClick={handlePostModal} className="rounded-[24px] h-[48px] w-[80%] flex items-center justify-center button-style">
                <p className="text-white font-bold">Publicar</p>
              </button>
            </div>
            <div className="mt-[100%] ml-[-15px] flex">
              <img src={proSet} alt="Imagen" className="cursor-pointer w-[10%] h-[10%]" onClick={() => handleUserClick(name)} />
              <p className={`${darkMode ? 'dark-text-white' : ''} pl-[5%]`}>{name.name}</p>
              <p className={`${darkMode ? 'dark-text-white' : ''} font-bold text-[20px] pl-[50%]`}>. . .</p>
            </div>
          </div>
        </div>
        <div className='w-[55%] bg-[#EEEFEF] ml-[20%] pr-[0.5%]'>
          <div className={`w-[100%] h-auto bg-[#FFF] ${darkMode ? 'dark-register-bg' : ''} create-post`}>
            <div className="w-[100%] h-[57%] pb-3 pl-3 pt-1 pr-3 bg-gradient-to-b from-white to-[#d78fa3]">
              <div className='flex mb-[20%]'>
                <i class="fa-solid fa-arrow-left-long mt-2 mr-2 cursor-pointer" onClick={()=> navigate('/home')}></i>
                <p className='text-[20px] font-bold'>{users.name}</p>
              </div>
            </div>
            <div className='flex justify-between ml-4'>
              <div className='rounded-full w-[202px] h-[202px] bg-[#FFF] flex justify-center items-center mt-[-13%]'>
                <div className='rounded-full w-[196px] h-[196px] bg-[#D9D9D9]'></div>
              </div>
              <div className='mt-3 flex mr-3'>
                <div className='opacity-30 flex mr-4 mt-4'>
                  <i class="fa-regular fa-calendar mt-[4px] mr-1"></i>
                  {userDetail && (
                    <p>
                      Se creó el {new Date(userDetail.createdAt).toLocaleDateString('es-MX', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
                {editable === "true" ? (
                  <button onClick={() => setUpdateModalOpen(true)} className="w-[100px] relative translate-y-[14%] h-10 bg-neutral-100 rounded-[20px] flex justify-center items-center">
                    <p className='text-black text-[14px] font-bold leading-10'>Editar perfil</p>
                  </button>
                ) : (
                  // Otro botón cuando no es editable
                  <button className="w-[86px] relative translate-y-[14%] h-10 px-4 bg-neutral-100 rounded-[20px] flex-col justify-center items-start gap-4">
                    <div className="text-black text-base font-semibold leading-10">Seguir</div>
                  </button>
                )}
              </div>
            </div>
            <div className='p-4 mb-[0%] mt-0'>
              <div className='flex mb-3'>
                <p className='mr-4'><span className='mr-1 text-black font-bold'>{userDetail.followers}</span>Seguidores</p>
                <p><span className='mr-1 text-black font-bold'>{userDetail.followings}</span>Siguiendo</p>
              </div>
              <p className='mb-4'>Siguen a este grupo</p>
              <div className="flex">
                <button
                  className={`${activeTabView === 'reseñas' ? (darkMode ? 'active-reseñas' : '') : ''} mr-7`}
                  onClick={() => setActiveTabView('reseñas')}
                >
                  <p
                    className={`${darkMode ? 'dark-text-white' : ''} ${activeTabView === 'reseñas' ? 'font-bold' : 'font-bold text-opacity-60'
                      } ml-1 mb-2`}
                  >
                    Reseñas
                  </p>
                  {activeTabView === 'reseñas' && (
                    <div className="tab-indicator" />
                  )}
                </button>
                <button
                  className={`${activeTabView === 'destacados' ? (darkMode ? 'active-destacados' : '') : ''} mr-7`}
                  onClick={() => setActiveTabView('destacados')}
                >
                  <p
                    className={`${darkMode ? 'dark-text-white' : ''} ${activeTabView === 'destacados' ? 'font-bold' : 'font-bold text-opacity-60'
                      } mb-2`}
                  >
                    Destacados
                  </p>
                  {activeTabView === 'destacados' && (
                    <div className="tab-indicator" />
                  )}
                </button>
                <button
                  className={`${activeTabView === 'multimedia' ? (darkMode ? 'active-multimedia' : '') : ''} mr-7`}
                  onClick={() => setActiveTabView('multimedia')}
                >
                  <p
                    className={`${darkMode ? 'dark-text-white' : ''} ${activeTabView === 'multimedia' ? 'font-bold' : 'font-bold text-opacity-60'
                      } mb-2`}
                  >
                    Multimedia
                  </p>
                  {activeTabView === 'multimedia' && (
                    <div className="tab-indicator" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {/*
            <div className="flex mt-4">
              <button className={activeFeed === 'feed' ? (darkMode ? 'active-feed': '') : ''} onClick={() => setActiveFeed('feed')}>
                <p className={`${darkMode ? 'dark-text-white' : ''} ${activeFeed === 'feed' ? 'font-medium' : 'font-light text-opacity-60'} mr-6 ml-1`}>Feed</p>
              </button>
              <button className={activeFeed === 'latest' ? (darkMode ? 'active-feed': '') : ''} onClick={() => setActiveFeed('latest')}>
                <p className={`${darkMode ? 'dark-text-white' : ''} ${activeFeed === 'latest' ? 'font-medium' : 'font-light text-opacity-60'} mr-6`}>Latest</p>
              </button>
              <button className={activeFeed === 'top' ? (darkMode ? 'active-feed': '') : ''} onClick={() => setActiveFeed('top')}>
                <p className={`${darkMode ? 'dark-text-white' : ''} ${activeFeed === 'top' ? 'font-medium' : 'font-light text-opacity-60'}`}>Top</p>
              </button>
            </div>
          */}
          <div className="w-[100%] h-auto post-post">
            {postes.map((post, index) => (
              <div key={index} className={`bg-[#FFF] h-auto w-[100%] p-3 mt-1 ${darkMode ? 'dark-register-bg' : ''}`}>
              <button className='w-[102.8%] mt-[-18px] ml-[-13px] bg-[rgba(255, 255, 255, 0.5)] h-[50px]' onClick={() => handleBusinessClick(post.Business)}>
                <div className='flex justify-between items-center'>
                  <p className='ml-4 text-black text-base font-bold'>{post.Business.name}</p>
                  <img src={paginaEmpre} alt='empresa' className='mr-5' />
                </div>
              </button>
              <div onClick={() => handleReview(post)}>
                <div className="flex items-center mt-3">
                  <img src={proSet} alt="Imagen" className="w-[35px] h-[35px] relative ml-1" />
                  <p className={`text-black text-base font-bold ml-3 ${darkMode ? 'dark-text-white' : ''}`}>
                    {post.User.name} {post.User.last_name}
                    <br />
                    <span style={{ marginTop: '-7px' }} className={`flex text-center text-neutral-400 text-sm font-light ${darkMode ? 'dark-text-white' : ''}`}>
                      {formatDate(post.createdAt)}
                    </span>
                  </p>
                </div>
                <p className={`prevent-word-break text-black text-sm font-normal leading-normal tracking-wide mt-2 ${darkMode ? 'dark-text-white' : ''}`}>
                  {post.content}
                </p>
                {post.images && post.images.length > 0 && (
                  <div className="flex w-[100%] items-center">
                    {post.images.slice(0, 2).map((image, i) => (
                      <img
                        key={i}
                        src={image}
                        alt={`Post ${i}`}
                        className="w-full h-auto mr-3 rounded-lg mt-2"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    ))}
                  </div>
                )}
                </div>
                <div className="flex items-center mt-7 ml-[1%]">
                  <img
                    src={post.is_liked ? Liked : Like}
                    alt='like'
                    style={{ height: '25px', width: '25px' }}
                    className='mr-2'
                    onClick={() => handleLike(post._id_review)}
                  />
                  <img src={Comment} style={{ height: '25px', width: '25px' }} className='mr-2' onClick={() => handleCommentClick(post._id_review)} />
                  <img src={Share} alt='share' />
                </div>
                <div className="flex mt-4 mb-4">
                  <p className={`text-gray-400 text-s font-light leading-normal ${darkMode ? 'dark-text-white' : ''}`}>
                    {post.is_liked ? post.likes + 1 : post.likes} me gusta
                  </p>
                  <p className={`ml-4 text-gray-400 text-s font-light leading-normal ${darkMode ? 'dark-text-white' : ''}`}>
                    {post.comments} comentarios
                  </p>
                </div>
                {/*  AQUI VA EL INPUT PARA PROBAR COMENTARIO */}
            </div>
            ))}
          </div>
        </div>
        <div className='w-1/4 bg-[#FFF] h-screen fixed right-0 p-4'>
          <div className='relative'>
            <span className='absolute inset-y-0 left-0 pl-3 flex items-center'>
              <i className='fas fa-search text-gray-700'></i>
            </span>
            <input
              className='h-[35px] bg-zinc-500 bg-opacity-10 rounded-lg pl-10 p-2 inline-flex w-full focus:outline-none'
              placeholder={`Buscar en ${users.name}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_user; 
