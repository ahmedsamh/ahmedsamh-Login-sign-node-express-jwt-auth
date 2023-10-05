const { Router } = require("express");
const authController = require("../controllers/authController");
// upload image
const express = require("express");
const path = require("path");
const multer = require("multer");

const router = Router();

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);

// upload image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/api/upload", upload.single("image"), (req, res) => {
  res.status(200).json({ message: "image uploaded" });
});

module.exports = router;
