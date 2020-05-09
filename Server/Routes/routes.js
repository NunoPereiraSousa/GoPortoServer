const express = require('express');
const router = express.Router();
const userController = require("../Controller/users.controller");
const identityController = require("../Controller/identities.controller");
const itineraryController = require("../Controller/itineraries.controller");
const categoryController = require("../Controller/categories.controller");
const logAndRegController = require("../Controller/log.Controller");
const suggestionsController = require("../Controller/suggestions.Controller");
const notificationController = require("../Controller/notification.controller");
const expressSanitizer = require('express-sanitizer');

router.use(expressSanitizer())

// USERS routers
router.get("/users", userController.getUsers)
router.get("/users/:id", userController.getUserByID)
router.post("/add-users", userController.addUsers)
router.put("/users/update/:id", userController.updateUser)
router.put("/users/delete/:id", userController.deleteUser)

// IDENTITIES routers
router.get("/identities", identityController.getIdentities)
router.get("/identities/:id", identityController.getIdentityByID)
router.post("/add-identities", identityController.addIdentity)
router.put("/identities/update/:id", identityController.updateIdentity)
router.put("/identities/delete/:id", identityController.deleteIdentity)

// ITINERARIES routers
router.get("/itineraries", itineraryController.getItineraries)
router.get("/itineraries/:id", itineraryController.getItineraryByID)
router.post("/add-itineraries", itineraryController.addItinerary)
router.put("/itineraries/update/:id", itineraryController.updateItinerary)
router.put("/itineraries/delete/:id", itineraryController.deleteItinerary)

// CATEGORIES routers
router.get("/categories", categoryController.getCategories)
router.get("/categories/:id", categoryController.getCategoryByID)
router.post("/add-categories", categoryController.addCategory)
router.put("/categories/update/:id", categoryController.updateCategory)
router.put("/categories/delete/:id", categoryController.deleteCategory)

// LOGIN & REGISTER routers
router.get("/loginUsers", logAndRegController.logUser)
router.post("/reg-users", logAndRegController.signUpUser)

// SUGGESTIONS routers
router.get("/suggestions", suggestionsController.getSuggestion)
router.put("/suggestions/update/:id", suggestionsController.updateSuggestion)

// NOTIFICATION routers 
router.get("/notification/:id", notificationController.getNotificationByUserId)
router.post("/add-notification", notificationController.addNotification)
router.put("/notification/update", notificationController.updateNotification)




module.exports = router