import Adat from "../models/adatModel.js";
import User from "../models/usersModel.js";

export const getAllAdat = async (req, res) => {
  try {
    const response = await Adat.findAll({
      include: User,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdatId = async (req, res) => {
  try {
    const response = await Adat.findOne({
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

export const createAdat = async (req, res) => {
  const {
    nama,
    provinsi,
    kota,
    dilaksanakan,
    pelaksanaan,
    etnis,
    jenis,
    alasan,
    deskripsi,
    fotoPath,
    documentPath,
  } = req.body;
  try {
    await Adat.create({
      nama: nama,
      provinsi: provinsi,
      kota: kota,
      dilaksanakan: dilaksanakan,
      pelaksanaan: pelaksanaan,
      etnis: etnis,
      jenis: jenis,
      alasan: alasan,
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

export const updateAdat = async (req, res) => {
  try {
    const response = await Adat.findOne({
      where: { uuid: req.params.id },
      include: User,
    });
    if (!response)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    const {
      nama,
      provinsi,
      kota,
      dilaksanakan,
      pelaksanaan,
      etnis,
      jenis,
      alasan,
      deskripsi,
      fotoPath,
      documentPath,
    } = req.body;
    await Adat.update(
      {
        nama: nama,
        provinsi: provinsi,
        kota: kota,
        dilaksanakan: dilaksanakan,
        pelaksanaan: pelaksanaan,
        etnis: etnis,
        jenis: jenis,
        alasan: alasan,
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

export const deleteAdat = async (req, res) => {
  const data = await Adat.findOne({
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
