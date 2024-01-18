import React, { useState, useEffect } from "react";
import styled from "styled-components";

import AnimeDisplay from "./AnimeDisplay";

const SeasonalAnime = () => {
 const [seasonalAnimeData, setSeasonalAnimeData] = useState([]);

 useEffect(() => {
  fetch("https://api.jikan.moe/v4/seasons/now")
   .then((res) => res.json())
   .then((resData) => {
    setSeasonalAnimeData(resData.data);
   });
 }, []);

 if (!seasonalAnimeData) {
  return <div>Loading...</div>;
 }

 return (
  <>
   <h1>Top Current Season Anime</h1>

   <GridContainer>
    {seasonalAnimeData.map((el) => (
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

export default SeasonalAnime;
