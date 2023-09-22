require('dotenv').config();

const crypto = require('crypto');
const AWS = require('aws-sdk');
const fs = require('fs');

// const s3 = new AWS.S3({
//   accessKeyID: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: 'ap-northeast-2',
// });

const uploadFile = async (file) => {
  const s3 = new AWS.S3({
    accessKeyID: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
  });
  console.log(file);

  const params = {
    Bucket: 'jack-file-storage', // bucket you want to upload to
    Key: crypto.randomUUID(), // put all image to fileupload folder with name scanskill-${Date.now()}${file.name}`
    Body: file.buffer,
  };

  const data = await s3.upload(params).promise();
  // console.log(data);
  return data.Location; // returns the url location
};

module.exports = {
  uploadFile,
};
