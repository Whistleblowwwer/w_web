import React, { useState, useEffect } from 'react';
import logoN from '../assets/NavLogo.png';
import proSet from '../assets/Image-40.png';
import mas from '../assets/Group 99.svg';
import masimagen from '../assets/Group 105.svg';
import paginaEmpre from '../assets/CTA.svg';
import Like from '../assets/Like.svg';
import Liked from '../assets/liked.svg';
import Comment from '../assets/Comment Review.svg';
import Share from '../assets/Send.svg';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import NewPostModal from '../auxComponents/NewPostModal';
import NewCommentModal from '../auxComponents/NewCommentModal';
import CompanyAutocomplete from '../auxComponents/CompanyAutocomplete';
import { differenceInMilliseconds, differenceInHours, differenceInDays, differenceInMonths, format, parseISO } from 'date-fns';

const Review = ({ setAuth }) => {

  //review variables
  const [review, setReview] = useState([])
  const [business, setBusiness] = useState([])
  const location = useLocation();
  const reviewValue = location.state ? location.state.reviewValue : null;

  //search variables
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [searchUser, setSearchUser] = useState([]);

  //post variables
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [textPost, setText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  //comments variables
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [textComment, setTextComment] = useState('');
  const [idReviewComment, setIdReviewComment] = useState('')

  //general variables
  const [isTyping, setIsTyping] = useState(false)
  const [activeButton, setActiveButton] = useState('home');
  const [activeTabView, setActiveTabView] = useState('parati');
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });
  const [showPublishIcon, setShowPublishIcon] = useState(false);
  const [name, setName] = useState([]);
  const [postes, setPostes] = useState([]);
  const [suggestions, setSuggestions] = useState([])
  const [selectedCompany, setSelectedCompany] = useState()
  const [reviewRating, setReviewRating] = useState(0)
  const [companySearchQuery, setCompanySearchQuery] = useState("")

  console.log("text post", textPost);
  console.log("suggestions", suggestions);
  console.log("modal open", postModalOpen);

  const navigate = useNavigate();
  const maxLength = 1200;

  const handleBusinessClick = async (business) => {
    const newRecentSearches = [search, ...recentSearches.slice(0, 3)]; // Guardar los últimos 4 términos
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    setShowResults(false);
    navigate(`/empresa/${business.name}`, { state: { business } });
  };

  const handleRecentSearch = async (searchValue) => {
    navigate(`/search`, { state: { searchValue } });
  }

  const handleReview = async (reviewValue) => {
    navigate(`/review/${reviewValue}`, { state: { reviewValue } });
  }

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
      setShowPublishIcon(true);
    } else {
      setIsTyping(false);
      setShowPublishIcon(false);
    }
  };
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
  }

  const handleTextChange2 = (event) => {
    setText(event.target.value);
    if (event.target.value.trim() !== '') {
      setIsTyping(true);
      setShowPublishIcon(true);
    } else {
      setIsTyping(false);
      setShowPublishIcon(false);
    }
  };

  const handleTextChange2Come = (event) => {
    setTextComment(event.target.value);
    if (event.target.value.trim() !== '') {
      setIsTyping(true);
      setShowPublishIcon(true);
    } else {
      setIsTyping(false);
      setShowPublishIcon(false);
    }
  };

  const handleSearch = (e) => {
    const searchValue = typeof e === 'string' ? e : '';

    setSearch(searchValue);
    async function getSearchs() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(`http://18.220.124.246:4000/business/search?name=${e}&city=&enitty=&country=&address=&state=`, requestOptions);
        const parseRes = await response.json();
        setBusinesses(parseRes.businesses || []);
      } catch (err) {
        console.error(err.message);
      }
      try {
        const response = await fetch(`http://18.220.124.246:4000/users/search?searchTerm=${e}`, requestOptions);
        const parseRes = await response.json();
        setSearchUser(parseRes.users || []);
      } catch (err) {
        console.error(err.message);
      }

    }
    getSearchs();

  };

  const handleAddPost = () => {
    if (textPost && selectedImages.length > 0) {
      const newPost = {
        text: textPost,
        images: selectedImages.map((file) => URL.createObjectURL(file)),
      };
      setPostes([newPost, ...postes]);
      setText('');
      setSelectedImages([]);
      setShowPublishIcon(false);
      handlePostModal();
    } else if (textPost && selectedImages.length <= 0) {

      async function postReview() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        myHeaders.append("authorization", `Bearer ${localStorage.token}`);

        var raw = JSON.stringify({
          "content": textPost,
          "_id_business": selectedCompany,
          "rating": reviewRating
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        const response = await fetch("http://18.220.124.246:4000/reviews", requestOptions)
        const jsonRes = await response.json()
        setPostes([jsonRes?.review, ...postes]);
      }
      postReview();
      setText("");
      setCompanySearchQuery("")
      setReviewRating(0)
      handlePostModal();

    }
  };

  const handleLike = (_id_comment) => {
    async function postLike() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
      };

      try {
        const url = `http://18.220.124.246:4000/users/comments/like/?_id_comment=${_id_comment}`;
        const response = await fetch(url, requestOptions);
        const parseRes = await response.json();
        setPostes((prevPostes) => {
          return prevPostes.map((prevPost) => {
            if (prevPost._id_comment === _id_comment) {
              return {
                ...prevPost,
                is_liked: !prevPost.is_liked, // Invertir el estado
                likes: prevPost.is_liked ? prevPost.likes : prevPost.likes,
              };
            }
            return prevPost;
          });
        });
      } catch (err) {
        console.error(err.message);
      }
    }
    postLike();
  }

  const handleComment = () => {
    async function postComment() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      var raw = JSON.stringify({
        "content": textComment,
        "_id_review": reviewValue._id_review,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      try {
        const response = await fetch("http://18.220.124.246:4000/comments", requestOptions);
      } catch (err) {
        console.error(err.message);
      }
    }
    setCommentModalOpen(!commentModalOpen)
    postComment();
  }

  const handleComment2 = () => {
    async function postComment() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      var raw = JSON.stringify({
        "content": textComment,
        "_id_review": reviewValue._id_review,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      try {
        const response = await fetch("http://18.220.124.246:4000/comments", requestOptions);
        console.log(response);
      } catch (err) {
        console.error(err.message);
      }
    }
    postComment();
    setTextComment('');
    setShowPublishIcon(false);

  }

  const handleSearchCompanyClick = () => {
    async function getCompanies() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch("http://18.220.124.246:4000/business/search?", requestOptions);
        const parseRes = await response.json();
        setSuggestions(parseRes.businesses || []);
      } catch (err) {
        console.error(err.message);
      }
    }
    getCompanies()
  }

  const handleRatingClick = (clickedRating) => {
    setReviewRating(clickedRating);
  };



  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    async function getPostes() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(`http://18.220.124.246:4000/reviews/info/?_id_review=${reviewValue._id_review}`, requestOptions);
        const parseRes = await response.json();
        setPostes(parseRes.Comments);
        setBusiness(parseRes.Business);
        setReview(parseRes);
        console.log(parseRes);
      } catch (err) {
        console.error(err.message);
      }
    }

    getPostes();
  }, []);

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
        const response = await fetch("http://18.220.124.246:4000/users", requestOptions);
        const parseRes = await response.json();
        setName(parseRes.user);
      } catch (err) {
        console.error(err.message);
      }
    }
    getName();

  }, []);



  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  }

  const formatDate = (createdAt) => {
    const parsedDate = parseISO(createdAt);
    const currentDate = new Date();

    const millisecondsDifference = differenceInMilliseconds(currentDate, parsedDate);
    const secondsDifference = Math.floor(millisecondsDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = differenceInHours(currentDate, parsedDate);
    const daysDifference = differenceInDays(currentDate, parsedDate);
    const monthsDifference = differenceInMonths(currentDate, parsedDate);

    if (minutesDifference < 1) {
      return `${secondsDifference}s`;
    } else if (hoursDifference < 1) {
      return `${minutesDifference}m`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference}h`;
    } else if (daysDifference < 30) {
      return `${daysDifference}d`;
    } else {
      return `${monthsDifference}m`;
    }
  };

  useEffect(() => {
    const storedRecentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedRecentSearches);
  }, []);


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
          addPost={handleAddPost}
          suggestions={suggestions}
          setSelectedCompany={setSelectedCompany}
          companySearchQuery={companySearchQuery}
          setCompanySearchQuery={setCompanySearchQuery}
          handleRatingClick={handleRatingClick}
          reviewRating={reviewRating}
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
      <div className={`bg-[#EEEFEF] h-auto ${darkMode ? 'dark-login-bg' : ''}`}>
        <div className="contain-principal">
          <div className='w-[20%] flex bg-[#FFF] h-screen fixed'>
            <div className="w-[100%] mt-6 ml-[13%] sidebar1">
              <div className='ml-[4%] mb-[8%]'>
                <img src={logoN} alt="Logo" />
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
                <img src={proSet} alt="Imagen" className="cursor-pointer" onClick={() => handleUserClick(name)} />
                <p className={`${darkMode ? 'dark-text-white' : ''} pl-[5%]`}>{name.name}</p>
                <p className={`${darkMode ? 'dark-text-white' : ''} font-bold text-[20px] pl-[50%]`}>. . .</p>
              </div>
            </div>
          </div>
          <div className="w-[80%] ml-[-13px] post-container">
            <div className={`w-[66%] h-auto bg-[#FFF] ${darkMode ? 'dark-register-bg' : ''} create-post`}>
                <div className="w-[100%] h-auto pb-3 pl-3 pt-1 pr-3">
                    <div className='flex mb-[2%]'>
                        <i class="fa-solid fa-arrow-left-long mt-2 mr-4 cursor-pointer" onClick={()=> navigate('/home')}></i>
                        <p className='text-[20px] font-bold'>Post</p>
                    </div>
                    <div>
                        <button className='w-[102.8%] mt-[-18px] ml-[-13px] bg-[#F5F5F5] h-[50px]' onClick={() => handleBusinessClick(business)}>
                            <div className='flex justify-between items-center'>
                            <p className='ml-4 text-black text-base font-bold'>{business.name}</p>
                            <img src={paginaEmpre} alt='empresa' className='mr-5' />
                            </div>
                        </button>
                    </div>
                    <div className="flex items-center mt-2">
                      <img src={proSet} alt="Imagen" className="w-[35px] h-[35px] relative ml-1" />
                      {review.User && (
                            <p className={`text-black text-base font-bold ml-3 ${darkMode ? 'dark-text-white' : ''}`}>
                            {review.User.name} {review.User.last_name}
                            <br />
                            <span style={{ marginTop: '-7px' }} className={`flex text-center text-neutral-400 text-sm font-light ${darkMode ? 'dark-text-white' : ''}`}>
                                {formatDate(review.createdAt)}
                            </span>
                            </p>
                        )}
                    </div>
                    <div>
                    <p className={`prevent-word-break text-black text-sm font-normal leading-normal tracking-wide mt-2 ${darkMode ? 'dark-text-white' : ''}`}>
                      {review.content}
                    </p>
                    <div className="flex items-center mt-7 ml-[1%]">
                      <img
                        src={review.is_liked ? Liked : Like}
                        alt='like'
                        style={{ height: '25px', width: '25px' }}
                        className='mr-2'
                      />
                      <img src={Comment} style={{ height: '25px', width: '25px' }} className='mr-2' onClick={() => handleCommentClick(review._id_review)} />
                      <img src={Share} alt='share' />
                    </div>
                    <div className="flex mt-4 mb-4">
                      <p className={`text-gray-400 text-s font-light leading-normal ${darkMode ? 'dark-text-white' : ''}`}>
                        {review.is_liked ? review.likes + 1 : review.likes} me gusta
                      </p>
                      <p className={`ml-4 text-gray-400 text-s font-light leading-normal ${darkMode ? 'dark-text-white' : ''}`}>
                        {review.comments} comentarios
                      </p>
                    </div>
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
            <div className='w-[66%] h-auto'>
                <input className='input-style w-full h-auto' placeholder='Escribe un comentario' onChange={handleTextChange2Come} value={textComment}></input>
                <div className="bg-[#FFF]">
                    <button style={{
                    display: showPublishIcon ? 'none' : 'block', background: showPublishIcon
                        ? 'linear-gradient(267deg, #8E1DA1 0%, #2D015A 100%)'
                        : '#F8F8FB'
                    }} className={`w-[48px] h-[48px] bg-[#F8F8FB] rounded-full ${darkMode ? 'dark-button' : ''}`}>
                    <i className={`fa-solid fa-arrow-right mt-1 text-[#A9A9A9] text-[22px] ${darkMode ? 'dark-text' : ''}`} ></i></button>
                </div>
                <div className="bg-[#FFF]">
                    <button onClick={handleComment2} style={{
                    display: showPublishIcon ? 'block' : 'none', background: showPublishIcon
                        ? 'linear-gradient(267deg, #8E1DA1 0%, #2D015A 100%)'
                        : '#F8F8FB',
                    }} className={`w-[48px] h-[48px] bg-[#F8F8FB] rounded-full ${darkMode ? 'dark-button' : ''}`}>
                    <i className={`fa-solid fa-arrow-right mt-1 text-[#FFF] text-[22px] ${darkMode ? 'dark-text' : ''}`} ></i></button>
                </div>
            </div>
            <div className="w-[66%] h-auto post-post">
              {postes.map((post, index) => (
                <div key={index} className={`bg-[#FFF] h-auto w-[100%] p-3 mt-1 ${darkMode ? 'dark-register-bg' : ''}`}>
                  <button className='w-[102.8%] mt-[-18px] ml-[-13px] bg-[#F5F5F5] h-[50px]' onClick={() => handleBusinessClick(business)}>
                    <div className='flex justify-between items-center'>
                      <p className='ml-4 text-black text-base font-bold'>{business.name}</p>
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
                    <div className="flex items-center mt-7 ml-[1%]">
                      <img
                        src={post.is_liked ? Liked : Like}
                        alt='like'
                        style={{ height: '25px', width: '25px' }}
                        className='mr-2'
                        onClick={() => handleLike(post._id_comment)}
                      />
                      <img src={Comment} style={{ height: '25px', width: '25px' }} className='mr-2' onClick={() => handleCommentClick(post._id_comment)} />
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
                </div>
              ))}
            </div>
          </div>
          <div className='w-[26%] translate-x-[283%] h-screen flex flex-col fixed bg-[#FFF] p-5'>
            <div className='relative mb-[1%]'>
              <h1 className='text-[22px] font-semibold mb-2'>Buscar</h1>
              <span className='relative translate-y-[150%] left-0 pl-3 flex items-center'>
                <i className='fas fa-search text-gray-700'></i>
              </span>
              <input
                value={search}
                className='h-[35px] absolute bg-zinc-500 bg-opacity-10 rounded-lg pl-10 p-2 inline-flex w-full focus:outline-none'
                placeholder={`Buscar establecimiento`}
                onChange={(e) => handleSearch(e.target.value)}
                onClick={(e) => handleSearch(e.target.value)}
              />
              <div className='mt-10'>
                {recentSearches.map((term, index) => (
                  <div key={index} className='flex cursor-pointer' onClick={() => handleRecentSearch(term)}>
                    <p>{term}</p>
                  </div>
                ))}
              </div>
              <div className='mt-[0%]'>
                {businesses.map((business) => (
                  <div key={business._id_business}>
                    <div onClick={() => handleBusinessClick(business)} className='flex cursor-pointer'>
                      <h2 className='mr-3'>{business.name},</h2>
                      <p>{business.city}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='mt-[0%]'>
                {searchUser.map((users) => (
                  <div key={users._id_user}>
                    <div onClick={() => handleUserClick(users)} className='flex cursor-pointer'>
                      <h2 className='mr-3'>{users.name},</h2>
                      <p>{users.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex ml-3 mt-4">
              <button
                className={`${activeTabView === 'parati' ? (darkMode ? 'active-parati' : '') : ''} mr-7`}
                onClick={() => setActiveTabView('parati')}
              >
                <p
                  className={`${darkMode ? 'dark-text-white' : ''} ${activeTabView === 'parati' ? 'font-bold' : 'font-bold text-opacity-60'
                    } ml-1 mb-2`}
                >
                  Para ti
                </p>
                {activeTabView === 'parati' && (
                  <div className="tab-indicator" />
                )}
              </button>
              <button
                className={`${activeTabView === 'tendencias' ? (darkMode ? 'active-tendencias' : '') : ''} mr-7`}
                onClick={() => setActiveTabView('tendencias')}
              >
                <p
                  className={`${darkMode ? 'dark-text-white' : ''} ${activeTabView === 'tendencias' ? 'font-bold' : 'font-bold text-opacity-60'
                    } mb-2`}
                >
                  Tendencias
                </p>
                {activeTabView === 'tendencias' && (
                  <div className="tab-indicator" />
                )}
              </button>
              <button
                className={`${activeTabView === 'noticias' ? (darkMode ? 'active-noticias' : '') : ''} mr-7`}
                onClick={() => setActiveTabView('noticias')}
              >
                <p
                  className={`${darkMode ? 'dark-text-white' : ''} ${activeTabView === 'noticias' ? 'font-bold' : 'font-bold text-opacity-60'
                    } mb-2`}
                >
                  Noticias
                </p>
                {activeTabView === 'noticias' && (
                  <div className="tab-indicator" />
                )}
              </button>
              <button
                className={activeTabView === 'empresas' ? (darkMode ? 'active-empresas' : '') : ''}
                onClick={() => setActiveTabView('empresas')}
              >
                <p
                  className={`${darkMode ? 'dark-text-white' : ''} ${activeTabView === 'empresas' ? 'font-bold' : 'font-bold text-opacity-60'
                    } mb-2`}
                >
                  Empresas
                </p>
                {activeTabView === 'empresas' && (
                  <div className="tab-indicator" />
                )}
              </button>
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

export default Review; 