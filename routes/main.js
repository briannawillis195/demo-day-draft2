const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const communityForumController = require("../controllers/communityforum")
const booksearchController = require("../controllers/booksearch")
const bookrecsController = require("../controllers/bookrecs")



const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

//Main Routes for app
router.get("/bookrecs", bookrecsController.getBookRecs)
router.get("/dobooksearch", booksearchController.getBookSearch)
router.get("/bookrecs", ensureAuth, postsController.getBookRecs)
router.get("/communityforum", ensureAuth, postsController.getCommunityForum)
router.get("/booksearch", ensureAuth, booksearchController.getProfile);
router.post("/communityforum", communityForumController.postMessage)
router.post("/bookmark", booksearchController.createBookmark)
router.get("/bookmarks", booksearchController.getBookmarks)
router.post("/bookmarks/:id", booksearchController.updateStatus)
router.post("communityform/reply", communityForumController.replyToMessage)
router.put("/communityforum/thumbUp", communityForumController.thumbUpMessage)
//router.post("/postbookrecs", bookrecsController.getResponse )




module.exports = router;
