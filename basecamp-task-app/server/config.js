"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors")

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:8888/auth/callback';
let PORT = process.env.PORT || '8888'

if (process.env.NODE_ENV !== 'production') {
  REDIRECT_URI = 'http://localhost:8888/auth/callback';
}

console.log("BC3 Reporting App Config:".green);
console.log("CLIENT_ID:".yellow, CLIENT_ID);
console.log("CLIENT_SECRET:".yellow, CLIENT_SECRET);
console.log("Redirect URI:".yellow, REDIRECT_URI);
console.log("---");

module.exports = {
  CLIENT_ID,
  CLIENT_SECRET,
  PORT
};
