import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { Button, Input, Dropdown, Space } from "antd";

import "./style.scss";
import "../TopMenu/style.scss";

import youtubeLogo from "../../assets/Navbar/Youtube_logo.svg";
import youtubeLogoLight from "../../assets/Navbar/Youtube_logo_light.svg";
import Create from "../../assets/Navbar/Create.tsx";
import Menu from "../../assets/Navbar/Menu.tsx";
import Mic from "../../assets/Navbar/Mic.tsx";
import SearchIcon from "../../assets/Navbar/Search.tsx";
import Notifications from "../../assets/Navbar/Notifications.tsx";
import userPhoto from "../../assets/Navbar/user_photo.jpeg";

import { changeTheme, selectTheme } from "../../redux/Theme/themeSlice.tsx";
import { toggleSidebar } from "../../redux/Sidebar/sidebarSlice.tsx";

function NavBar() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const [isPhoneMode, setIsPhoneMode] = useState(false);
  const [serachText, setSerchText] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event: any) => {
    console.log(serachText);
    event.preventDefault();
    navigate(`/search?q=${serachText}`);
  };

  useEffect(() => {
    const phoneMediaQuery = window.matchMedia("(max-width: 540px)");

    const handleMediaQueryChange = (mediaQuery: MediaQueryListEvent) => {
      setIsPhoneMode(mediaQuery.matches);
    };

    const mediaQueryListener = (event: MediaQueryListEvent) =>
      handleMediaQueryChange(event);

    phoneMediaQuery.addEventListener("change", mediaQueryListener);

    return () => {
      phoneMediaQuery.removeEventListener("change", mediaQueryListener);
    };
  }, []);

  useEffect(() => {
    if (isPhoneMode) {
      dispatch(toggleSidebar());
    }
  }, [dispatch, isPhoneMode]);

  const items = [
    {
      label: (
        <Button type="text" onClick={() => dispatch(changeTheme())}>
          Change Theme
        </Button>
      ),
      key: "0",
    },
  ];

  return (
    <>
      <nav className={theme ? "dark Navbar" : "light Navbar"}>
        <div className="leftItem">
          <Button
            className="menu-button"
            type="text"
            onClick={() => dispatch(toggleSidebar())}
          >
            <Menu />
          </Button>
          <NavLink to="/">
            <img
              src={theme ? youtubeLogo : youtubeLogoLight}
              className="youtubeLogo"
            />
          </NavLink>
        </div>

        <div className="middleItem">
          <form className="search-form" onSubmit={handleSubmit}>
            <Input
              className="Search-Input"
              name="serach"
              onChange={(event) => setSerchText(event.target.value)}
              placeholder="Serach"
            />
            <Button
              className="Search-Button"
              htmlType="submit"
              icon={<SearchIcon />}
            />
          </form>
          <Button className="micButton" shape="circle" icon={<Mic />} />
        </div>

        <div className="rightItem">
          <div className="deneme">
            <div>
              <Create />
            </div>
            <div>
              <Notifications />
            </div>
          </div>
          <div className="user">
            <Dropdown
              overlayClassName={
                theme
                  ? "is-dark-theme is-user-drop-menu"
                  : "is-light-theme is-user-drop-menu"
              }
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <img src={userPhoto} className="userPhoto" />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
