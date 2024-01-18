import React, { useState, useEffect } from "react";
import styled from "styled-components";

import AnimeDisplay from "./AnimeDisplay";

const TopAnimes = () => {
 const [topAnimeData, setTopAnimeData] = useState([]);

 useEffect(() => {
  fetch("https://api.jikan.moe/v4/top/anime")
   .then((res) => res.json())
   .then((resData) => {
    setTopAnimeData(resData.data);
   });
 }, []);

 if (!topAnimeData) {
  return <div>Loading...</div>;
 }

 return (
  <>
   <h1>Top Anime Series</h1>

   <GridContainer>
    {topAnimeData.map((el) => (
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
  </>
 );
};

const GridContainer = styled.div`
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
 gap: 20px;
 padding: 20px;
`;

export default TopAnimes;
