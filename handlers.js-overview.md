## `handlers.js` Overview

The `handlers.js` file contains a set of functions that interact with the MongoDB database to handle various operations related to user data. These functions serve as the backend API endpoints for managing user information and anime data.

### `getData`

This function retrieves an array of all users and their associated data from the "data" collection in the MongoDB database. It establishes a connection to the database, fetches the data, and returns it as a JSON response.

**Endpoint:** `GET /api/get-data/`

### `getUser`

The `getUser` function retrieves user information based on the provided `user_id`. It queries the database to find a user with the matching `user_id` and returns their data as a JSON response.

**Endpoint:** `GET /api/get-data/:user_id`

### `postData`

This function handles the creation of anime data for a specific user. It requires a `user_id` and a `mal_id` in the request body. The function verifies the existence of the user, checks for required fields, and ensures that the `mal_id` is not duplicated in the user's data. It then updates the user's data in the database accordingly.

**Endpoint:** `POST /api/get-data/:user_id`

### `patchData`

The `patchData` function is responsible for updating the user's main name and sub_name based on the provided `user_id` and `name` in the request body. It handles scenarios where the user's `sub_name` field may or may not exist in the database. The function updates the user's data while ensuring that required fields are provided.

**Endpoint:** `PATCH /api/get-data/:user_id`

### `deleteData`

This function handles the removal of a specific `mal_id` from a user's data. It requires both `user_id` and `mal_id` as parameters. The function verifies the existence of the user and checks if the specified `mal_id` exists in the user's `mal_data` array. If the `mal_id` is found, it is removed from the array.

**Endpoint:** `DELETE /api/get-data/:user_id/:mal_id`

### `Important`

Each function in `handlers.js` establishes a connection to the MongoDB database, performs the necessary operations, and sends appropriate JSON responses based on the outcome of the operations. Proper error handling is implemented to handle different scenarios that might arise during database interactions.

These handlers collectively provide the backend functionality required for managing user accounts and their personalized anime lists in the YourAnimeList project.

---
