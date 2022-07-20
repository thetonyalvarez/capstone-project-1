"use strict";

/** Routes for authentication. */
require("dotenv").config();

const authURL = 'https://launchpad.37signals.com/authorization/new'
const tokenURL = `https://launchpad.37signals.com/authorization/token`

const express = require("express");
const router = new express.Router();
const querystring = require("querystring")
const request = require("request")
const { BadRequestError } = require("../expressError");

const config = {
  type: "web_server",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: process.env.REDIRECT_URI
}

/** GET /auth
 *
 */

router.get("/", async function (req, res, next) {
  try {
    res.redirect(`${authURL}?${querystring.stringify(config)}`);
  } catch (err) {
    return next(err);
  }
});

/** GET /auth/callback
 *
 */

router.get("/callback", async function (req, res, next) {
  const code = req.query.code || null;
  config.code = code
  config.url = `${tokenURL}?${querystring.stringify(config)}`

  try {
    request.post(config, function (error, response, body) {
      if (error) throw new BadRequestError(error)
      const access_token = body.access_token
      const refresh_token = body.refresh_token
      res.json(body)
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
