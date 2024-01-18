import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import { BsBookmarkStar } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const AnimeDetails = () => {
 const { mal_id } = useParams();

 const [animeData, setAnimeData] = useState({});
 const [message, setMessage] = useState("");
 const [loading, setLoading] = useState(true);

 const { user, loginWithRedirect, isAuthenticated } = useAuth0();

 const _id = user?.sub;

 useEffect(() => {
  fetch(`https://api.jikan.moe/v4/anime/${mal_id}`)
   .then((res) => res.json())
   .then((resData) => {
    setAnimeData(resData.data);
    setLoading(false);
   });
 }, [mal_id]);

 useEffect(() => {
  if (message) {
   const timer = setTimeout(() => {
    setMessage("");
   }, 5000);
   return () => clearTimeout(timer);
  }
 }, [message]);

 if (loading) {
  return <div>Loading</div>;
 }

 const postData = async (mal_id) => {
  if (!isAuthenticated) {
   loginWithRedirect();
   return;
  }

  try {
   const response = await fetch(`http://localhost:8000/api/get-data/${_id}`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({ mal_id }),
   });
   const data = await response.json();
   console.log(data);

   if ((data.status = 200)) {
    setMessage("Added To Library");
   }
   if (data.message === "User already has that mal_id") {
    setMessage("This Has Already Been Added");
   }
  } catch (error) {
   console.log(error);
  }
 };

 const deletetData = async (mal_id) => {
  if (!isAuthenticated) {
   loginWithRedirect();
   return;
  }

  try {
   const response = await fetch(
    `http://localhost:8000/api/get-data/${_id}/${mal_id}`,
    {
     method: "DELETE",
     headers: {
      "Content-Type": "application/json",
     },
    }
   );
   const data = await response.json();
   console.log(data);

   if ((data.status = 200)) {
    setMessage("Deleted From Library");
   }
   if (data.message === "mal_id doesn't exist") {
    setMessage("Anime Not In Library");
   }
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <>
   <CoverBackground src={animeData.images.jpg.large_image_url} />
   <Container>
    <Image src={animeData.images.jpg.image_url} alt="Anime Poster" />
    <Details>
     <Title>{animeData.title || "Unknown Title"}</Title>
     <Subtitle>{animeData.title_japanese || "Unknown Japanese Title"}</Subtitle>
     <Info>{animeData.rating || "Unknown Rating"}</Info>

     <CommunityInfo>
      <Info>
       <BookmarkStarIcon /> {animeData.scored_by?.toLocaleString() || "0"}
      </Info>
      <Info>
       <OutlineStarIcon /> {animeData.score || "0"}/10
      </Info>
     </CommunityInfo>

     <ButtonContent>
      <ButtonFunctionalityContent>
       <AddToListButton onClick={() => postData(mal_id)}>
        Add to List
       </AddToListButton>
       <DeleteButton onClick={() => deletetData(mal_id)}>
        <DeleteIcon />
       </DeleteButton>
       <Message>{message}</Message>
      </ButtonFunctionalityContent>
      <Genres>
       {animeData.genres?.map((genre) => (
        <GenreButton key={genre.mal_id}>{genre.name}</GenreButton>
       ))}

       {animeData.themes?.map((theme) => (
        <GenreButton key={theme.mal_id}>{theme.name}</GenreButton>
       ))}
      </Genres>
     </ButtonContent>
    </Details>
   </Container>
   <SynopsisContent>
    <Synopsis>{animeData.synopsis || "No synopsis available."}</Synopsis>
   </SynopsisContent>
  </>
 );
};

const CoverBackground = styled.img`
 position: absolute;
 top: 0;
 width: 100%;
 height: 350px;
 object-fit: cover;
 object-position: center top;
 filter: blur(0.75px) brightness(0.5);
 z-index: -1;
 border-bottom: 10px solid #5a2e98;
`;

const Container = styled.div`
 display: flex;
 flex-direction: row;
 margin-left: 100px;
`;

const Image = styled.img`
 border-radius: 2%;
 width: 222px;
 height: 300px;
 object-fit: cover;
 border: 2.5px solid #5a2e98;
 box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
`;

const Details = styled.div`
 margin-left: 20px;
`;

const Title = styled.h1`
 margin-bottom: 8px;
 color: white;
 font-size: 40px;
 max-width: 800px;
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
 line-height: 35px;
 margin-left: 20px;
`;

const Subtitle = styled.h2`
 font-size: 18px;
 margin-bottom: 16px;
 line-height: 30px;
 color: white;
 margin-left: 20px;
`;

const CommunityInfo = styled.div`
 display: flex;
`;

const Info = styled.h3`
 display: flex;
 font-size: 16px;
 margin-bottom: 8px;
 line-height: 20px;
 font-weight: bold;
 color: white;
 margin-left: 20px;
`;

const ButtonContent = styled.div`
 display: flex;
 flex-direction: column;
 position: relative;
 top: 16px;
`;

const ButtonFunctionalityContent = styled.div`
 display: flex;
 margin-bottom: 15px;
`;

const AddToListButton = styled.button`
 font-size: 14px;
 font-weight: bold;
 width: 100px;
 height: 40px;
 margin: 4px;
 background-color: #5a2e98;
 color: white;
 border-radius: 4px;
 cursor: pointer;
`;

const DeleteButton = styled.button`
 background: none;
 border: none;
 cursor: pointer;
 width: auto;
 height: auto;
`;

const Message = styled.span`
 position: relative;
 top: 10px;
 font-size: 20px;
 font-weight: bold;
 color: white;
`;

const DeleteIcon = styled(MdDelete)`
 font-size: 32px;
 color: red;
`;

const Genres = styled.div`
 display: flex;
`;

const GenreButton = styled.button`
 font-size: 13px;
 font-weight: bold;
 font-style: italic;
 padding: 8px 8px;
 margin: 4px;
 background-color: #2c2c2c;
 border: none;
 border-radius: 4px;
 color: white;
`;

const SynopsisContent = styled.div`
 max-width: 1500px;
`;

const Synopsis = styled.p`
 margin-left: 100px;
 margin-top: 30px;
 font-size: 16px;
 line-height: 1.5;
 text-align: justify;
`;

const BookmarkStarIcon = styled(BsBookmarkStar)`
 color: white;
 margin-right: 5px;
`;

const OutlineStarIcon = styled(AiOutlineStar)`
 color: white;
 margin-right: 5px;
 font-size: 20px;
`;

export default AnimeDetails;
