import React, { useState, useEffect } from 'react'
import logoN from '../assets/NavLogo.png'
import proSet from '../assets/Image-40.png'
import Location from '../assets/Location.svg'
import Like from '../assets/Like.svg'
import Comment from '../assets/Comment Review.svg'
import Share from '../assets/Send.svg'
import { useNavigate, useLocation } from 'react-router-dom'
import NewPostModal from '../auxComponents/NewPostModal'
import NewCommentModal from '../auxComponents/NewCommentModal'
import { differenceInMilliseconds, differenceInHours, differenceInDays, differenceInMonths, parseISO } from 'date-fns'

const Profile_user = ({ setAuth }) => {
  //editable variables
  const [editable, setEditable] = useState('')

  //user variables
  const location = useLocation()
  const users = location.state ? location.state.users : null

  //post variables
  const [postModalOpen, setPostModalOpen] = useState(false)
  const [textPost, setText] = useState('')
  const [textPost2, setText2] = useState('')
  const [posts, setPosts] = useState([])
  const [selectedImages, setSelectedImages] = useState([])

  //comments variables
  const [commentModalOpen, setCommentModalOpen] = useState(false)
  const [textComment, setTextComment] = useState('')
  const [idReviewComment, setIdReviewComment] = useState('')

  //general variables
  const [activeButton, setActiveButton] = useState('home')
  const [activeTabView, setActiveTabView] = useState('reseñas')
  const [darkMode] = useState(() => {
    // Inicializa el estado a partir de LocalStorage o usa el valor predeterminado (false)
    return JSON.parse(localStorage.getItem('darkMode')) || false
  })
  const [setIsTyping] = useState(false)
  const [setShowPublishIcon] = useState(false)
  const [name, setName] = useState('')
  const [postes, setPostes] = useState([])
  const navigate = useNavigate()

  const maxLength = 1200

  const formatDate = (createdAt) => {
    const parsedDate = parseISO(createdAt)
    const currentDate = new Date()
    const millisecondsDifference = differenceInMilliseconds(currentDate, parsedDate)

    const secondsDifference = Math.floor(millisecondsDifference / 1000)
    const hoursDifference = differenceInHours(currentDate, parsedDate)
    const daysDifference = differenceInDays(currentDate, parsedDate)
    const monthsDifference = differenceInMonths(currentDate, parsedDate)

    if (secondsDifference < 60) {
      return `${secondsDifference}s`
    } else if (hoursDifference < 24) {
      return `${hoursDifference}h`
    } else if (daysDifference < 30) {
      return `${daysDifference}d`
    } else {
      return `${monthsDifference}m`
    }
  }

  const handlePostModal = () => {
    setPostModalOpen(!postModalOpen)
  }

  const handlePostTextChange = (event) => {
    setText(event.target.value)
    if (event.target.value.trim() !== '') {
      setIsTyping(true)
      setShowPublishIcon(true)
    } else {
      setIsTyping(false)
      setShowPublishIcon(false)
    }
  }
  const handleTextCommnetChange = (event) => {
    setTextComment(event.target.value)
    if (event.target.value.trim() !== '') {
      setIsTyping(true)
    } else {
      setIsTyping(false)
    }
  }

  const handleCommentClick = (_id_review) => {
    setIdReviewComment(_id_review)
    setCommentModalOpen(!commentModalOpen)
  }

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => {
    async function getPostes() {
      try {
        if (users && users._id_user) {
          const myHeaders = new Headers()
          myHeaders.append('authorization', `Bearer ${localStorage.token}`)

          const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          }

          const response = await fetch(`http://18.220.124.246:4000/users/reviews?_id_user=${users._id_user}`, requestOptions)

          const parseRes = await response.json()

          // Check if 'reviews' property exists before setting the state
          if (parseRes.reviews) {
            setPostes(parseRes.reviews)
          } else {
            console.warn("El objeto business no tiene la propiedad 'reviews'")
          }
        } else {
          console.error('El objeto business no tiene la propiedad _id_user')
        }
      } catch (err) {
        console.error(err.message)
      }
    }

    getPostes()
  }, [users])

  useEffect(() => {
    async function getName() {
      const myHeaders = new Headers()
      myHeaders.append('authorization', `Bearer ${localStorage.token}`)

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }

      try {
        const response = await fetch('http://18.220.124.246:4000/users', requestOptions)

        const parseRes = await response.json()
        setName(parseRes.user.name)
      } catch (err) {
        console.error(err.message)
      }
    }
    getName()
  }, [])

  useEffect(() => {
    const getEditable = () => {
      if (name === users.name) {
        setEditable('true')
      } else {
        setEditable('false')
      }
    }
    getEditable()
  }, [name, users.name, editable])

  const addPost = () => {
    if (textPost || selectedImages.length > 0) {
      const newPost = {
        text: textPost,
        images: selectedImages.map((file) => URL.createObjectURL(file))
      }

      setPosts([newPost, ...posts])
      setText('')
      setSelectedImages([])
      handlePostModal()
    } else if (textPost || selectedImages.length <= 0) {
      const newPost = {
        text: textPost,
        images: []
      }

      setPosts([newPost, ...posts])
      setText('')
      handlePostModal()
    }
  }

  const handleLike = (_id_review) => {
    async function postLike() {
      const myHeaders = new Headers()
      myHeaders.append('authorization', `Bearer ${localStorage.token}`)

      const requestOptions = {
        method: 'POST',
        headers: myHeaders
      }

      try {
        const url = `http://18.220.124.246:4000/users/reviews/like/?_id_review=${_id_review}`
        const response = await fetch(url, requestOptions)
      } catch (err) {
        console.error(err.message)
      }
    }
    postLike()
  }

  const handleComment = () => {
    async function postComment() {
      const myHeaders = new Headers()
      myHeaders.append('authorization', `Bearer ${localStorage.token}`)
      var raw = JSON.stringify({
        content: textComment,
        _id_review: idReviewComment
      })

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      try {
      } catch (err) {
        console.error(err.message)
      }
    }
    postComment()
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

      <div className={`bg-[#EEEFEF] h-auto ${darkMode ? 'dark-login-bg' : ''}`}>
        <div className='contain-principal'>
          <div className='w-[20%] flex bg-[#FFF] h-screen fixed'>
            <div className='w-[100%] mt-6 ml-[13%] sidebar1'>
              <div className='ml-[4%] mb-[8%]'>
                <img src={logoN} alt='Logo' />
              </div>
              <div className={`margin-top ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                <button
                  className={activeButton === 'home' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''}
                  onClick={() => {
                    setActiveButton('home')
                    navigate('/home')
                  }}
                >
                  <p className='ml-4 text-[20px] p-txt'>
                    <i className='p-fa fa-solid fa-house mr-3'></i>
                    Inicio
                  </p>
                </button>
              </div>
              <div className={`margin-top mt-6 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                <button
                  className={activeButton === 'noticias' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''}
                  onClick={() => {
                    setActiveButton('noticias')
                    navigate('/noticias')
                  }}
                >
                  <p className='ml-4 text-[20px] p-txt'>
                    <i className='p-fa fa-solid fa-book-open mr-3'></i>
                    Noticias
                  </p>
                </button>
              </div>
              <div className={`margin-top mt-6 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                <button
                  className={activeButton === 'search' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''}
                  onClick={() => {
                    setActiveButton('search')
                    navigate('/search')
                  }}
                >
                  <p className='ml-4 text-[20px] p-txt'>
                    <i className='p-fa fa-solid fa-magnifying-glass mr-3'></i>
                    Búsqueda
                  </p>
                </button>
              </div>
              <div className={`margin-top mt-6 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                <button
                  className={activeButton === 'notificaciones' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''}
                  onClick={() => {
                    setActiveButton('notificaciones')
                    navigate('/notificaciones')
                  }}
                >
                  <p className='ml-4 text-[20px] p-txt'>
                    <i className='p-fa fa-regular fa-bell mr-3'></i>
                    Notificaciones
                  </p>
                </button>
              </div>
              <div className={`margin-top mt-6 ${darkMode ? 'dark-text-white' : ''} sidebarcontain`}>
                <button
                  className={activeButton === 'mensajes' ? (darkMode ? 'active-buttonH font-bold' : 'active-buttonD font-bold') : ''}
                  onClick={() => {
                    setActiveButton('mensajes')
                    navigate('/chats')
                  }}
                >
                  <p className='ml-4 text-[20px] p-txt'>
                    <i className='p-fa fa-solid fa-inbox mr-3'></i>
                    Mensajes
                  </p>
                </button>
              </div>
              <div className='mt-6'>
                <button onClick={handlePostModal} className='rounded-[24px] h-[48px] w-[80%] flex items-center justify-center button-style'>
                  <p className='text-white font-bold'>Publicar</p>
                </button>
              </div>
              <div className='mt-[100%] ml-[-15px] flex'>
                <img src={proSet} alt='Imagen' className='cursor-pointer' onClick={() => navigate(`/${name}`)} />

                <p className={`${darkMode ? 'dark-text-white' : ''} pl-[5%]`}>{name}</p>
                <p className={`${darkMode ? 'dark-text-white' : ''} font-bold text-[20px] pl-[50%]`}>. . .</p>
              </div>
            </div>
          </div>
          <div className='w-[80%] ml-[-13px] post-container'>
            <div className={`w-[66%] h-auto bg-[#FFF] ${darkMode ? 'dark-register-bg' : ''} create-post`}>
              <div className='w-[100%] h-auto pb-3 pl-3 pt-1 pr-3 bg-gradient-to-b from-white to-[#d78fa3]'>
                <div className='flex mb-[20%]'>
                  <i className='fa-solid fa-arrow-left-long mt-2 mr-2 cursor-pointer' onClick={() => navigate('/home')}></i>
                  <p className='text-[20px] font-bold'>{users.name}</p>
                </div>
                <div className='flex justify-between'>
                  <div className='flex-col'>
                    <p className='text-white text-base font-bold'>{users.name}</p>
                    <div className='flex items-center'>
                      <i
                        className={`fa-solid fa-star mr-2 ${darkMode ? 'dark-text-white' : ''}`}
                        style={{
                          color: '#688BFF',
                          fontSize: '18px',
                          cursor: 'pointer'
                        }}
                      ></i>
                      <i
                        className={`fa-solid fa-star mr-2 ${darkMode ? 'dark-text-white' : ''}`}
                        style={{
                          color: '#688BFF',
                          fontSize: '18px',
                          cursor: 'pointer'
                        }}
                      ></i>
                      <i
                        className={`fa-solid fa-star mr-2 ${darkMode ? 'dark-text-white' : ''}`}
                        style={{
                          color: '#D9D9D9',
                          fontSize: '18px',
                          cursor: 'pointer'
                        }}
                      ></i>
                      <i
                        className={`fa-solid fa-star mr-2 ${darkMode ? 'dark-text-white' : ''}`}
                        style={{
                          color: '#D9D9D9',
                          fontSize: '18px',
                          cursor: 'pointer'
                        }}
                      ></i>
                      <i
                        className={`fa-solid fa-star mr-2 ${darkMode ? 'dark-text-white' : ''}`}
                        style={{
                          color: '#D9D9D9',
                          fontSize: '18px',
                          cursor: 'pointer'
                        }}
                      ></i>
                      <p className='text-center text-[#D9D9D9] text-sm font-semibold'>(0)</p>
                    </div>
                  </div>
                  <div>
                    {editable === 'true' ? (
                      <button className='w-[40px] relative translate-y-[14%] h-10 bg-neutral-100 rounded-[20px] flex justify-center items-center'>
                        <i className='fa-solid fa-gear'></i>
                      </button>
                    ) : (
                      // Otro botón cuando no es editable
                      <button className='w-[86px] relative translate-y-[14%] h-10 px-4 bg-neutral-100 rounded-[20px] flex-col justify-center items-start gap-4'>
                        <div className='text-black text-base font-semibold leading-10'>Seguir</div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className='p-4'>
                <img src={Location} alt='location' className='mb-2' />

                <div className='flex mb-3'>
                  <p className='mr-4'>Seguidores</p>
                  <p>Reseñas</p>
                </div>
                <p>Siguen a este grupo</p>
                <div className='flex'>
                  <button
                    className={`${activeTabView === 'reseñas' ? (darkMode ? 'active-reseñas' : '') : ''} mr-7`}
                    onClick={() => setActiveTabView('reseñas')}
                  >
                    <p
                      className={`${darkMode ? 'dark-text-white' : ''} ${
                        activeTabView === 'reseñas' ? 'font-bold' : 'font-bold text-opacity-60'
                      } ml-1 mb-2`}
                    >
                      Reseñas
                    </p>
                    {activeTabView === 'reseñas' && <div className='tab-indicator' />}
                  </button>
                  <button
                    className={`${activeTabView === 'destacados' ? (darkMode ? 'active-destacados' : '') : ''} mr-7`}
                    onClick={() => setActiveTabView('destacados')}
                  >
                    <p
                      className={`${darkMode ? 'dark-text-white' : ''} ${
                        activeTabView === 'destacados' ? 'font-bold' : 'font-bold text-opacity-60'
                      } mb-2`}
                    >
                      Destacados
                    </p>
                    {activeTabView === 'destacados' && <div className='tab-indicator' />}
                  </button>
                  <button
                    className={`${activeTabView === 'multimedia' ? (darkMode ? 'active-multimedia' : '') : ''} mr-7`}
                    onClick={() => setActiveTabView('multimedia')}
                  >
                    <p
                      className={`${darkMode ? 'dark-text-white' : ''} ${
                        activeTabView === 'multimedia' ? 'font-bold' : 'font-bold text-opacity-60'
                      } mb-2`}
                    >
                      Multimedia
                    </p>
                    {activeTabView === 'multimedia' && <div className='tab-indicator' />}
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
            <div className='w-[66%] post-post'>
              {posts.map((post, index) => (
                <div key={index} className={`bg-[#FFF] p-4 mt-1 ${darkMode ? 'dark-register-bg' : ''}`}>
                  <div className='flex items-center mt-3'>
                    <img src={proSet} alt='Imagen' className='w-[35px] h-[35px] relative ml-1' />

                    <p className={`text-black text-base font-bold ml-3 ${darkMode ? 'dark-text-white' : ''}`}>
                      {name}
                      <br />
                      <span
                        style={{ marginTop: '-7px' }}
                        className={`flex text-center text-neutral-400 text-sm font-light ${darkMode ? 'dark-text-white' : ''}`}
                      >
                        3hrs
                      </span>
                    </p>
                  </div>
                  <p
                    className={`prevent-word-break text-black text-sm font-normal leading-normal tracking-wide mt-2 ${
                      darkMode ? 'dark-text-white' : ''
                    }`}
                  >
                    {post.text}
                  </p>
                  {post.images.length > 0 && (
                    <div className='flex w-[100%] items-center'>
                      {post.images.slice(0, 2).map((image, i) => (
                        <img
                          key={i}
                          src={image}
                          alt={`Post ${i}`}
                          className='w-full h-auto mr-3 rounded-lg mt-2'
                          style={{
                            width: '100%',
                            height: 'auto'
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <div className='flex mt-5 justify-between'>
                    <div className='flex items-center'>
                      <img src={Like} alt='like' />
                      <img src={Comment} alt='comment' />
                      <img src={Share} alt='share' />
                    </div>
                    <div className='flex items-center'>
                      <i
                        className={`fa-solid fa-star mr-2 ${darkMode ? 'dark-text-white' : ''}`}
                        style={{
                          color: '#688BFF',
                          fontSize: '18px',
                          cursor: 'pointer'
                        }}
                      ></i>
                      <i
                        className={`fa-solid fa-star mr-2 ${darkMode ? 'dark-text-white' : ''}`}
                        style={{
                          color: '#688BFF',
                          fontSize: '18px',
                          cursor: 'pointer'
                        }}
                      ></i>
                      <i
                        className={`fa-solid fa-star mr-2 ${darkMode ? 'dark-text-white' : ''}`}
                        style={{
                          color: '#D9D9D9',
                          fontSize: '18px',
                          cursor: 'pointer'
                        }}
                      ></i>
                      <i
                        className={`fa-solid fa-star mr-2 ${darkMode ? 'dark-text-white' : ''}`}
                        style={{
                          color: '#D9D9D9',
                          fontSize: '18px',
                          cursor: 'pointer'
                        }}
                      ></i>
                      <i
                        className={`fa-solid fa-star mr-2 ${darkMode ? 'dark-text-white' : ''}`}
                        style={{
                          color: '#D9D9D9',
                          fontSize: '18px',
                          cursor: 'pointer'
                        }}
                      ></i>
                    </div>
                  </div>
                  <div className='flex mt-6 mb-4'>
                    <p className={`text-gray-400 text-s font-light leading-normal ${darkMode ? 'dark-text-white' : ''}`}>123 me gusta </p>
                    <p className={`text-gray-400 text-s font-light leading-normal ml-3 ${darkMode ? 'dark-text-white' : ''}`}>
                      44 comentarios{' '}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className='w-[66%] h-auto post-post'>
              {postes.map((post, index) => (
                <div key={index} className={`bg-[#FFF] h-auto p-3 mt-1 ${darkMode ? 'dark-register-bg' : ''}`}>
                  <div className='flex items-center mt-3'>
                    <img src={proSet} alt='Imagen' className='w-[35px] h-[35px] relative ml-1' />

                    <p className={`text-black text-base font-bold ml-3 ${darkMode ? 'dark-text-white' : ''}`}>
                      {post.User.name} {post.User.last_name}
                      <br />
                      <span
                        style={{ marginTop: '-7px' }}
                        className={`flex text-center text-neutral-400 text-sm font-light ${darkMode ? 'dark-text-white' : ''}`}
                      >
                        {formatDate(post.createdAt)}
                      </span>
                    </p>
                  </div>
                  <p
                    className={`prevent-word-break text-black text-sm font-normal leading-normal tracking-wide mt-2 ${
                      darkMode ? 'dark-text-white' : ''
                    }`}
                  >
                    {post.content}
                  </p>
                  {post.images && post.images.length > 0 && (
                    <div className='flex w-[100%] items-center'>
                      {post.images.slice(0, 2).map((image, i) => (
                        <img
                          key={i}
                          src={image}
                          alt={`Post ${i}`}
                          className='w-full h-auto mr-3 rounded-lg mt-2'
                          style={{
                            width: '100%',
                            height: 'auto'
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <div className='flex items-center mt-7 ml-[1%]'>
                    <img
                      src={Like}
                      alt='like'
                      style={{
                        height: '25px',
                        width: '25px'
                      }}
                      className='mr-2'
                      onClick={() => handleLike(post._id_review)}
                    />

                    <img
                      src={Comment}
                      alt='comment'
                      style={{
                        height: '25px',
                        width: '25px'
                      }}
                      className='mr-2'
                      onClick={() => handleCommentClick(post._id_review)}
                    />

                    <img src={Share} alt='share' />
                  </div>
                  <div className='flex mt-4 mb-4'>
                    <p className={`text-gray-400 text-s font-light leading-normal ${darkMode ? 'dark-text-white' : ''}`}>
                      {post.likes} me gusta
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
          <div className='w-[26%] translate-x-[283%] h-screen flex flex-col fixed bg-[#FFF] p-5'>
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
      <div className={`bg-[#FFF] w-[100%] h-[6%] flex bottombar ${darkMode ? 'dark-bg' : ''}`}>
        <div className='flex justify-around items-center mt-3'>
          <i
            className={`fa-solid fa-house ${darkMode ? 'dark-text-white' : ''} text-[130%] iconeres`}
            onClick={() => navigate('/home')}
          ></i>
          <i
            className={`fa-solid fa-magnifying-glass ${darkMode ? 'dark-text-white' : ''} text-[130%] iconeres`}
            onClick={() => navigate('/search')}
          ></i>
          <i
            className={`fa-solid fa-message ${darkMode ? 'dark-text-white' : ''} text-[130%] iconeres`}
            onClick={() => navigate('/chats')}
          ></i>
        </div>
      </div>
    </div>
  )
}

export default Profile_user
