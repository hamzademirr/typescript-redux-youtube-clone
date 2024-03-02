import { useAppSelector } from "../../redux/hooks";
import { Menu } from "antd";

import HomeIcon from "../../assets/Sidebar/Home";
import Shorts from "../../assets/Sidebar/Shorts";
import Subscriptions from "../../assets/Sidebar/Subscriptions";
import Library from "../../assets/Sidebar/Library";
import History from "../../assets/Sidebar/History";
import YourVideos from "../../assets/Sidebar/YourVideos";
import WatchLater from "../../assets/Sidebar/WatchLater";
import LikedVideos from "../../assets/Sidebar/LikedVideos";
import userPhoto2 from "../../assets/Sidebar/user-photo/User-Avatar2.png";
import userPhoto3 from "../../assets/Sidebar/user-photo/User-Avatar3.png";
import userPhoto4 from "../../assets/Sidebar/user-photo/User-Avatar4.png";
import userPhoto5 from "../../assets/Sidebar/user-photo/User-Avatar5.png";
import userPhoto6 from "../../assets/Sidebar/user-photo/User-Avatar6.png";
import userPhoto7 from "../../assets/Sidebar/user-photo/User-Avatar7.png";

import { selectTheme } from "../../redux/Theme/themeSlice";
import { selectSidebar } from "../../redux/Sidebar/sidebarSlice";

interface SidebarItem {
  key: string;
  icon?: JSX.Element;
  children?: JSX.Element[] | JSX.Element;
  label?: string;
  type?: string;
}

function getItem(
  label: string,
  key: string,
  icon: JSX.Element,
  children?: JSX.Element[] | JSX.Element,
  type?: string
): SidebarItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items: SidebarItem[] = [
  getItem(
    "Home",
    "1",
    <span>
      <HomeIcon />
    </span>
  ),
  getItem(
    "Shorts",
    "2",
    <span>
      <Shorts />
    </span>
  ),
  getItem(
    "Subscriptions",
    "3",
    <span>
      <Subscriptions />
    </span>
  ),
  {
    key: "divider1",
    type: "divider",
  },
  getItem(
    "Library",
    "4",
    <span>
      <Library />
    </span>
  ),
  getItem(
    "History",
    "5",
    <span>
      <History />
    </span>
  ),
  getItem(
    "Your Videos",
    "6",
    <span>
      <YourVideos />
    </span>
  ),
  getItem(
    "Watch Later",
    "7",
    <span>
      <WatchLater />
    </span>
  ),
  getItem(
    "Liked Videos",
    "8",
    <span>
      <LikedVideos />
    </span>
  ),
  {
    key: "divider2",
    type: "divider",
  },
  getItem(
    "Subscriptions",
    "b1",
    null,
    [
      getItem("John Doe", "9", <img src={userPhoto2} />),
      getItem("Jane Smith", "10", <img src={userPhoto3} />),
      getItem("Michael Johnson", "11", <img src={userPhoto4} />),
      getItem("Emily Davis", "12", <img src={userPhoto5} />),
      getItem("David Wilson", "13", <img src={userPhoto6} />),
      getItem("Sarah Thompson", "14", <img src={userPhoto7} />),
    ],
    "group"
  ),
];

function Sidebar() {
  const theme = useAppSelector(selectTheme);
  const sidebarCollaps = useAppSelector(selectSidebar);
  return (
    <div className={theme ? "dark side-bar" : "light side-bar"}>
      <Menu
        className={sidebarCollaps ? "is-sidebar2" : "is-sidebar"}
        defaultSelectedKeys={["1"]}
        inlineCollapsed={sidebarCollaps}
        items={items}
      />
    </div>
  );
}

export default Sidebar;
