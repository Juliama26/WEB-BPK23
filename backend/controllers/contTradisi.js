import Tradisi from "../models/tradisiModel.js";
import User from "../models/usersModel.js";

export const getAllTradisi = async (req, res) => {
  try {
    const response = await Tradisi.findAll({
      include: User,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTradisiId = async (req, res) => {
  try {
    const response = await Tradisi.findOne({
      where: { uuid: req.params.id },
      include: User,
    });
    if (!response)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTradisi = async (req, res) => {
  const {
    nama,
    etnis,
    kategori,
    media,
    komponen,
    provinsi,
    kota,
    deskripsi,
    fotoPath,
    documentPath,
  } = req.body;
  try {
    await Tradisi.create({
      nama: nama,
      etnis: etnis,
      kategori: kategori,
      media: media,
      komponen: komponen,
      provinsi: provinsi,
      kota: kota,
      deskripsi: deskripsi,
      fotoPath: fotoPath,
      documentPath: documentPath,
      userId: req.userId,
    });
    res.status(201).json({ message: "Data berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTradisi = async (req, res) => {
  try {
    const response = await Tradisi.findOne({
      where: { uuid: req.params.id },
      include: User,
    });
    if (!response)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    const {
      nama,
      etnis,
      kategori,
      media,
      komponen,
      provinsi,
      kota,
      deskripsi,
      fotoPath,
      documentPath,
    } = req.body;
    await Tradisi.update(
      {
        nama: nama,
        etnis: etnis,
        kategori: kategori,
        media: media,
        komponen: komponen,
        provinsi: provinsi,
        kota: kota,
        deskripsi: deskripsi,
        fotoPath: fotoPath,
        documentPath: documentPath,
      },
      {
        where: { id: response.id },
      }
    );
    res.status(201).json({ message: "Data berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTradisi = async (req, res) => {
  const data = await Tradisi.findOne({
    where: { uuid: req.params.id },
  });
  if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
  try {
    await data.destroy({
      where: { id: data.id },
    });
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
