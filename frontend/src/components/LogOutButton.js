import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { FiLogOut } from "react-icons/fi";
import styled from "styled-components";

const LogoutButton = () => {
 const { logout, isAuthenticated } = useAuth0();

 return (
  isAuthenticated && (
   <Button
    onClick={() =>
     logout({ logoutParams: { returnTo: window.location.origin } })
    }
   >
    <LogOutIcon />
   </Button>
  )
 );
};

const Button = styled.button`
 background: none;
 border: none;
 cursor: pointer;
 width: auto;
 height: auto;
 border-radius: 50px;
`;

const LogOutIcon = styled(FiLogOut)`
 color: white;
 font-size: 30px;

 &:hover {
  background-color: #824eca;
  transition-duration: 0.5s;
  border-radius: 15px;
 }
`;

export default LogoutButton;
