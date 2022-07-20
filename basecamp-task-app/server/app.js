// server.js
const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const app = express();

const authRoutes = require("./routes/auth");

app
  .use(cors())
  .use(express.json())

// Middlewares...
// Routes...

app.use("/auth", authRoutes);

// 404 handler.
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

// generic error handler
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "development") console.error(err.stack);
	// default 500
	let status = err.status || 500;
	let message = err.message;

	return res.status(status).json({ error: { message, status } });
});

module.exports = app