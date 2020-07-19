const Sequelize = require("sequelize");
// TODO: local user atm. change to more general user later

console.log("DB Host IP: ", process.env.DB_HOST);
console.log("process.env.POSTGRES_USER", process.env.POSTGRES_USER);
console.log("process.env.DB_PORT", process.env.DB_PORT);
module.exports = new Sequelize(
  process.env.TEST_DB || "dhyana",
  // "davidpham", // local connection
  process.env.POSTGRES_USER || "pruthvirajpatel",
  "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,

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
