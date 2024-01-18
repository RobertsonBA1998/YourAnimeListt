"use strict";

//imported modules
const express = require("express");
const morgan = require("morgan");

//hanlders import here

const {
 getData,
 getUser,
 postData,
 patchData,
 deleteData,
} = require("./handlers");

express()
 .use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
   "Access-Control-Allow-Methods",
   "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
 })

 .use(morgan("tiny"))
 .use(express.json())
 .use(express.static("public"))

 //endpoints
 .get("/api/get-data/", getData)

 .get("/api/get-data/:user_id", getUser)

 .post("/api/get-data/:user_id", postData)

 .patch("/api/get-data/:user_id", patchData)

 .delete("/api/get-data/:user_id/:mal_id", deleteData)

 //end of endpoints

 //testing if server is runnin
 .get("*", (req, res) => {
  res.status(404).json({
   status: 404,
   message: "Server is running",
  });
 })

 // Node spins up our server and sets it to listen on port 8000.
 .listen(8000, () => console.log(`Listening on port 8000`));
