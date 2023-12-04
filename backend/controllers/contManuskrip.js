import Manuskrip from "../models/manuskripModel.js";
import User from "../models/usersModel.js";

export const getAllManuskrip = async (req, res) => {
  try {
    const response = await Manuskrip.findAll({
      include: User,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getManuskripId = async (req, res) => {
  try {
    const response = await Manuskrip.findOne({
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

export const createManuskrip = async (req, res) => {
  const {
    judul,
    bahasa,
    pencipta,
    bahan,
    satuan,
    karya,
    subjek,
    periode,
    jumlah,
    namalokasi,
    ukuran,
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
    await Manuskrip.create({
      judul: judul,
      bahasa: bahasa,
      pencipta: pencipta,
      bahan: bahan,
      satuan: satuan,
      karya: karya,
      subjek: subjek,
      periode: periode,
      jumlah: jumlah,
      namalokasi: namalokasi,
      ukuran: ukuran,
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

export const updateManuskrip = async (req, res) => {
  try {
    const response = await Manuskrip.findOne({
      where: { uuid: req.params.id },
      include: User,
    });
    if (!response)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    const {
      judul,
      bahasa,
      pencipta,
      bahan,
      satuan,
      karya,
      subjek,
      periode,
      jumlah,
      namalokasi,
      ukuran,
      deskripsi,
      provinsi,
      kota,
      kecamatan,
      desa,
      lokasi,
      fotoPath,
      documentPath,
    } = req.body;
    await Manuskrip.update(
      {
        judul: judul,
        bahasa: bahasa,
        pencipta: pencipta,
        bahan: bahan,
        satuan: satuan,
        karya: karya,
        subjek: subjek,
        periode: periode,
        jumlah: jumlah,
        namalokasi: namalokasi,
        ukuran: ukuran,
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

export const deleteManuskrip = async (req, res) => {
  const data = await Manuskrip.findOne({
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
