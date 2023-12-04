import Ritus from "../models/ritusModel.js";
import User from "../models/usersModel.js";

export const getAllRitus = async (req, res) => {
  try {
    const response = await Ritus.findAll({
      include: User,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRitusId = async (req, res) => {
  try {
    const response = await Ritus.findOne({
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

export const createRitus = async (req, res) => {
  const {
    nama,
    etnis,
    jenis,
    komponen,
    perlengkapan,
    dilaksanakan,
    terakhir,
    tujuan,
    alasan,
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
    await Ritus.create({
      nama: nama,
      etnis: etnis,
      jenis: jenis,
      komponen: komponen,
      perlengkapan: perlengkapan,
      dilaksanakan: dilaksanakan,
      terakhir: terakhir,
      tujuan: tujuan,
      alasan: alasan,
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

export const updateRitus = async (req, res) => {
  try {
    const response = await Ritus.findOne({
      where: { uuid: req.params.id },
      include: User,
    });
    if (!response)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    const {
      nama,
      etnis,
      jenis,
      komponen,
      perlengkapan,
      dilaksanakan,
      terakhir,
      tujuan,
      alasan,
      deskripsi,
      provinsi,
      kota,
      kecamatan,
      desa,
      lokasi,
      fotoPath,
      documentPath,
    } = req.body;
    await Ritus.update(
      {
        nama: nama,
        etnis: etnis,
        jenis: jenis,
        komponen: komponen,
        perlengkapan: perlengkapan,
        dilaksanakan: dilaksanakan,
        terakhir: terakhir,
        tujuan: tujuan,
        alasan: alasan,
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

export const deleteRitus = async (req, res) => {
  const data = await Ritus.findOne({
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
