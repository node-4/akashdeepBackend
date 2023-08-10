const express = require("express");
const router = express.Router();
const userController = require("../controller/remitter1");

// CREATE - POST request to create a new user document
router.post("/", userController.createRemitter);

// READ - GET request to retrieve all user documents
// router.get("/users", userController.getAllUsers);

// // READ - GET request to retrieve a specific user document by ID
// router.get("/users/:id", userController.getUserById);

// // UPDATE - PUT request to update a specific user document by ID
// router.put("/users/:id", userController.updateUserById);

// // DELETE - DELETE request to delete a specific user document by ID
// router.delete("/users/:id", userController.deleteUserById);
// router.post("/verifySignIn", userController.verifySignIn)
// router.post("/loginProfile1", userController.loginProfile1)
// router.post("/socialLogin", userController.socialLogin)

module.exports = router;
