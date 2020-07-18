"use strict";

require("dotenv").config();
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const params = {
  Bucket: process.env.AWS_S3_BUCKET_NAME,
  Key: process.env.AWS_S3_KEY_FILE_NAME,
};
module.exports = (req, res) => {
  s3.getObject(params, (err, data) => {
    if (err) {
      res.send([]);
      return;
    }
    res.send(data.Body.toString());
  });
};
