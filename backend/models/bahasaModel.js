import db from "../config/database.js";
import { DataTypes } from "sequelize";
import User from "./usersModel.js";

const Bahasa = db.define(
  "bahasa",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    provinsi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kota: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    dialek: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    namaDialek: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    etnis: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    jenis: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    fotoPath: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    documentPath: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);
User.hasMany(Bahasa);
Bahasa.belongsTo(User, { foreignKey: "userId" });
export default Bahasa;
