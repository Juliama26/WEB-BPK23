import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AdatEdit() {
  const [nama, setNama] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [dilaksanakan, setDilaksanakan] = useState("");
  const [pelaksanaan, setPelaksanaan] = useState("");
  const [etnis, setEtnis] = useState("");
  const [jenis, setJenis] = useState("");
  const [alasan, setAlasan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [fotoPath, setFotoPath] = useState("");
  const [documentPath, setDocumentPath] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getAdatID = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Adat/${id}`);
        setNama(response.data.nama);
        setProvinsi(response.data.provinsi);
        setKota(response.data.kota);
        setDilaksanakan(response.data.dilaksanakan);
        setPelaksanaan(response.data.pelaksanaan);
        setEtnis(response.data.etnis);
        setJenis(response.data.jenis);
        setAlasan(response.data.alasan);
        setDeskripsi(response.data.deskripsi);
        setFotoPath(response.data.fotoPath);
        setDocumentPath(response.data.documentPath);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message);
        }
      }
    };
    getAdatID();
  }, [id]);
  const updateAdat = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/Adat/${id}`, {
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
      });
      setMsg(response.data.message);
      navigate("/Adat");
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
        <form onSubmit={updateAdat} className="w-full mb-10">
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
                Jenis Adat Istiadat
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
              <label
                htmlFor="dilaksanakan"
                className="block mb-1 font-semibold"
              >
                Apakah Adat Istiadat Tersebut Masih Dilaksanakan Hingga Saat Ini
                ?
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
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="pelaksanaan" className="block mb-1 font-semibold">
                Tahun Terakhir Pelaksanaan
              </label>
              <input
                type="text"
                id="pelaksanaan"
                required
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={pelaksanaan}
                onChange={(e) => setPelaksanaan(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="etnis" className="block mb-1 font-semibold">
                Etnis Yang Melaksanakan
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
              <label htmlFor="alasan" className="block mb-1 font-semibold">
                Alasan Sudah Tidak Dilaksanakan
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
              <label
                htmlFor="documentPath"
                className="block mb-1 font-semibold"
              >
                Dokumen Lainnya
              </label>
              <input
                // type="url"
                type="text"
                id="documentPath"
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
