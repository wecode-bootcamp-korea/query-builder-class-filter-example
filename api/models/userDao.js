const dataSource = require('./dataSource');

const createUser = async (
  email,
  profileImageUrl,
  socialId,
  socialTypeId,
  socialNickname
) => {
  const result = await dataSource.query(
    `
      INSERT INTO users (
        email, 
        profile_image_url,
        social_id,
        social_type_id,
        social_nickname
      ) VALUES (
        ?,?,?,?,?
      );
    `,
    [email, profileImageUrl, socialId, socialTypeId, socialNickname]
  );

  return result.insertId;
};

const getUserByEmail = async (email) => {
  const result = await dataSource.query(
    `
		SELECT 
			id,
			name,
			email,
			password
		FROM users
		WHERE email=?`,
    [email]
  );

  return result[0];
};

const getUserById = async (id) => {
  const result = await dataSource.query(
    `
		SELECT 
			id,
			name,
			email,
			password
		FROM users
		WHERE id=?`,
    [id]
  );

  return result[0];
};

const updateUserProfileImage = async (id, image_url) => {
  const result = await dataSource.query(
    `
    UPDATE users 
	SET profile_image_url = ? 
	WHERE id = ?;	  
  `,
    [image_url, id]
  );

  const [user] = await dataSource.query(
    `
	    SELECT 
		  id,
		  profile_image_url
		FROM users
		WHERE id = ?;
	  `,
    [id]
  );
  console.log(user);
  return user;
};

const getUserByKakaoId = async (kakaoId) => {
  const [user] = await dataSource.query(
    `
      SELECT * 
      FROM users 
      WHERE social_id = ?
      AND social_type_id = ?
    `,
    [kakaoId, 1]
  );

  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserProfileImage,
  getUserByKakaoId,
};
