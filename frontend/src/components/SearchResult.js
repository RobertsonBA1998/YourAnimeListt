import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import AnimeDisplay from "./AnimeDisplay";

const SeeMore = () => {
 const [searchedData, setsearchedData] = useState([]);

 const { searchedInfo } = useParams();

 useEffect(() => {
  fetch(`https://api.jikan.moe/v4/anime?q=${searchedInfo}`)
   .then((res) => res.json())
   .then((resData) => {
    setsearchedData(resData.data);
   });
 }, []);

 return (
  <>
   <h1>Search Result for: "{searchedInfo}"</h1>
   {searchedData && searchedData.length ? (
    <GridContainer>
     {searchedData.map((el) => (
      <AnimeDisplay
       key={el.mal_id}
       mal_id={el.mal_id}
       image={el.images.jpg.image_url}
       title={el.title}
       rating={el.rating}
       rank={el.rank}
       status={el.status}
      />
     ))}
    </GridContainer>
   ) : (
    <h1>No Results</h1>
   )}
  </>
 );
};

const GridContainer = styled.div`
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
 gap: 20px;
 padding: 20px;
`;

export default SeeMore;
