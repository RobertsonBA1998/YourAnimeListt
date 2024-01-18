import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineLibrary } from "react-icons/hi";
import { FiHome } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { BsCollectionPlay } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { FiMenu, FiX } from "react-icons/fi";

import SideBarTextIcon from "./SideBarTextIcon.js";
import styled, { css } from "styled-components";

const SideBar = () => {
 const [isSidebarOpen, setSidebarOpen] = useState(false);

 const toggleSidebar = () => {
  setSidebarOpen(!isSidebarOpen);
 };

 return (
  <>
   <ToggleButton onClick={toggleSidebar}>
    {isSidebarOpen ? <FiX /> : <FiMenu />}
   </ToggleButton>
   <SideBarContent $isOpen={isSidebarOpen}>
    <Logo />
    <NavigationLink to="/">
     <SideBarTextIcon Icon={FiHome} text="Home" />
    </NavigationLink>
    <NavigationLink to={`/Profile`}>
     <SideBarTextIcon Icon={FiUser} text="Profile" />
    </NavigationLink>
    <NavigationLink to="/Library">
     <SideBarTextIcon Icon={FiBookmark} text="Library" />
    </NavigationLink>
    <NavigationLink to="/TopAnimes">
     <SideBarTextIcon Icon={BsCollectionPlay} text="Top Anime" />
    </NavigationLink>
    <NavigationLink to="/SeasonalAnime">
     <SideBarTextIcon Icon={FaRegLightbulb} text="Seasonal Anime" />
    </NavigationLink>
   </SideBarContent>
  </>
 );
};

const SideBarContent = styled.div`
 width: 150px;
 height: 100vh;
 position: fixed;
 top: 0;
 left: 0;
 background-color: #1a1a1a;
 box-shadow: 0px 0px 25px rgba(0, 0, 0, 20), 0 0 0 7px #5a2e98;
 padding: 20px;
 transition: transform 0.3s ease-in-out;
 z-index: 10;

 ${({ $isOpen }) =>
  !$isOpen &&
  css`
   transform: translateX(-200px);
  `}
`;

const Logo = styled(HiOutlineLibrary)`
 height: 50px;
 position: relative;
`;

const NavigationLink = styled(NavLink)`
 color: #e6e6e6;
 text-decoration: none;

 &.active {
  color: #9e76d6;
  font-weight: bold;
 }
`;

const ToggleButton = styled.button`
 background-color: #9e76d6;
 color: white;
 width: 40px;
 height: 35px;
 border: 2px solid;
 border-radius: 10px;
 padding: 5px;
 margin-bottom: 10px;
 border: none;
 cursor: pointer;
 font-size: 25px;
 position: fixed;
 left: 20px;
 z-index: 20;

 &:hover {
  background-color: #824eca;
  transition-duration: 0.5s;
 }
`;
export default SideBar;
