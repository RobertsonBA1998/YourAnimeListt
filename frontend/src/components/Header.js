import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogOutButton";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import SideBar from "./SideBar";

import logo from "./images/logo.png";

const Header = () => {
 return (
  <>
   <Content>
    <SideBar />
    <Image src={logo} alt="Logo" />
    <NavigationTools>
     <SearchBar />
     <LoginButton />
     <LogoutButton />
    </NavigationTools>
   </Content>
  </>
 );
};

const Image = styled.img`
 width: 20%;
 height: 70%;
 border-radius: 20px;
 position: relative;
 left: 80px;
`;

const Content = styled.div`
 width: auto;
 height: 90px;
 display: flex;
 justify-content: space-between;
 align-items: center;
`;

const NavigationTools = styled.div`
 display: flex;
 position: relative;
 right: 30px;
`;

export default Header;
