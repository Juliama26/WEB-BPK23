import Sequelize from "sequelize";
const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "260602",
  database: "bpk23",
});
export default db;
