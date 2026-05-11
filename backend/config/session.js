import session from "express-session";

const sessionConfig = session({
  secret: "manpro_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
});

export default sessionConfig;