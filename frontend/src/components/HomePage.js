import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const HomePage = () => {
 return (
  <StyledHomePage>
   <Heading>YourAnimeList</Heading>
   <Description>
    Welcome to YourAnimeList! Here you can search for your favorite animes and
    add them to your personalized library. To enjoy this feature, please log in
    or create an account in the top right.
   </Description>
   <ExploreLink to="/TopAnimes">Explore Popular Animes</ExploreLink>
   <ExploreLink to="/SeasonalAnime">
    Explore Currently Airing Animes
   </ExploreLink>
  </StyledHomePage>
 );
};

const StyledHomePage = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 margin-top: 50px;
`;

const Heading = styled.h1`
 color: #9e76d6;
 border-bottom: 2px solid #9e76d6;
`;

const Description = styled.p`
 font-size: 20px;
 color: #d9d9d9;
 text-align: center;
 max-width: 800px;
`;

const ExploreLink = styled(Link)`
 margin: 10px;
 font-size: 20px;
 padding: 10px;
 color: white;
 background-color: #9e76d6;
 border-radius: 5px;
 text-decoration: none;

 &:hover {
  background-color: #824eca;
 }
`;

export default HomePage;
