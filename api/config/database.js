const Sequelize = require("sequelize");
// TODO: local user atm. change to more general user later

console.log("DB Host IP: ", process.env.DB_HOST);
module.exports = new Sequelize(
  process.env.TEST_DB || "dhyanadb",
  // "davidpham", // local connection
  process.env.POSTGRES_USER || "davidpham",
  "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",

    pool: {
      max: 5,
      min: 0,
      idle: 30000,
      acquire: 60000,
    },

    define: {
      timestamps: false,
    },
  }
);
