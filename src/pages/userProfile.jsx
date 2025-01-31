import { useState, useEffect, useContext } from "react";

import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";

import {
  differenceInMilliseconds,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  format,
  parseISO,
} from "date-fns";
import {
  NewCommentModal,
  NewPostModal,
  ProfileSection,
  UpdateProfileModal,
} from "../components";

import { getPostes, getComments, getProjects } from "../utils/getUserData";

export default function UserProfile({ setAuth, darkMode, FunctionContext }) {
  const {
    handleUserClick,
    handleNewUpdateProfileModal,
    handleCommentClick,
    handleNewCommentFromReview,
  } = useContext(FunctionContext);

  //search variables
  const [showResults, setShowResults] = useState(false);
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  //editable variables
  const [editable, setEditable] = useState("");

  //user variables
  const location = useLocation();
  const users = location.state ? location.state.users : null;

  //post variables
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [textPost, setText] = useState("");
  const [textPost2, setText2] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  //comments variables
  // const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [textComment, setTextComment] = useState("");
  const [idReviewComment, setIdReviewComment] = useState("");

  //general variables
  const [activeButton, setActiveButton] = useState("home");
  const [activeTabView, setActiveTabView] = useState("reseñas");

  const [isTyping, setIsTyping] = useState(false);
  const [showPublishIcon, setShowPublishIcon] = useState(false);
  const [name, setName] = useState([]);
  const [userDetail, setUserDetail] = useState("");
  const [postes, setPostes] = useState([]);
  const [commentsUser, setCommentsUser] = useState([]);
  const [projectsUser, setProjectsUser] = useState([]);
  const navigate = useNavigate();

  const maxLength = 1200;

  const formatDate = (createdAt) => {
    const parsedDate = parseISO(createdAt);
    const currentDate = new Date();
    const millisecondsDifference = differenceInMilliseconds(
      currentDate,
      parsedDate
    );
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

  const handlePostModal = () => {
    setPostModalOpen(!postModalOpen);
  };

  const handlePostTextChange = (event) => {
    setText(event.target.value);
    if (event.target.value.trim() !== "") {
      setIsTyping(true);
      setShowPublishIcon(true);
    } else {
      setIsTyping(false);
      setShowPublishIcon(false);
    }
  };
  const handleTextCommnetChange = (event) => {
    setTextComment(event.target.value);
    if (event.target.value.trim() !== "") {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  const handleTextChange2 = (event) => {
    setText2(event.target.value);
    if (event.target.value.trim() !== "") {
      setIsTyping(true);
      setShowPublishIcon(true);
    } else {
      setIsTyping(false);
      setShowPublishIcon(false);
    }
  };

  const handleBusinessClick = async (business) => {
    const newRecentSearches = [search, ...recentSearches.slice(0, 3)]; // Guardar los últimos 4 términos
    setRecentSearches(newRecentSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
    setShowResults(false);
    navigate(`/empresa/${business.name}`, { state: { business } });
  };

  const handleReview = async (reviewValue) => {
    navigate(`/review/${reviewValue._id_review}`, { state: { reviewValue } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // gettins postes data
        const postesData = await getPostes(users);
        setPostes(postesData);

        // gettins comments data
        const commentsData = await getComments(users);
        setCommentsUser(commentsData);

        // gettins comments data
        const projectsData = await getProjects(users);
        setProjectsUser(projectsData);

        // // gettins postes data
        // const postesData = await getPostes(users);
        // setPostes(postesData);
      } catch (error) {
        console.error("Error fetching postes:", error);
      }
    };

    // Call the asynchronous function
    fetchData();
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
          "https://api.whistleblowwer.net/users",
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
        const response = await fetch(
          `https://api.whistleblowwer.net/users/?_id_user=${users._id_user}`,
          requestOptions
        );
        const parseRes = await response.json();
        setUserDetail(parseRes.user);
      } catch (err) {
        console.error(err.message);
      }
    }
    getUserDetail();
  }, [handleUserClick]);

  useEffect(() => {
    const getEditable = () => {
      if (name.name === userDetail.name) {
        setEditable("true");
      } else {
        setEditable("false");
      }
    };
    getEditable();
  }, [name, users?.name, editable, userDetail?.name]);

  const addPost = () => {
    if (textPost || selectedImages.length > 0) {
      const newPost = {
        text: textPost,
        images: selectedImages.map((file) => URL.createObjectURL(file)),
      };
      setPosts([newPost, ...posts]);
      setText("");
      setSelectedImages([]);
      handlePostModal();
    } else if (textPost || selectedImages.length <= 0) {
      const newPost = {
        text: textPost,
        images: [],
      };
      setPosts([newPost, ...posts]);
      setText("");
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
      setText2("");
      setSelectedImages([]);
      setShowPublishIcon(false);
      handlePostModal();
    } else if (textPost2 || selectedImages.length <= 0) {
      const newPost = {
        text: textPost2,
        images: [],
      };
      setPosts([newPost, ...posts]);
      setText2("");
      handlePostModal();
      setShowPublishIcon(false);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  const handleLike = (_id_review) => {
    async function postLike() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
      };

      try {
        setPostes((prevPostes) => {
          return prevPostes.map((prevPost) => {
            if (prevPost._id_review === _id_review) {
              return {
                ...prevPost,
                is_liked: !prevPost.is_liked, // Invertir el estado
                likesCount: prevPost.is_liked
                  ? prevPost.likesCount - 1
                  : prevPost.likesCount + 1,
              };
            }
            return prevPost;
          });
        });
        const url = `https://api.whistleblowwer.net/users/reviews/like/?_id_review=${_id_review}`;
        const response = await fetch(url, requestOptions);
        const parseRes = await response.json();
      } catch (err) {
        console.error(err.message);
      }
    }
    postLike();
  };

  const handleComment = () => {
    async function postComment() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);
      var raw = JSON.stringify({
        content: textComment,
        _id_review: idReviewComment,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "https://api.whistleblowwer.net/comments",
          requestOptions
        );
      } catch (err) {
        console.error(err.message);
      }
    }
    postComment();
  };

  const handleSetActiveTabView = (tabView) => {
    setActiveTabView(tabView);
  };

  const handleFollowUser = () => {
    async function followUser() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://api.whistleblowwer.net/users/follow/?_id_followed=${userDetail._id_user}`,
          requestOptions
        );
        const parseRes = await response.json();
        if (userDetail?.is_followed) {
          setUserDetail({ ...userDetail, is_followed: false });
        } else {
          setUserDetail({ ...userDetail, is_followed: true });
        }
      } catch (err) {
        console.error(err.message);
      }
    }
    followUser();
  };

  return (
    <>
      <ProfileSection
        darkMode={darkMode}
        username={users?.name}
        userDetail={userDetail}
        setUpdateModalOpen={handleNewUpdateProfileModal}
        editable={editable}
        activeTabView={activeTabView}
        handleSetActiveTabView={handleSetActiveTabView}
        postes={postes}
        commentsUser={commentsUser}
        setCommentsUser={setCommentsUser}
        projectsUser={projectsUser}
        handleBusinessClick={handleBusinessClick}
        handleReview={handleReview}
        handleLike={handleLike}
        handleCommentClick={handleCommentClick}
        handleFollow={handleFollowUser}
        isUserProfile={true}
        handleNewCommentFromReview={handleNewCommentFromReview}
        FunctionContext={FunctionContext}
      />
      {/* <div className="w-1/4 bg-[#FFF] h-screen fixed right-0 p-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <i className="fas fa-search text-gray-700"></i>
          </span>
          <input
            className="h-[35px] bg-zinc-500 bg-opacity-10 rounded-lg pl-10 p-2 inline-flex w-full focus:outline-none"
            placeholder={`Buscar en ${users.name}`}
          />
        </div>
      </div> */}
    </>
  );
}
