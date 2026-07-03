const express = require("express");
const router = express.Router();
const {
   handleGetAllUsers,
   handleGetUserById,
   handleUpdateUserById,
   handleDeleteUserById,
   handleCreateNewUserById,
} 
    = require('../controllers/user');


router.route("/")
   .get(handleGetAllUsers)
   .post(handleCreateNewUserById);
               

// by id
 router
 .route("/:id") //  app.route("/api/users/:id") for specific user 
 .get(handleGetUserById)
 .patch(handleUpdateUserById)
 .delete(handleDeleteUserById);

 module.exports = router;
