const TWO_HOURS = 1000 * 60 * 60 * 2;

const SESS_LIFETIME = TWO_HOURS;

module.exports = {
  name: "sid",
  resave: false,
  saveUninitialized: false,
  secret: "super secret key",
  // store - set this to sequelize
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true, // "stops CSRF",
    secure: false, // save on non - HTTPS calls
  },
};
