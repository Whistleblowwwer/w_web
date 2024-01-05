import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { ProfileSection } from "../components";

export default function BusinessProfile({

  darkMode,
  FunctionContext })
{
  const { handleCommentClick } = useContext(FunctionContext);

  const [search] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  //empresa variables
  const location = useLocation();
  const business = location.state ? location.state.business : null;
  const [businessDetails, setBusinessDetails] = useState("");

  //post variables











  //general variables

  const [activeTabView, setActiveTabView] = useState("reseñas");



  const [name, setName] = useState("");
  const [postes, setPostes] = useState([]);
  const navigate = useNavigate();

































































  useEffect(() => {
    async function getPostes() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" };


      try {
        if (business && business._id_business) {
          const businessId = business._id_business;

          const response = await fetch(
          `https://api.whistleblowwer.net/reviews/business/?_id_business=${businessId}`,
          requestOptions);

          const parseRes = await response.json();
          setPostes(parseRes.reviews);
        } else {
          console.error(
          "El objeto business no tiene la propiedad _id_business");

        }
      } catch (err) {
        console.error(err.message);
      }
    }

    getPostes();
  }, [business]);

  useEffect(() => {
    async function getBusinessDetails() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" };


      try {
        if (business && business._id_business) {
          const businessId = business._id_business;
          const response = await fetch(
          `https://api.whistleblowwer.net/business/details/?_id_business=${businessId}`,
          requestOptions);

          const parseRes = await response.json();
          setBusinessDetails(parseRes.business);
        } else {
          console.error(
          "El objeto business no tiene la propiedad _id_business");

        }
      } catch (err) {
        console.error(err.message);
      }
    }

    getBusinessDetails();
  }, [business]);

  useEffect(() => {
    async function getName() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" };


      try {
        const response = await fetch(
        "https://api.whistleblowwer.net/users",
        requestOptions);

        const parseRes = await response.json();
        setName(parseRes.user.name);
      } catch (err) {
        console.error(err.message);
      }
    }
    getName();
  }, []);



















































  const handleLike = (_id_review) => {
    async function postLike() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);






      try {
        setPostes((prevPostes) => {
          return prevPostes.map((prevPost) => {
            if (prevPost._id_review === _id_review) {
              return {
                ...prevPost,
                is_liked: !prevPost.is_liked, // Invertir el estado
                likesCount: prevPost.is_liked ?
                prevPost.likesCount - 1 :
                prevPost.likesCount + 1 };

            }
            return prevPost;
          });
        });



      } catch (err) {
        console.error(err.message);
      }
    }
    postLike();
  };





























  const handleReview = async (reviewValue) => {
    navigate(`/review/${reviewValue._id_review}`, { state: { reviewValue } });
  };

  const handleSetActiveTabView = (tabView) => {
    setActiveTabView(tabView);
  };

  const handleUserClick = async (users) => {
    const newRecentSearches = [search, ...recentSearches.slice(0, 3)]; // Guardar los últimos 4 términos
    setRecentSearches(newRecentSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
    navigate(`/${users.name}`, { state: { users } });
  };

  const handleFollowBusiness = () => {
    async function followBusiness() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);







      try {





        if (businessDetails?.is_followed) {
          setBusinessDetails({ ...businessDetails, is_followed: false });
        } else {
          setBusinessDetails({ ...businessDetails, is_followed: true });
        }
      } catch (err) {
        console.error(err.message);
      }
    }
    followBusiness();
  };

  return (
    <>
      <ProfileSection
      darkMode={darkMode}
      username={name.name}
      userDetail={businessDetails}
      activeTabView={activeTabView}
      handleSetActiveTabView={handleSetActiveTabView}
      postes={postes}
      handleReview={handleReview}
      handleLike={handleLike}
      handleUserClick={handleUserClick}
      handleCommentClick={handleCommentClick}
      handleFollow={handleFollowBusiness}
      isBusiness />

      {/* <div className="w-1/4 bg-[#FFF] h-screen fixed right-0 p-4">
             <div className="relative">
               <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                 <i className="fas fa-search text-gray-700"></i>
               </span>
               <input
                 className="h-[35px] bg-zinc-500 bg-opacity-10 rounded-lg pl-10 p-2 inline-flex w-full focus:outline-none"
                 placeholder={`Buscar en ${business.name}`}
               />
             </div>
           </div> */}
    </>);

}