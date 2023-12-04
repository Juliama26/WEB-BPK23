import React from "react";
import { Link } from "react-router-dom";
import {
  DocumentPlusIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

export default function Bahasa() {
  const [Bahasa, setBahasa] = useState([]);
  const [msg, setMsg] = useState("");
  const [serch, setSerch] = useState("");
  const [dataFound, setDataFound] = useState(true);
  useEffect(() => {
    getAllBahasa();
  }, []);
  const getAllBahasa = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Bahasa");
      setBahasa(response.data);
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };
  const deleteBahasa = async (BahasaID, nama) => {
    try {
      const confirmed = window.confirm(
        `Apakah anda yakin menghapus data ${nama}?`
      );
      if (confirmed) {
        await axios.delete(`http://localhost:5000/Bahasa/${BahasaID}`);
        getAllBahasa();
      }
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };
  const exportDataToXLSX = () => {
    const dataToExport = Bahasa.map((item, index) => ({
      No: index + 1,
      nama: item.nama,
      provinsi: item.provinsi,
      kota: item.kota,
      dialek: item.dialek,
      namaDialek: item.namaDialek,
      etnis: item.etnis,
      jenis: item.jenis,
      deskripsi: item.deskripsi,
      fotoPath: item.fotoPath,
      documentPath: item.documentPath,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    ws["!cols"] = [
      { width: 5 },
      { width: 28 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bahasa");
    XLSX.writeFile(wb, "Bahasa.xlsx");
  };

  const serchHandler = (e) => {
    setSerch(e.target.value);
    const filteredData = Bahasa.filter((item) =>
      item.nama.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDataFound(filteredData.length > 0);
  };

  const filterdBahasa = Bahasa.filter((item) =>
    item.nama.toLowerCase().includes(serch.toLowerCase())
  );
  return (
    <div className="font-romans text-secondary py-3 px-2">
      <h1 className="text-xl font-semibold bg-tertiary shadow-md p-2 rounded-md">
        Data Bahasa
      </h1>
      <div className="flex justify-between">
        <div className="flex gap-x-1 mt-3 px-2">
          <h5 className="text-xl">List Bahasa!</h5>
          <Link to={"/Bahasa/add"}>
            <DocumentPlusIcon className="w-6 text-ring hover:text-secondary duration-300 ease-in-out" />
          </Link>
        </div>
        <div className="flex gap-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={serch}
            onChange={serchHandler}
            className="mt-3 px-2  border rounded"
          />
          <button
            onClick={exportDataToXLSX}
            className="mt-3 px-2 py-1 border rounded-md bg-ring text-test font-semibold hover:bg-tertiary hover:text-secondary duration-300 ease-in-out"
          >
            Export Excel
          </button>
        </div>
      </div>
      <hr className="mt-1" />
      <div className="text-err">{msg}</div>
      <table className="w-full">
        <thead>
          <tr className="bg-test">
            <th className="py-2 w-12">No</th>
            <th>Nama</th>
            <th>Provinsi</th>
            <th>Kota</th>
            <th className="w-44">Nama Dialek</th>
            <th className="w-32">Action</th>
          </tr>
        </thead>
        {dataFound ? (
          <tbody className="text-center">
            {filterdBahasa.map((Bahasa, index) => (
              <tr className="border" key={Bahasa.uuid}>
                <td>{index + 1}</td>
                <td>{Bahasa.nama}</td>
                <td>{Bahasa.provinsi}</td>
                <td>{Bahasa.kota}</td>
                <td>{Bahasa.namaDialek}</td>
                <td className="space-x-3">
                  <button>
                    <Link to={`/Bahasa/edit/${Bahasa.uuid}`}>
                      <PencilIcon className="w-5" />
                    </Link>
                  </button>
                  <button
                    onClick={() => deleteBahasa(Bahasa.uuid, Bahasa.nama)}
                  >
                    <TrashIcon className="w-5 text-err" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={10} className="text-center">
                Ups.. Data Tidak Ditemukan😞
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}
