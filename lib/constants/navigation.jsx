import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faTableCells,
  faUsers,
  faChartSimple,
  faUser,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

export const NAVBAR_LINKS = [
  {
    key: "taules",
    label: "Taules",
    path: "/taules",
    icon: faTableCells,
  },
  {
    key: "carta",
    label: "Carta",
    path: "/carta",
    icon: faUtensils,
  },
  {
    key: "personal",
    label: "Personal",
    path: "/personal",
    icon: faUsers,
  }
];

export const USERDROPDOWN_LINKS = [
  {
    key: "perfil",
    label: "Perfil",
    path: "/profile",
    icon: faUser,
  },
  // {
  //   key: "logOut",
  //   label: "Sortir",
  //   path: "/api/auth/signout", // a determinar
  //   icon: faRightFromBracket,
  // },
];
