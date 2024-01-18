"use strict";

const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
 useNewUrlParser: true,
 useUnifiedTopology: true,
};

// GETS an array of all "data" collection
const getData = async (req, res) => {
 const client = new MongoClient(MONGO_URI, options);
 try {
  await client.connect();
  console.log("client on");

  const db = client.db("data");

  const data = await db.collection("users").find().toArray();

  if (data.length > 0) {
   res.status(200).json({ status: 200, data });
  } else {
   res.status(404).json({ status: 404, message: "Data not found" });
  }
 } catch (error) {
  console.log(error);
  res.status(404).json({ status: 404, message: "Error fetching data" });
 } finally {
  client.close();
  console.log("client off");
 }
};

//GETS user information by user_id
const getUser = async (req, res) => {
 const client = new MongoClient(MONGO_URI, options);

 try {
  await client.connect();
  console.log("client on");

  const db = client.db("data");

  const user_id = req.params.user_id;

  const users = await db.collection("users").findOne({ user_id: user_id });

  if (users) {
   res.status(200).json({ status: 200, users });
  } else {
   res.status(404).send({ status: 404, message: "User not found" });
  }
 } catch (error) {
  console.log(error);
  res.status(500).json({ status: 500, message: "Error getting data of user" });
 } finally {
  await client.close();
  console.log("client off");
 }
};

//POST create data and add mal_id (anime list)
const postData = async (req, res) => {
 const client = new MongoClient(MONGO_URI, options);

 try {
  await client.connect();

  console.log("client on");

  const user_id = req.params.user_id;
  const { mal_id } = req.body;

  const db = client.db("data");
  const users = await db.collection("users").findOne({ user_id: user_id });
  // verify if user exists
  if (!users) {
   return res.status(404).json({ status: 404, message: "User not found" });
  }

  // verify required fields
  if (!mal_id) {
   return res
    .status(400)
    .json({ status: 400, message: "Missing required field: mal_id" });
  }

  // check if the user already has a specific mal_id in their mal_data array
  const existingMal = await db.collection("users").findOne({
   user_id: user_id,
   mal_data: { $elemMatch: { mal_id } },
  });

  if (existingMal) {
   return res.status(404).json({
    status: 404,
    message: "User already has that mal_id",
   });
  }

  const updateData = await db.collection("users").updateOne(
   { user_id: user_id },
   {
    $push: { mal_data: { mal_id } },
   }
  );

  if (!updateData) {
   res.status(404).json({
    status: 404,
    message: "Error updating user data",
   });
  } else {
   res.status(200).json({
    status: 200,
    message: "User data has been updated",
   });
  }
 } catch (error) {
  console.log(error);
  res.status(500).json({ status: 500, message: "Error posting data" });
 } finally {
  await client.close();
  console.log("client off");
 }
};

// PATCH request for name
const patchData = async (req, res) => {
 const client = new MongoClient(MONGO_URI, options);

 try {
  await client.connect();

  console.log("client on");

  const user_id = req.params.user_id;
  const { name } = req.body;

  const db = client.db("data");
  const user = await db.collection("users").findOne({ user_id: user_id });

  // verify if user exists
  if (!user) {
   return res.status(404).json({ status: 404, message: "User not found" });
  }

  // verify required fields
  if (!name) {
   return res
    .status(400)
    .json({ status: 400, message: "Missing required field: name" });
  }

  // initialize sub_name if it doesn't exist
  if (!user.sub_name) {
   await db
    .collection("users")
    .updateOne({ user_id: user_id }, { $set: { sub_name: [{ name: name }] } });
  } else {
   // if sub_name exists, update the name within the first object
   await db
    .collection("users")
    .updateOne({ user_id: user_id }, { $set: { "sub_name.0.name": name } });
  }

  // update main name
  const updateData = await db
   .collection("users")
   .updateOne({ user_id: user_id }, { $set: { name: name } });

  if (!updateData) {
   res.status(404).json({
    status: 404,
    message: "Error updating user data",
   });
  } else {
   res.status(200).json({
    status: 200,
    message: "User data has been updated",
   });
  }
 } catch (error) {
  console.log(error);
  res.status(500).json({ status: 500, message: "Error updating data" });
 } finally {
  await client.close();
  console.log("client off");
 }
};

// DELETE request to remove a mal_id from users mal_data array
const deleteData = async (req, res) => {
 const client = new MongoClient(MONGO_URI, options);

 try {
  await client.connect();

  console.log("client on");

  const user_id = req.params.user_id;
  const mal_id = req.params.mal_id;

  const db = client.db("data");
  const users = await db.collection("users").findOne({ user_id: user_id });
  // verify if user exists
  if (!users) {
   return res.status(404).json({ status: 404, message: "User not found" });
  }

  // check if the user has the specified mal_id in their mal_data array
  const existingMal = await db.collection("users").findOne({
   user_id: user_id,
   mal_data: { $elemMatch: { mal_id } },
  });

  if (!existingMal) {
   return res.status(404).json({
    status: 404,
    message: "mal_id doesn't exist",
   });
  }

  const updateData = await db.collection("users").updateOne(
   { user_id: user_id },
   {
    $pull: { mal_data: { mal_id } },
   }
  );

  if (!updateData) {
   res.status(404).json({
    status: 404,
    message: "Error updating user data",
   });
  } else {
   res.status(200).json({
    status: 200,
    message: "User data has been updated",
   });
  }
 } catch (error) {
  console.log(error);
  res.status(500).json({ status: 500, message: "Error deleting data" });
 } finally {
  await client.close();
  console.log("client off");
 }
};

module.exports = {
 getData,
 getUser,
 postData,
 patchData,
 deleteData,
};
