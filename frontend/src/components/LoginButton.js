import React from "react";

import { VscAccount } from "react-icons/vsc";

import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
 const { loginWithRedirect, isAuthenticated } = useAuth0();

 return (
  !isAuthenticated && (
   <Button onClick={() => loginWithRedirect()}>
    <UserIcon />
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

const UserIcon = styled(VscAccount)`
 color: white;
 font-size: 30px;
 &:hover {
  background-color: #824eca;
  transition-duration: 0.5s;
  border-radius: 15px;
 }
`;

export default LoginButton;
