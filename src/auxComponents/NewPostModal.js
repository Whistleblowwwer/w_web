import React from 'react'

function NewPostModal(props) {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-70'></div>
      <div className={`z-50 bg-[#FFF] p-4 shadow-md rounded-[20px] h-[35%] w-[26%] modalres ${props.darkMode ? 'dark-register-bg' : ''}`}>
        <div className='text-right'>
          <button
            onClick={props.handlePostModal}
            className={`${props.darkMode ? 'dark-text-white' : ''} hover:text-gray-500 cursor-pointer`}
          >
            <i className='fas fa-times'></i>
          </button>
        </div>
        <div className='mt-2 flex justify-center'>
          <div className='flex w-[100%] ml-10'>
            <div className='w-[11%] h-[110%] relative bg-white rounded-full shadow flex justify-center items-center'>
              <img src={props.proSet} alt='logo' />
            </div>
            <div>
              <p className={`ml-4 text-neutral-900 text-base font-bold ${props.darkMode ? 'dark-text-white' : ''}`}>
                <br />
                <span
                  style={{ marginTop: '-1px' }}
                  className={`flex text-neutral-400 text-opacity-75 text-[15px] font-normal leading-[13.96px] ${
                    props.darkMode ? 'dark-text-white' : ''
                  }`}
                >
                  Oct 25
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className='w-[100%] h-[35%] mt-5 flex flex-col items-center'>
          <input
            className={`w-[81%] h-[60%] rounded-lg bg-gray-50 p-2  ${props.darkMode ? 'dark-register' : ''}`}
            onChange={props.handleTextChange}
            placeholder='Escribe algo..'
            value={props.textPost}
          />
          <div className='text-gray-500 text-sm mt-1 mr-[50%]'>
            {props.textPost.length}/{props.maxLength} palabras
          </div>
        </div>
        <div className='flex items-center mt-2 ml-16'>
          <div className='mr-20'>
            <label
              htmlFor='imageUpload'
              className={`fa-regular fa-3x fa-image mr-6 ${props.darkMode ? 'dark-text-white' : ''}`}
              style={{ fontSize: '18px', cursor: 'pointer' }}
            >
              <input
                id='imageUpload'
                type='file'
                accept='image/*'
                multiple
                style={{ display: 'none' }}
                onChange={(e) => {
                  const files = e.target.files
                  const selected = Array.from(files)
                  props.setSelectedImages(selected)
                  props.setShowPublishIcon(false)
                }}
              />
            </label>
            <i className={`fa-solid fa-link mr-6 ${props.darkMode ? 'dark-text-white' : ''}`} style={{ fontSize: '16px' }}></i>
            <i className={`fa-solid fa-bolt ${props.darkMode ? 'dark-text-white' : ''}`} style={{ fontSize: '16px' }}></i>
          </div>
          <div>
            <button
              onClick={props.addPost}
              className={`w-[84px] h-[32px] bg-neutral-900 rounded-[20.50px] border ml-12 mt-1 ${props.darkMode ? 'dark-button' : ''}`}
            >
              <p className={`text-stone-50 ${props.darkMode ? 'dark-text' : ''}`}>Publicar</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPostModal
