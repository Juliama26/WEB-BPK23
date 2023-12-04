import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PermainanAdd() {
  const [nama, setNama] = useState("");
  const [pasti, setPasti] = useState("");
  const [etnis, setEtnis] = useState("");
  const [minimal, setMinimal] = useState("");
  const [maximal, setMaximal] = useState("");
  const [perlengkapan, setPerlengkapan] = useState("");
  const [moral, setMoral] = useState("");
  const [aturan, setAturan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [desa, setDesa] = useState("");
  const [deskripsiLokasi, setDeskripsiLokasi] = useState("");
  const [fotoPath, setFotoPath] = useState("");
  const [documentPath, setDocumentPath] = useState("");

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const createPermainan = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/Permainan", {
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
      });
      setMsg(response.data.message);
      navigate("/Permainan");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };

  return (
    <div className="font-romans text-secondary py-3 px-2">
      <h1 className="text-xl font-semibold bg-tertiary shadow-md p-2 rounded-md">
        New Permainan!
      </h1>
      <div className="p-2 text-err">{msg}</div>
      <div>
        <form onSubmit={createPermainan} className="w-full mb-10">
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
              <label htmlFor="etnis" className="block mb-1 font-semibold">
                Etnis Yang Menggunakan Permainan Rakyat Tersebut
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
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="pasti" className="block mb-1 font-semibold">
                Jumlah Pemain Pasti?
              </label>
              <input
                type="text"
                id="pasti"
                required
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={pasti}
                onChange={(e) => setPasti(e.target.value)}
              />
            </div>
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="minimal" className="block mb-1 font-semibold">
                Jumlah Pemain Minimal
              </label>
              <input
                type="text"
                id="minimal"
                required
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={minimal}
                onChange={(e) => setMinimal(e.target.value)}
              />
            </div>
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="maximal" className="block mb-1 font-semibold">
                Jumlah Pemain Maksimal
              </label>
              <input
                type="text"
                id="maximal"
                required
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={maximal}
                onChange={(e) => setMaximal(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-test p-3 rounded-md">
              <label
                htmlFor="perlengkapan"
                className="block mb-1 font-semibold"
              >
                Perlengkapan Permainan Rakyat
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
              <label htmlFor="moral" className="block mb-1 font-semibold">
                Nilai Moral Yang Terkandung Dalam Permainan Rakyat
              </label>
              <input
                type="text"
                id="moral"
                required
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={moral}
                onChange={(e) => setMoral(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-test p-3 rounded-md">
            <label htmlFor="aturan" className="block mb-1 font-semibold">
              Aturan Permainan
            </label>
            <textarea
              id="aturan"
              placeholder="Masukkan Aturan Permainan..."
              autoComplete="off"
              className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
              value={aturan}
              onChange={(e) => setAturan(e.target.value)}
            ></textarea>
          </div>
          <div className="bg-test p-3 rounded-md">
            <label htmlFor="deskripsi" className="block mb-1 font-semibold">
              Deskripsi Permainan Rakyat
            </label>
            <textarea
              id="deskripsi"
              placeholder="Masukkan Deskripsi Permainan Rakyat..."
              autoComplete="off"
              className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            ></textarea>
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
                Kota
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
                placeholder="Kecamatan/Distrik"
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
                Desa
              </label>
              <input
                type="text"
                id="desa"
                placeholder="Desa/Kel..."
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={desa}
                onChange={(e) => setDesa(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-test p-3 rounded-md">
            <label
              htmlFor="deskripsiLokasi"
              className="block mb-1 font-semibold"
            >
              Deskripsi Lokasi
            </label>
            <textarea
              id="deskripsiLokasi"
              placeholder="Masukkan Deskripsi Lokasi..."
              autoComplete="off"
              className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
              value={deskripsiLokasi}
              onChange={(e) => setDeskripsiLokasi(e.target.value)}
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
                Document
              </label>
              <input
                // type="url"
                type="text"
                id="documentPath"
                required
                autoComplete="off"
                placeholder="Link Document..."
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
