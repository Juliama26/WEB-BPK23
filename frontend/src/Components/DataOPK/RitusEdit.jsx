import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function RitusEdit() {
  const [nama, setNama] = useState("");
  const [etnis, setEtnis] = useState("");
  const [jenis, setJenis] = useState("");
  const [komponen, setKomponen] = useState("");
  const [perlengkapan, setPerlengkapan] = useState("");
  const [dilaksanakan, setDilaksanakan] = useState("");
  const [terakhir, setTerakhir] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [alasan, setAlasan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [desa, setDesa] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [fotoPath, setFotoPath] = useState("");
  const [documentPath, setDocumentPath] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getRitusID = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Ritus/${id}`);
        setNama(response.data.nama);
        setEtnis(response.data.etnis);
        setJenis(response.data.jenis);
        setKomponen(response.data.komponen);
        setPerlengkapan(response.data.perlengkapan);
        setDilaksanakan(response.data.dilaksanakan);
        setTerakhir(response.data.terakhir);
        setTujuan(response.data.tujuan);
        setAlasan(response.data.alasan);
        setDeskripsi(response.data.deskripsi);
        setProvinsi(response.data.provinsi);
        setKota(response.data.kota);
        setKecamatan(response.data.kecamatan);
        setDesa(response.data.desa);
        setLokasi(response.data.lokasi);
        setFotoPath(response.data.fotoPath);
        setDocumentPath(response.data.documentPath);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message);
        }
      }
    };
    getRitusID();
  }, [id]);
  const updateRitus = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/Ritus/${id}`, {
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
      });
      setMsg(response.data.message);
      navigate("/Ritus");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };

  return (
    <div className="font-romans text-secondary py-3 px-2">
      <h1 className="text-xl font-semibold bg-tertiary shadow-md p-2 rounded-md">
        Edit {nama}!
      </h1>
      <div className="p-2 text-err">{msg}</div>
      <div>
        <form onSubmit={updateRitus} className="w-full mb-10">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="nama" className="block mb-1 font-semibold">
                Nama
              </label>
              <input
                type="text"
                id="nama"
                required
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="jenis" className="block mb-1 font-semibold">
                Jenis Ritus
              </label>
              <input
                type="text"
                id="jenis"
                required
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="provinsi" className="block mb-1 font-semibold">
                Provinsi
              </label>
              <select
                name="provinsi"
                id="provinsi"
                className="border p-2 w-full bg-white rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={provinsi}
                onChange={(e) => setProvinsi(e.target.value)}
              >
                <option className="text-tertiary">---Pilih Provinsi---</option>
                <option>Papua Barat</option>
                <option>Papua Barat Daya</option>
              </select>
            </div>
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="kota" className="block mb-1 font-semibold">
                Kabupaten/Kota
              </label>
              <select
                name="kota"
                id="kota"
                className="border p-2 w-full bg-white rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={kota}
                onChange={(e) => setKota(e.target.value)}
              >
                <option className="text-tertiary">
                  ---Pilih Kabupaten/Kota---
                </option>
                <option>Mybrat</option>
                <option>Raja Ampat</option>
                <option>Sorong</option>
                <option>Sorong Selatan</option>
                <option>Tambrauw</option>
                <option>Kota Sorong</option>
                <option>Fakfak</option>
                <option>Kaimana</option>
                <option>Manokwari</option>
                <option>Manokwari Selatan</option>
                <option>Pegunungan Arfak</option>
                <option>Teluk Bintuni</option>
                <option>Teluk Wondama</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="kecamatan" className="block mb-1 font-semibold">
                Kecamatan
              </label>
              <input
                type="text"
                id="kecamatan"
                list="distrik"
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={kecamatan}
                onChange={(e) => setKecamatan(e.target.value)}
              />
              <datalist id="distrik">
                <option value="Kokas"></option>
                <option value="FakFak"></option>
                <option value="FakFak Tengah"></option>
                <option value="Kaimana"></option>
                <option value="Misool Barat"></option>
                <option value="Pulau Kofiau"></option>
                <option value="Kepulauan Ayau"></option>
                <option value="Distrik Arguni"></option>
                <option value="Mbahamdandara"></option>
                <option value="Manokwari"></option>
                <option value="Manokwari Selatan"></option>
                <option value="Pegunungan Arfak"></option>
                <option value="Teluk Bintuni"></option>
                <option value="Wondama"></option>
                <option value="Maybrat"></option>
                <option value="Raja Ampat"></option>
                <option value="Sorong"></option>
                <option value="Sorong Selatan"></option>
                <option value="Tambrauw"></option>
              </datalist>
            </div>
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="desa" className="block mb-1 font-semibold">
                Kelurahan
              </label>
              <input
                type="text"
                id="desa"
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={desa}
                onChange={(e) => setDesa(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-test p-3 rounded-md">
            <label htmlFor="lokasi" className="block mb-1 font-semibold">
              Lokasi Pelaksanaan Ritus
            </label>
            <input
              type="text"
              id="lokasi"
              autoComplete="off"
              className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="etnis" className="block mb-1 font-semibold">
                Etnis Yang Menggunakan Ritus Tersebut
              </label>
              <input
                type="text"
                id="etnis"
                required
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={etnis}
                onChange={(e) => setEtnis(e.target.value)}
              />
            </div>
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="komponen" className="block mb-1 font-semibold">
                Komponen Pelaku Ritus
              </label>
              <input
                type="text"
                id="komponen"
                required
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={komponen}
                onChange={(e) => setKomponen(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-test p-3 rounded-md">
              <label
                htmlFor="perlengkapan"
                className="block mb-1 font-semibold"
              >
                Perlengkapan Ritus
              </label>
              <input
                type="text"
                id="perlengkapan"
                required
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={perlengkapan}
                onChange={(e) => setPerlengkapan(e.target.value)}
              />
            </div>
            <div className="bg-test p-3 rounded-md">
              <label
                htmlFor="dilaksanakan"
                className="block mb-1 font-semibold"
              >
                Apakah Ritus Tersebut Masih Dilaksanakan Hingga Saat Ini?
              </label>
              <input
                type="text"
                id="dilaksanakan"
                required
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={dilaksanakan}
                onChange={(e) => setDilaksanakan(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="alasan" className="block mb-1 font-semibold">
                Alasan Tidak Dilaksanakan
              </label>
              <input
                type="text"
                id="alasan"
                required
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
              />
            </div>
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="terakhir" className="block mb-1 font-semibold">
                Tahun Terakhir Pelaksanaan
              </label>
              <input
                type="number"
                id="terakhir"
                required
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={terakhir}
                onChange={(e) => setTerakhir(e.target.value)}
              />
            </div>
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="tujuan" className="block mb-1 font-semibold">
                Tujuan Penggunaan Rapalan/Mantra
              </label>
              <input
                type="text"
                id="tujuan"
                required
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={tujuan}
                onChange={(e) => setTujuan(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-test p-3 rounded-md">
            <label htmlFor="deskripsi" className="block mb-1 font-semibold">
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              placeholder="Masukkan deskripsi..."
              autoComplete="off"
              className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="fotoPath" className="block mb-1 font-semibold">
                Gambar
              </label>
              <input
                // type="url"
                type="text"
                id="fotoPath"
                required
                autoComplete="off"
                placeholder="Link Gambar..."
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={fotoPath}
                onChange={(e) => setFotoPath(e.target.value)}
              />
            </div>
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="sertiPath" className="block mb-1 font-semibold">
                Dokumen Lainnya
              </label>
              <input
                // type="url"
                type="text"
                id="sertiPath"
                required
                autoComplete="off"
                placeholder="Link Dokumen..."
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={documentPath}
                onChange={(e) => setDocumentPath(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="py-2 px-3 w-full mt-3 rounded font-semibold bg-test hover:bg-tertiary duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
