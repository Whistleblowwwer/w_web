import { renderStars } from "../utils";
import { format } from "date-fns";
import proSet from "../assets/defaultProfilePicture.webp";
import paginaEmpre from "../assets/CTA.svg";
import Like from "../assets/Like.svg";
import Liked from "../assets/IsLiked.svg";
import { useState, useEffect } from "react";
import FullPicture from "./FullPicture";
import defaultPp from "../assets/defaultProfilePicture.webp";
import NewReportModal from "./NewReportModal";
import NewDeleteModal from "./NewDeleteModal";

const CompanyCard = ({
    post,
    darkMode,
    handleBusinessClick,
    handleUserClick,
    handleReview,
    handleLike,
    handleCommentComment,
    handleCommentReview,
    handleCommentClick,
    editable,
    isUserProfile,
    isBusiness,
    isComment,
    handleDeleteClick,
}) => {
    const [modalPicture, setModalPicture] = useState(false);
    const [currentPicture, setCurrentPicture] = useState(null);
    const [followConditionBusiness, setFollowConditionBusiness] = useState(
        post?.Business?.is_followed
    );
    const [conteoComentarios, setConteoComentarios] = useState();
    const [auxIsLiked, setAuxIsLiked] = useState(post?.is_liked);
    const [auxLikesCount, setAuxLikesCount] = useState(post?.likesCount);
    const [modalReport, setModalReport] = useState(false);
    const [formatedDate, setFormatedDate] = useState("")
    const [modalDelete, setModalDelete] = useState(false);
    const [isOwnPost, setIsOwnPost] = useState(false);

    const handleViewPicture = (picture) => {
        setCurrentPicture(picture);
        setModalPicture(!currentPicture);
    };

    const handleReportModal = () => {
        setModalReport(!modalReport);
    };

    const handleAuxLike = (id) => {
        handleLike(id);
        auxIsLiked
            ? setAuxLikesCount(auxLikesCount - 1)
            : setAuxLikesCount(auxLikesCount + 1);
        setAuxIsLiked(!auxIsLiked);
    };

    const handleDeleteModal = () => {
        const postId = post.User._id_user;
        const localStorageUserId = localStorage.userId;

        if (postId === localStorageUserId.slice(1, -1)) {
            setIsOwnPost(true);
        } else {
            setIsOwnPost(false);
        }
        setModalDelete(!modalDelete);
    };

    const handleFollowBusiness = async (idbusiness) => {
        async function followBusiness() {
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
                    `https://api.whistleblowwer.net/users/business/follow/?_id_business=${idbusiness}`,
                    requestOptions
                );
                const parseRes = await response.json();
                // Actualizar el estado local
                setFollowConditionBusiness(!followConditionBusiness);
            } catch (err) {
                console.error(err.message);
            }
        }

        followBusiness();
    };

    const handleDeleteReview = () => {
        async function deleteReview() {
            const myHeaders = new Headers();
            myHeaders.append("authorization", `Bearer ${localStorage.token}`);
            var requestOptions = {
                method: "PATCH",
                headers: myHeaders,
                redirect: "follow",
            };

            try {
                const response = await fetch(
                    `https://api.whistleblowwer.net/reviews/?_id_review=${post?._id_review}`,
                    requestOptions
                );
                const result = await response.text();
                window.location.reload();
            } catch (error) {
                console.error("Error during fetch:", error);
            }
        }
        deleteReview();
        handleDeleteModal();
    };

    let formattedStoredUserName = "";
    let yearMonth = ""

    useEffect(() => {
        if (localStorage.getItem("userName")) {
            const storedUserName = localStorage.getItem("userName");
            formattedStoredUserName = storedUserName.replace(/"/g, "");
        }

        const date = new Date([post?.joinedAt]);
        const year = date.getFullYear();
        const monthName = date.toLocaleString('es-ES', { month: 'long' });
        setFormatedDate(`Te uniste en ${monthName} de ${year}`)
    }, []);

    return (
        <>
            {modalPicture && (
                <FullPicture
                    darkMode={darkMode}
                    picture={currentPicture}
                    handleViewPicture={handleViewPicture}
                />
            )}
            {modalReport && (
                <NewReportModal
                    darkMode={darkMode}
                    handleReportModal={handleReportModal}
                />
            )}
            {modalDelete && (
                <NewDeleteModal
                    darkMode={darkMode}
                    handleDeleteModal={handleDeleteModal}
                    handleDeleteReview={handleDeleteReview}
                    isOwnPost={isOwnPost}
                />
            )}
            <div className={`bg-[#FFF] p-4 flex flex-col gap-4`}>

                <>
                    <div></div>
                    <div className="bg-[rgba(255, 255, 255, 0.5)] flex justify-between items-center">
                        <div
                            className="flex flex-col justify-start text-left cursor-pointer"
                            onClick={() => handleBusinessClick(post)}
                        >
                            <div>
                                <p className="text-black text-base font-bold">
                                    {post?.name}
                                </p>
                            </div>
                            <div>
                                <span className="text-xs opacity-25">
                                    {post?.entity}
                                </span>
                            </div>
                            <div className="mt-1">
                                <span className="text-sm opacity-40  pr-4">
                                    {post?.Category?.name}
                                </span>
                                <span className="text-sm opacity-40 mt-[-3%] pr-4">
                                    {`${post?.city}, ${post?.country}`}
                                </span>

                            </div>
                            <div>
                                <span className="text-sm opacity-40 mt-[-3%]">
                                    {formatedDate}
                                </span>
                            </div>
                            <div className="flex items-center mt-2">
                                {renderStars(post?.average_rating, darkMode, false)}
                            </div>
                            <div className="mt-2">
                                <span className="text-sm opacity-40 mt-[-3%] mr-4">
                                    {`${post?.followers} miembros`}
                                </span>
                                <span className="text-sm opacity-40 mt-[-3%]">
                                    {`${post?.reviewsCount} reseñas`}
                                </span>
                            </div>
                        </div>
                        <img
                            src={paginaEmpre}
                            alt="empresa"
                            className="cursor-pointer rounded-full"
                            onClick={() => handleBusinessClick(post?.Business)}
                        />
                    </div>
                </>
            </div>
        </>
    );
};

export default CompanyCard;
