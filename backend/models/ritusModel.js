import db from "../config/database.js";
import { DataTypes } from "sequelize";
import User from "./usersModel.js";

const Ritus = db.define(
  "ritus",
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
    komponen: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    perlengkapan: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    dilaksanakan: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    terakhir: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    tujuan: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    alasan: {
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
    kecamatan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    desa: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    lokasi: {
      type: DataTypes.STRING,
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
User.hasMany(Ritus);
Ritus.belongsTo(User, { foreignKey: "userId" });
export default Ritus;
