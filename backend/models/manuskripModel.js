import db from "../config/database.js";
import { DataTypes } from "sequelize";
import User from "./usersModel.js";

const Manuskrip = db.define(
  "manuskrip",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    bahasa: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    pencipta: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    bahan: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    satuan: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    karya: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    subjek: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    periode: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    jumlah: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    namalokasi: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    ukuran: {
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
    lokasi: {
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
User.hasMany(Manuskrip);
Manuskrip.belongsTo(User, { foreignKey: "userId" });
export default Manuskrip;
