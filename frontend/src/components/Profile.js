import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import defaultImage from "./images/profile.jpg";

const Profile = () => {
 const { user, isAuthenticated, isLoading } = useAuth0();
 const [nameInput, setNameInput] = useState("");
 const [userData, setUserData] = useState([]);

 const _id = user?.sub;

 useEffect(() => {
  if (_id) {
   fetch(`http://localhost:8000/api/get-data/${_id}`)
    .then((res) => res.json())
    .then((resData) => {
     setUserData(resData.users);
    });
  }
 }, [_id]);

 useEffect(() => {
  if (nameInput === "") {
   fetch(`http://localhost:8000/api/get-data/${_id}`)
    .then((res) => res.json())
    .then((resData) => {
     setUserData(resData.users);
    });
  }
 }, [nameInput]);

 if (isLoading) {
  return <div>Loading ...</div>;
 }

 if (!user) {
  return <NotLoggedIn>Log in to view your Profile</NotLoggedIn>;
 }

 const fetchData = (e) => {
  e.preventDefault();
  fetch(`http://localhost:8000/api/get-data/${_id}`, {
   method: "PATCH",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ name: nameInput }),
  })
   .then((response) => response.json())
   .then((data) => {
    console.log(data);
    if (data.status === 200) {
     setUserData(data.users);
     setNameInput("");
    }
   })
   .catch((error) => {
    console.error(error);
   });
 };

 console.log(user.name);

 return (
  isAuthenticated && (
   <>
    <h1>Profile</h1>
    <Content>
     <ProfileWrapper>
      <Avatar
       src={user.picture || defaultImage}
       alt={user.name || "Default Image"}
      />
      <Info>
       {!userData ? (
        <div>Loading...</div>
       ) : userData.sub_name ? (
        userData.sub_name.map((el) => <Username> Welcome {el.name}!</Username>)
       ) : (
        <Username> Welcome User!</Username>
       )}
       <Details>Email: {user.email || "No Email Registered"}</Details>
       <Details>
        Last Updated: {new Date(user.updated_at).toLocaleString()}
       </Details>
       <Details>Language: {user.locale || "en"} </Details>
       <form onSubmit={fetchData}>
        <InputName
         placeholder="Change username here"
         value={nameInput}
         onChange={(e) => {
          setNameInput(e.target.value);
         }}
        />
        <Button type="submit">Submit</Button>
       </form>
      </Info>
     </ProfileWrapper>
    </Content>
   </>
  )
 );
};

const Content = styled.div`
 display: flex;
 justify-content: center;
`;

const NotLoggedIn = styled.h1`
 text-align: center;
`;

const ProfileWrapper = styled.div`
 display: flex;
 border: 3.5px solid #9e76d6;
 border-radius: 15px;
 max-width: 550px;
 justify-content: center;
`;

const Avatar = styled.img`
 border-radius: 50%;
 width: 200px;
 height: 200px;
 object-fit: cover;
`;

const Username = styled.h2`
 font-size: 22px;
 font-weight: 700;
 margin-right: 25px;
`;

const Details = styled.span`
 color: #d9d9d9;
 font-size: 15px;
 margin: 5px;
`;

const Info = styled.div`
 display: flex;
 flex-direction: column;
`;

const Button = styled.button`
 margin-left: 10px;
 width: auto;
 height: 20px;
 border-radius: 2px;
 background-color: #9e76d6;
 color: white;

 &:hover {
  background-color: #824eca;
  transition-duration: 0.5s;
 }
`;

const InputName = styled.input`
 border-radius: 2px;
`;

export default Profile;
