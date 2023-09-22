const { DataSource } = require('typeorm');
require('dotenv').config();

const dataSourceAirbnb = new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'airbnb_james',
});

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

dataSourceAirbnb.initialize().then(async () => {
  await AppDataSource.initialize();

  const getUserDataFromAirbnbDataSource = async () => {
    const users = await dataSourceAirbnb.query(
      `
        SELECT *
        FROM users
      `
    );

    const data = [];

    for (const user of users) {
      data.push([user.id, user.email, null, user.kakao_id, 1, null]);
    }

    return data;
  };

  const data = await getUserDataFromAirbnbDataSource();

  const insertUserDataToAllInOneDataBase = async (data) => {
    await AppDataSource.query(
      `
        INSERT INTO users (
          id,
          email,
          profile_image_url,
          social_id,
          social_type_id,
          social_nickname
        ) VALUES ?
      `,
      [data]
    );
  };

  await insertUserDataToAllInOneDataBase(data);
});
