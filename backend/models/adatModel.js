import db from "../config/database.js";
import { DataTypes } from "sequelize";
import User from "./usersModel.js";

const Adat = db.define(
  "adat",
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
    dilaksanakan: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    pelaksanaan: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    etnis: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    jenis: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    alasan: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    deskripsi: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    fotoPath: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    documentPath: {
      type: DataTypes.STRING,
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
User.hasMany(Adat);
Adat.belongsTo(User, { foreignKey: "userId" });
export default Adat;
