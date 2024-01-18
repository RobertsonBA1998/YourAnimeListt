import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AnimeDisplay = (props) => {
 const { mal_id, image, title, rating, rank, status } = props;

 return (
  <AnimeCard key={mal_id}>
   <Tag>
    <Rank>
     <RankNumber>{rank || "?"}</RankNumber>
    </Rank>
   </Tag>
   <Link to={`/Anime/${mal_id}`}>
    <Image src={image} alt={title} />
   </Link>
   <Title>{title}</Title>
   <Info>{status}</Info>
   <Info>{rating}</Info>
  </AnimeCard>
 );
};

const Title = styled.span`
 font-weight: bold;
 margin-top: 5px;
 margin-bottom: 5px;
 text-align: center;
 color: #808080;
 margin-top: 10px;
`;

const Info = styled.span`
 color: #808080;
`;

const AnimeCard = styled.div`
 position: relative;
 border-radius: 2%;
 display: grid;
 justify-items: center;
 align-items: center;
 padding: 20px;
 box-shadow: 0px 0px 25px rgba(0, 0, 0, 0), 0 0 0 3.5px #5a2e98;

 &:hover {
  background-color: #333333;
  transition-duration: 0.5s;

  ${Title}, ${Info} {
   color: white;
   transition-duration: 0.5s;
  }
 }
`;

const Rank = styled.span`
 margin: 0;
 font-size: 24px;
`;

const Image = styled.img`
 border-radius: 2%;
 width: 222px;
 height: 300px;
 object-fit: cover;
`;

const Tag = styled.div`
 position: absolute;
 top: 20px;
 left: 27px;
 background-color: white;
 width: 40px;
 height: 30px;
 border-radius: 25% 10%;
 display: flex;
 align-items: center;
 justify-content: center;
 text-align: center;
 border: 1.8px solid white;
 background-color: #5a2e98;
`;

const RankNumber = styled.span`
 font-weight: bold;
 font-size: 18px;
 color: white;
 font-style: italic;
`;

export default AnimeDisplay;
