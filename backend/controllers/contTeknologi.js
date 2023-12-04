import Teknologi from "../models/teknologiModel.js";
import User from "../models/usersModel.js";

export const getAllTeknologi = async (req, res) => {
  try {
    const response = await Teknologi.findAll({
      include: User,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeknologiId = async (req, res) => {
  try {
    const response = await Teknologi.findOne({
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

export const createTeknologi = async (req, res) => {
  const {
    nama,
    etnis,
    bahan,
    fungsi,
    waktuMulai,
    satuanWaktu,
    deskripsi,
    provinsi,
    kota,
    kecamatan,
    desa,
    lokasi,
    fotoPath,
    documentPath,
  } = req.body;
  try {
    await Teknologi.create({
      nama: nama,
      etnis: etnis,
      bahan: bahan,
      fungsi: fungsi,
      waktuMulai: waktuMulai,
      satuanWaktu: satuanWaktu,
      deskripsi: deskripsi,
      provinsi: provinsi,
      kota: kota,
      kecamatan: kecamatan,
      desa: desa,
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

export const updateTeknologi = async (req, res) => {
  try {
    const response = await Teknologi.findOne({
      where: { uuid: req.params.id },
      include: User,
    });
    if (!response)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    const {
      nama,
      etnis,
      bahan,
      fungsi,
      waktuMulai,
      satuanWaktu,
      deskripsi,
      provinsi,
      kota,
      kecamatan,
      desa,
      lokasi,
      fotoPath,
      documentPath,
    } = req.body;
    await Teknologi.update(
      {
        nama: nama,
        etnis: etnis,
        bahan: bahan,
        fungsi: fungsi,
        waktuMulai: waktuMulai,
        satuanWaktu: satuanWaktu,
        deskripsi: deskripsi,
        provinsi: provinsi,
        kota: kota,
        kecamatan: kecamatan,
        desa: desa,
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

export const deleteTeknologi = async (req, res) => {
  const data = await Teknologi.findOne({
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
