const express = require('express');
const multer = require('multer');
const upload = multer();

const { userController } = require('../controllers');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.post('/profile', upload.single('fieldname'), userController.updateUser);
router.get('/kakao-login', userController.kakaoLogin);

module.exports = router;
