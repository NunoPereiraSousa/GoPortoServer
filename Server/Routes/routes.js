const express = require('express');
const router = express.Router();
const userController = require("../Controller/users.controller");
const identityController = require("../Controller/identities.controller");
const itineraryController = require("../Controller/itineraries.controller");
const categoryController = require("../Controller/categories.controller");
const logAndRegController = require("../Controller/log.Controller");
const suggestionsController = require("../Controller/suggestions.Controller");
const notificationController = require("../Controller/notifications.controller");
const commentController = require("../Controller/comments.controller");
const postController = require("../Controller/posts.controller");
const followedItineraryController = require("../Controller/followedItinerary.controller");
const favoriteController = require("../Controller/favorite.controller");
const expressSanitizer = require('express-sanitizer');

router.use(expressSanitizer())

router.get("/home", itineraryController.ThreeMostFollowedItineraries)

// USERS routers
router.get("/users", userController.getUsers)
router.get("/users/:id", userController.getUserByID)
router.post("/add-users", userController.addUsers)
router.put("/users/update/:id", userController.updateUser)
router.put("/users/block/:id", userController.blockUser)
router.put("/users/delete/:id", userController.deleteUser)
router.post("/add-users-admin", userController.addUsersAdmin)

// IDENTITIES routers
router.get("/identities", identityController.getIdentities)
router.get("/identities/:id", identityController.getIdentityByID)
router.post("/add-identities", identityController.addIdentity)
router.put("/identities/update/:id", identityController.updateIdentity)
router.put("/identities/delete/:id", identityController.deleteIdentity)

// ITINERARIES routers
router.get("/itineraries", itineraryController.getItineraries)
router.get("/fullItineraries", itineraryController.getAllItinerariesComplete)
router.get("/itineraries/:id", itineraryController.getItineraryByID)
router.post("/add-itineraries", itineraryController.addItinerary)
// !
router.get("/itineraries-lastId", itineraryController.getLastItineraryId)
router.post("/itineraries_identities", itineraryController.addIdentityItinerary)
// !
router.put("/itineraries/update/:id", itineraryController.updateItinerary)
router.put("/itineraries/delete/:id", itineraryController.deleteItinerary)

// CATEGORIES routers
router.get("/categories", categoryController.getCategories)
router.get("/categories/:id", categoryController.getCategoryByID)
router.post("/add-categories", categoryController.addCategory)
router.put("/categories/update/:id", categoryController.updateCategory)
router.put("/categories/delete/:id", categoryController.deleteCategory)

// LOGIN & REGISTER routers
router.post("/login", logAndRegController.logUser)
router.post("/register", logAndRegController.signUpUser)

// SUGGESTIONS routers
router.get("/suggestions", suggestionsController.getSuggestions)
router.put("/suggestions/update/:id", suggestionsController.updateSuggestion)
router.post("/add-suggestions", suggestionsController.addSuggestion)

// NOTIFICATIONS routers 
router.get("/notifications/:id", notificationController.getNotificationByUserId)
router.post("/add-notifications", notificationController.addNotification)
router.put("/notifications/update", notificationController.updateNotification)

// COMMENTS routes
router.get("/comments/:id", commentController.getCommentsByIdentityId)
router.post("/add-comments", commentController.addComment)

// POSTS routes
router.get("/posts/:id", postController.getPostByUserId)
router.post("/add-posts", postController.addPost)
router.put("/posts/delete/:id", postController.deletePost)

// FOLLOWED ITINERARY routes
router.get("/followedItineraries", followedItineraryController.getAllFollowed)
router.get("/followedItineraries/:id", followedItineraryController.getFollowedByUserId)
router.post("/add-followedItineraries", followedItineraryController.addFollowed)
router.put("/followedItineraries/delete", followedItineraryController.deleteFollowed)

// FAVORITE IDENTITY routes
router.get("/favorites/:id", favoriteController.getFavoriteByUserId)
router.post("/add-favorite", favoriteController.addFavorite)
router.put("/favorites/delete", favoriteController.deleteFavorite)

module.exports = router