import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
 const [input, setInput] = useState("");
 const [searchData, setSearchData] = useState([]);
 const [showSeeMore, setShowSeeMore] = useState(false);

 const containerRef = useRef();

 const fetchData = (e) => {
  e.preventDefault();
  fetch(`https://api.jikan.moe/v4/anime?q=${input}`)
   .then((res) => res.json())
   .then((resData) => {
    setSearchData(resData.data);
    setShowSeeMore(true);
   });
 };

 useEffect(() => {
  const handleClickOutside = (event) => {
   if (containerRef.current && !containerRef.current.contains(event.target)) {
    setSearchData([]);
    setShowSeeMore(false);
   }
  };
  document.addEventListener("mousedown", handleClickOutside);

  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, []);

 return (
  <SearchContainer ref={containerRef}>
   <form onSubmit={fetchData}>
    <StyledInput
     placeholder="Type to search"
     value={input}
     onChange={(e) => {
      setInput(e.target.value);
     }}
    />

    <ResultsContainer>
     {searchData.slice(0, 6).map((el) => (
      <Results key={el.mal_id}>
       <StyledLink to={`/Anime/${el.mal_id}`}>
        <ResultsDisplayed>
         <Image src={el.images.jpg.image_url} alt={el.title} />
         <InfoContent>
          <ResultsText>{el.title}</ResultsText>
          <Info>{el.duration} </Info>
          <Info>{el.aired.string} </Info>
         </InfoContent>
        </ResultsDisplayed>
       </StyledLink>
      </Results>
     ))}
     {showSeeMore && (
      <LinkContent>
       <SeeMoreLink href={`/Anime/SearchResult/${input}`}>
        View Results for {input}
       </SeeMoreLink>
      </LinkContent>
     )}
    </ResultsContainer>
    <SearchButton type="submit">
     <StyledSearchIcon />
    </SearchButton>
   </form>
  </SearchContainer>
 );
};

const StyledInput = styled.input`
 background-color: #4d4d4d;
 color: white;
 font-size: 17px;
 padding: 3px;
 border: none;
 height: 30px;
 width: 400px;
 border-radius: 10px;

 &::placeholder {
  color: #cccccc;
 }

 &:focus {
  transition-duration: 0.5s;
 }
`;

const SearchButton = styled.button`
 background: none;
 border: none;
 padding: 0;
 cursor: pointer;
 position: absolute;
 right: 10px;
 top: 10px;
`;

const StyledSearchIcon = styled(FiSearch)`
 color: white;
 font-size: 18px;
`;

const SearchContainer = styled.div`
 position: relative;
 display: flex;
 align-items: center;
 z-index: 10;
`;

const ResultsContainer = styled.div`
 position: absolute;
 top: 100%;
 left: 0;
 width: 100%;
 max-height: 500px;
 border-radius: 10px;
 background-color: #262626;
`;

const Image = styled.img`
 width: 50px;
 height: 50px;
 object-fit: cover;
 border-radius: 5px;
`;

const ResultsText = styled.span`
 font-size: 17px;
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
 width: 350px;
 max-width: 350px;
 color: #a6a6a6;
 font-weight: bold;
`;

const InfoContent = styled.div`
 display: flex;
 flex-direction: column;
 margin-left: 5px;
`;

const Info = styled.span`
 font-size: 12px;
 color: #808080;
 font-weight: bold;
`;

const Results = styled.div`
 display: flex;
`;

const ResultsDisplayed = styled.div`
 display: flex;
 margin: 2.5px;
 border-radius: 10px;

 &:hover {
  background-color: #333333;
  transition-duration: 0.5s;

  ${ResultsText}, ${Info} {
   color: #d9d9d9;
   transition-duration: 0.5s;
  }
 }
`;

const StyledLink = styled(Link)`
 text-decoration: none;
`;

const SeeMoreLink = styled.a`
 text-decoration: none;
 color: #a6a6a6;
 font-weight: bold;

 &:hover {
  color: #e6e6e6;
  transition-duration: 0.5s;
 }
`;

const LinkContent = styled.div`
 display: flex;

 justify-content: center;
 margin: 10px;
`;

export default SearchBar;
