import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NewCommentModal } from "../components";

import SingleArticle from "../components/SingleArticle";

export default function SingleArticlePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="lg:w-[50%] w-full bg-[#EEEFEF] lg:px-0 p-1">
        <div
          className="flex bg-[#FFF] gap-2 items-center px-3 pt-3"
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-arrow-left-long cursor-pointer"></i>
          <p className="text-[20px] font-bold">Noticias</p>
        </div>
        <SingleArticle />
      </div>
    </>
  );
}
