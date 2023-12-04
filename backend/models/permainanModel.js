import db from "../config/database.js";
import { DataTypes } from "sequelize";
import User from "./usersModel.js";

const Permainan = db.define(
  "permainan",
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
    pasti: {
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
    minimal: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    maximal: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    perlengkapan: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    moral: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    aturan: {
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
    deskripsiLokasi: {
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
User.hasMany(Permainan);
Permainan.belongsTo(User, { foreignKey: "userId" });
export default Permainan;
