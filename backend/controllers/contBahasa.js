import Bahasa from "../models/bahasaModel.js";
import User from "../models/usersModel.js";

export const getAllBahasa = async (req, res) => {
  try {
    const response = await Bahasa.findAll({
      include: User,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBahasaId = async (req, res) => {
  try {
    const response = await Bahasa.findOne({
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

export const createBahasa = async (req, res) => {
  const {
    nama,
    provinsi,
    kota,
    dialek,
    namaDialek,
    etnis,
    jenis,
    deskripsi,
    fotoPath,
    documentPath,
  } = req.body;
  try {
    await Bahasa.create({
      nama: nama,
      provinsi: provinsi,
      kota: kota,
      dialek: dialek,
      namaDialek: namaDialek,
      etnis: etnis,
      jenis: jenis,
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

export const updateBahasa = async (req, res) => {
  try {
    const response = await Bahasa.findOne({
      where: { uuid: req.params.id },
      include: User,
    });
    if (!response)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    const {
      nama,
      provinsi,
      kota,
      dialek,
      namaDialek,
      etnis,
      jenis,
      deskripsi,
      fotoPath,
      documentPath,
    } = req.body;
    await Bahasa.update(
      {
        nama: nama,
        provinsi: provinsi,
        kota: kota,
        dialek: dialek,
        namaDialek: namaDialek,
        etnis: etnis,
        jenis: jenis,
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

export const deleteBahasa = async (req, res) => {
  const data = await Bahasa.findOne({
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
