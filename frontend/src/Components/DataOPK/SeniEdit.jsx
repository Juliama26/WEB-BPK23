import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function SeniEdit() {
  const [nama, setNama] = useState("");
  const [jenisOPK, setJenisOPK] = useState("");
  const [jenis, setJenis] = useState("");
  const [properti, setProperti] = useState("");
  const [etnis, setEtnis] = useState("");
  const [bahasa, setBahasa] = useState("");
  const [seni, setSeni] = useState(""); // diganti jadi Fungsi Seni tapi nama database ga berubah
  const [komponen, setKomponen] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [fotoPath, setFotoPath] = useState("");
  const [documentPath, setDocumentPath] = useState("");

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getSeniID = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Seni/${id}`);
        setNama(response.data.nama);
        setJenisOPK(response.data.jenisOPK);
        setJenis(response.data.jenis);
        setProperti(response.data.properti);
        setEtnis(response.data.etnis);
        setBahasa(response.data.bahasa);
        setSeni(response.data.seni);
        setKomponen(response.data.komponen);
        setProvinsi(response.data.provinsi);
        setKota(response.data.kota);
        setDeskripsi(response.data.deskripsi);
        setFotoPath(response.data.fotoPath);
        setDocumentPath(response.data.documentPath);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message);
        }
      }
    };
    getSeniID();
  }, [id]);
  const updateSeni = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/Seni/${id}`, {
        nama,
        jenisOPK,
        jenis,
        properti,
        etnis,
        bahasa,
        seni,
        komponen,
        provinsi,
        kota,
        deskripsi,
        fotoPath,
        documentPath,
      });
      setMsg(response.data.message);
      navigate("/Seni");
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
        <form onSubmit={updateSeni} className="w-full mb-10">
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
              <label htmlFor="jenisOPK" className="block mb-1 font-semibold">
                Jenis Objek
              </label>
              <input
                type="text"
                id="jenisOPK"
                required
                autoComplete="off"
                placeholder="Contoh: Seni Musik, Seni Tari"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={jenisOPK}
                onChange={(e) => setJenisOPK(e.target.value)}
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
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="etnis" className="block mb-1 font-semibold">
                Etnis Yang Menggunakan
              </label>
              <input
                type="text"
                id="etnis"
                list="distrik"
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={etnis}
                onChange={(e) => setEtnis(e.target.value)}
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
                Bahasa Yang Digunakan
              </label>
              <input
                type="text"
                id="desa"
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={bahasa}
                onChange={(e) => setBahasa(e.target.value)}
              />
            </div>
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="jenis" className="block mb-1 font-semibold">
                Jenis Seni
              </label>
              <input
                type="text"
                id="jenis"
                placeholder="Dusun/Kamp..."
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="properti" className="block mb-1 font-semibold">
                Properti Yang Digunakan
              </label>
              <input
                type="text"
                id="properti"
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={properti}
                onChange={(e) => setProperti(e.target.value)}
              />
            </div>
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="komponen" className="block mb-1 font-semibold">
                Komponen
              </label>
              <input
                type="text"
                id="komponen"
                placeholder="Dusun/Kamp..."
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={komponen}
                onChange={(e) => setKomponen(e.target.value)}
              />
            </div>
            <div className="bg-test p-3 rounded-md">
              <label htmlFor="seni" className="block mb-1 font-semibold">
                Fungsi Seni
              </label>
              <input
                type="text"
                id="seni"
                placeholder="Dusun/Kamp..."
                autoComplete="off"
                className="border p-2 w-full rounded-md placeholder:text-inring focus:outline-none focus:ring-1 focus:ring-ring 
              focus:border-ring"
                value={seni}
                onChange={(e) => setSeni(e.target.value)}
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
                Sertifikat
              </label>
              <input
                // type="url"
                type="text"
                id="documentPath"
                required
                autoComplete="off"
                placeholder="Link Sertifikat..."
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
