import home from "../assets/Home.svg";
import search from "../assets/Search.svg";
import notificaciones from "../assets/Noti.svg";
import chats from "../assets/Message.svg";

export const SIDEBAR_HOME_LINKS = [
  { href: "/home", key: "home", label: "Inicio", icon: home },
  // {
  //   href: "/noticias",
  //   key: "noticias",
  //   label: "Noticias",
  //   icon: "fa-book-open",
  // },
  {
    href: "/search",
    key: "search",
    label: "Búsqueda",
    icon: search,
  },
  {
    href: "/notificaciones",
    key: "notificaciones",
    label: "Notificaciones",
    icon: notificaciones,
  },
  { href: "/chats", key: "mensajes", label: "Mensajes", icon: chats  },
];

export const BOTTOM_NAVBAR_LINKS = [
  { href: "/home", key: "home", icon: "fa-house" },
  { href: "/search", key: "search", icon: "fa-magnifying-glass" },
  { href: "/chats", key: "chats", icon: "fa-message" },
  { href: "/settings", key: "settings", icon: "fa-cog" },
];

export const USER_PROFILE_TABS = [
  { tabName: "reseñas", key: "res", active: "active-reseñas" },
  { tabName: "destacados", key: "dest", active: "active-destacados" },
  { tabName: "multimedia", key: "multi", active: "active-multimedia" },
];
