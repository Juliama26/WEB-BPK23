import Pengetahuan from "../models/pengetahuanModel.js";
import User from "../models/usersModel.js";

export const getAllPengetahuan = async (req, res) => {
  try {
    const response = await Pengetahuan.findAll({
      include: User,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPengetahuanId = async (req, res) => {
  try {
    const response = await Pengetahuan.findOne({
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

export const createPengetahuan = async (req, res) => {
  const {
    nama,
    etnis,
    satuan,
    perkiraan,
    jenis,
    kegunaan,
    deskripsi,
    lokasi,
    provinsi,
    kota,
    kecamatan,
    desa,
    fotoPath,
    documentPath,
  } = req.body;
  try {
    await Pengetahuan.create({
      nama: nama,
      etnis: etnis,
      satuan: satuan,
      perkiraan: perkiraan,
      jenis: jenis,
      kegunaan: kegunaan,
      provinsi: provinsi,
      kota: kota,
      kecamatan: kecamatan,
      desa: desa,
      deskripsi: deskripsi,
      lokasi: lokasi,
      fotoPath: fotoPath,
      documentPath: documentPath,
      userId: req.userId,
    });
    res.status(201).json({ message: "Data berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePengetahuan = async (req, res) => {
  try {
    const response = await Pengetahuan.findOne({
      where: { uuid: req.params.id },
      include: User,
    });
    if (!response)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    const {
      nama,
      etnis,
      satuan,
      perkiraan,
      jenis,
      kegunaan,
      deskripsi,
      lokasi,
      provinsi,
      kota,
      kecamatan,
      desa,
      fotoPath,
      documentPath,
    } = req.body;
    await Pengetahuan.update(
      {
        nama: nama,
        etnis: etnis,
        satuan: satuan,
        perkiraan: perkiraan,
        jenis: jenis,
        kegunaan: kegunaan,
        provinsi: provinsi,
        kota: kota,
        kecamatan: kecamatan,
        desa: desa,
        deskripsi: deskripsi,
        lokasi: lokasi,
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

export const deletePengetahuan = async (req, res) => {
  const data = await Pengetahuan.findOne({
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
