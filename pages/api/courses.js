"use strict";
const request = require("request");
/** mask */
module.exports = (req, res) => {
  request.get(
    `https://test-lamda-load.s3.eu-central-1.amazonaws.com/data.json`,
    async (error, response, data) => {
      res.send(data);
    }
  );
};
