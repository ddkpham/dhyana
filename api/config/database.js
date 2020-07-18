const Sequelize = require("sequelize");
// TODO: local user atm. change to more general user later

console.log("DB Host IP: ", process.env.DB_HOST);
console.log("process.env.POSTGRES_USER", process.env.POSTGRES_USER);
module.exports = new Sequelize(
  process.env.TEST_DB || "dhyana",
  process.env.POSTGRES_USER || "postgres",
  "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: 5433,

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
