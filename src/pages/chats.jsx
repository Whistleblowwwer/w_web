import { useState, useEffect } from "react";
import logoN from "../assets/NavLogo.png";
import proSet from "../assets/Image-40.png";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import ChatList from "../components/ChatList";

export default function Chats(darkMode) {
  return (
    <div className={`bg-[#EEEFEF] h-screen w-screen`}>
      <div className={`bg-[#EEEFEF] h-auto ""}`}>
        <div className="contain-principal h-screen">
          <div className="w-[25%] pt-6 pl-6">
            <div className="flex justify-between items-center">
              <p className="text-neutral-900 text-2xl font-bold leading-7">
                Mensajes
              </p>
              <i
                class="fa-regular fa-pen-to-square mr-7"
                style={{ fontSize: "20px" }}
              />
            </div>
            <div className="mt-4 flex items-center">
              <div
                className={`relative placeholder-black p-2 w-[96%] h-[38px] bg-[#FFF] rounded-2xl`}
              >
                <i className="p-fa fa-solid fa-magnifying-glass mr-2 ml-2 relative" />
                <input
                  placeholder="Buscar en chats"
                  className="w-[85%] h-[120%]"
                  style={{ outline: "none", border: "none" }}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <ChatList />
            </div>
          </div>
          <div className="bg-[#141414] w-[1px]" />
          <div className="w-[77%] flex justify-center items-center">
            <p className="text-neutral-900 text-[25px] font-semibold leading-normal">
              No hay ningún chat seleccionado
            </p>
          </div>
        </div>
      </div>
    </div>
    // <div className="h-screen lg:w-[80%] w-full flex justify-center items-center">
    //   Proximamente
    //   <ChatList />
    // </div>
  );
}
