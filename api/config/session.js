const TWO_HOURS = 1000 * 60 * 60 * 2;

const SESS_LIFETIME = TWO_HOURS;
const SESS_NAME = "sid";

module.exports = {
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: "super secret key",
  // TODO: store - set this to sequelize | currently in memory store
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true, // "stops CSRF",
    secure: false, // save on non - HTTPS calls
  },
};
