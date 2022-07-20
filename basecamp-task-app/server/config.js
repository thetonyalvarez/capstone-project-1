"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors")

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:8888/auth/callback';
let FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:3000';
const PORT = process.env.PORT || 8888;

if (process.env.NODE_ENV !== 'production') {
  REDIRECT_URI = 'http://localhost:8888/auth/callback';
  FRONTEND_URI = 'http://localhost:3000';
}

console.log("BC3 Reporting App Config:".green);
console.log("CLIENT_ID:".yellow, CLIENT_ID);
console.log("CLIENT_SECRET:".yellow, CLIENT_SECRET);
console.log("Redirect URI:".yellow, REDIRECT_URI);
console.log("Frontend URI:".yellow, FRONTEND_URI);
console.log("Port:".yellow, PORT);
console.log("---");

module.exports = {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  FRONTEND_URI,
  PORT
};
