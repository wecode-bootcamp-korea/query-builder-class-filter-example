const { userService } = require('../services');
const { catchAsync } = require('../utils/error');

const signUp = catchAsync(async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const insertId = await userService.signUp(email, password, name);

  res.status(201).json({ insertId });
});

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const accessToken = await userService.signIn(email, password);

  res.status(200).json({ accessToken });
});

const updateUser = catchAsync(async (req, res) => {
  const { user_id, image_url } = req.body;
  const image = req.file;
  const result = await userService.updateUserProfileImage(user_id, image);

  res.status(200).json({ result: result });
});

const kakaoLogin = catchAsync(async (req, res) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    const error = new Error('ACCESS_TOKEN_REQUIRED');
    error.statusCode = 400;
    throw error;
  }

  const [token, statusCode] = await userService.kakaoLogin(accessToken);

  res.status(statusCode).json({ message: 'SUCCESS', token });
});

module.exports = {
  signUp,
  signIn,
  updateUser,
  kakaoLogin,
};
