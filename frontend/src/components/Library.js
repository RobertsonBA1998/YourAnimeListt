import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import AnimeDisplay from "./AnimeDisplay";

const Library = () => {
 const { user, isLoading } = useAuth0();
 const _id = user?.sub;

 const [libraryData, setLibraryData] = useState([]);
 const [animeData, setAnimeData] = useState([]);
 const [loading, setLoading] = useState(true);

 // Get Library information from the user, which are the mal_id's
 useEffect(() => {
  if (_id) {
   fetch(`http://localhost:8000/api/get-data/${_id}`)
    .then((res) => res.json())
    .then((resData) => {
     setLibraryData(resData.users.mal_data);
    });
  }
 }, [_id]);

 // Fetch anime data based on libraryData
 useEffect(() => {
  if (libraryData) {
   Promise.all(
    libraryData.map((animeData) =>
     fetch(`https://api.jikan.moe/v4/anime/${animeData.mal_id}`)
      .then((res) => res.json())
      .catch((error) => console.log(error))
    )
   )
    .then((resData) => {
     setAnimeData(resData);
     setLoading(false);
    })
    .catch((error) => {
     console.log(error);
    });
  } else {
   setLoading(false);
  }
 }, [libraryData]);

 if (loading || isLoading) {
  return <div>Loading</div>;
 }

 if (!user) {
  return <NotLoggedIn>Log in to view your Library</NotLoggedIn>;
 }

 return (
  <>
   <h1>Your Library</h1>
   {!libraryData && <EmptyLibrary>Your Library is Empty!</EmptyLibrary>}

   <GridContainer>
    {animeData
     .sort((a, b) => a.data.rank - b.data.rank)
     .map((el) => (
      <AnimeDisplay
       key={el.data.mal_id}
       mal_id={el.data.mal_id}
       image={el.data.images.jpg.image_url}
       title={el.data.title}
       rating={el.data.rating}
       rank={el.data.rank}
       status={el.data.status}
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

const NotLoggedIn = styled.h1`
 text-align: center;
`;

const EmptyLibrary = styled.h2`
 text-align: center;
`;

export default Library;
