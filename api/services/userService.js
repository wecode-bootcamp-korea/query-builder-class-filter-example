const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const { userDao } = require('../models');
const { uploadFile } = require('../utils/fileUpload');
const { SocialTypes } = require('../enums');

const hashPassword = async (plaintextPassword) => {
  const saltRounds = 10; //rounds=10: ~10 hashes/sec
  const salt = await bcrypt.genSalt(saltRounds);

  return await bcrypt.hash(plaintextPassword, salt);
};

const getUserById = async (id) => {
  return await userDao.getUserById(id);
};

const signUp = async (email, password, name) => {
  const emailRegex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  if (!emailRegex.test(email)) {
    const error = new Error('INVALID_EMAIL');
    error.statusCode = 401;

    throw error;
  }

  if (!passwordRegex.test(password)) {
    const error = new Error('INVALID_PASSWORD');
    error.statusCode = 401;

    throw error;
  }

  const hashedPassword = await hashPassword(password);

  return await userDao.createUser(email, hashedPassword, name);
};

const signIn = async (email, password) => {
  const emailRegex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  if (!emailRegex.test(email)) {
    const error = new Error('INVALID_EMAIL');
    error.statusCode = 401;

    throw error;
  }

  if (!passwordRegex.test(password)) {
    const error = new Error('INVALID_PASSWORD');
    error.statusCode = 401;

    throw error;
  }

  const user = await userDao.getUserByEmail(email);

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    const error = new Error('WRONG_PASSWORD');
    error.statusCode = 401;

    throw error;
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return accessToken;
};

const updateUserProfileImage = async (id, image) => {
  const imageURL = await uploadFile(image);

  if (imageURL) {
    return await userDao.updateUserProfileImage(id, imageURL);
  }
};

const kakaoLogin = async (kakaoAccessToken) => {
  const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}`,
    },
  });

  const userInfo = response.data;

  let user = await userDao.getUserByKakaoId(userInfo.id);

  let statusCode = 200;

  if (!user) {
    const result = await userDao.createUser(
      userInfo.kakao_account.email,
      userInfo.properties.profile_image,
      userInfo.id,
      SocialTypes.Kakao,
      userInfo.properties.nickname
    );

    user = { id: result.insertId };
    statusCode = 201;
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return [accessToken, statusCode];
};

module.exports = {
  signUp,
  signIn,
  getUserById,
  updateUserProfileImage,
  kakaoLogin,
};
