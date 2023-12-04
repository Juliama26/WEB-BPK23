import Permainan from "../models/permainanModel.js";
import User from "../models/usersModel.js";

export const getAllPermainan = async (req, res) => {
  try {
    const response = await Permainan.findAll({
      include: User,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPermainanId = async (req, res) => {
  try {
    const response = await Permainan.findOne({
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

export const createPermainan = async (req, res) => {
  const {
    nama,
    pasti,
    etnis,
    minimal,
    maximal,
    perlengkapan,
    moral,
    aturan,
    deskripsi,
    provinsi,
    kota,
    kecamatan,
    desa,
    deskripsiLokasi,
    fotoPath,
    documentPath,
  } = req.body;
  try {
    await Permainan.create({
      nama: nama,
      pasti: pasti,
      etnis: etnis,
      minimal: minimal,
      maximal: maximal,
      perlengkapan: perlengkapan,
      moral: moral,
      aturan: aturan,
      deskripsi: deskripsi,
      provinsi: provinsi,
      kota: kota,
      kecamatan: kecamatan,
      desa: desa,
      deskripsiLokasi: deskripsiLokasi,
      fotoPath: fotoPath,
      documentPath: documentPath,
      userId: req.userId,
    });
    res.status(201).json({ message: "Data berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePermainan = async (req, res) => {
  try {
    const response = await Permainan.findOne({
      where: { uuid: req.params.id },
      include: User,
    });
    if (!response)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    const {
      nama,
      pasti,
      etnis,
      minimal,
      maximal,
      perlengkapan,
      moral,
      aturan,
      deskripsi,
      provinsi,
      kota,
      kecamatan,
      desa,
      deskripsiLokasi,
      fotoPath,
      documentPath,
    } = req.body;
    await Permainan.update(
      {
        nama: nama,
        pasti: pasti,
        etnis: etnis,
        minimal: minimal,
        maximal: maximal,
        perlengkapan: perlengkapan,
        moral: moral,
        aturan: aturan,
        deskripsi: deskripsi,
        provinsi: provinsi,
        kota: kota,
        kecamatan: kecamatan,
        desa: desa,
        deskripsiLokasi: deskripsiLokasi,
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

export const deletePermainan = async (req, res) => {
  const data = await Permainan.findOne({
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
