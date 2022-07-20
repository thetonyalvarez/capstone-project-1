"use strict";

/** Routes for authentication. */
require("dotenv").config();

const authURL = 'https://launchpad.37signals.com/authorization/new'
const tokenURL = `https://launchpad.37signals.com/authorization/token`

const express = require("express");
const router = new express.Router();
const querystring = require("querystring")
const request = require("request")
const { createToken } = require("../helpers/tokens");
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

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function (req, res, next) {
  console.log("IN")
  try {
  } catch (err) {
    console.log("OUT")
    return next(err);
  }
});


/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const newUser = await User.register({ ...req.body, isAdmin: false });
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
