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

export default function Teknologi() {
  const [Teknologi, setTeknologi] = useState([]);
  const [msg, setMsg] = useState("");
  const [serch, setSerch] = useState("");
  const [dataFound, setDataFound] = useState(true);
  useEffect(() => {
    getAllTeknologi();
  }, []);
  const getAllTeknologi = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Teknologi");
      setTeknologi(response.data);
    } catch (error) {
      setMsg(error.response.data.message);
    }
    y;
  };
  const deleteTeknologi = async (TeknologiID, nama) => {
    try {
      const confirmed = window.confirm(
        `Apakah anda yakin menghapus data ${nama}?`
      );
      if (confirmed) {
        await axios.delete(`http://localhost:5000/Teknologi/${TeknologiID}`);
        getAllTeknologi();
      }
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };
  const exportDataToXLSX = () => {
    const dataToExport = Teknologi.map((item, index) => ({
      No: index + 1,
      nama: item.nama,
      etnis: item.etnis,
      bahan: item.bahan,
      fungsi: item.fungsi,
      waktuMulai: item.waktuMulai,
      satuanWaktu: item.satuanWaktu,
      deskripsi: item.deskripsi,
      provinsi: item.provinsi,
      kota: item.kota,
      kecamatan: item.kecamatan,
      desa: item.desa,
      lokasi: item.lokasi,
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
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Teknologi");
    XLSX.writeFile(wb, "Teknologi.xlsx");
  };

  const serchHandler = (e) => {
    setSerch(e.target.value);
    const filteredData = Teknologi.filter((item) =>
      item.nama.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDataFound(filteredData.length > 0);
  };

  const filterdTeknologi = Teknologi.filter((item) =>
    item.nama.toLowerCase().includes(serch.toLowerCase())
  );
  return (
    <div className="font-romans text-secondary py-3 px-2">
      <h1 className="text-xl font-semibold bg-tertiary shadow-md p-2 rounded-md">
        Data Teknologi
      </h1>
      <div className="flex justify-between">
        <div className="flex gap-x-1 mt-3 px-2">
          <h5 className="text-xl">List Teknologi!</h5>
          <Link to={"/Teknologi/add"}>
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
            {filterdTeknologi.map((Teknologi, index) => (
              <tr className="border" key={Teknologi.uuid}>
                <td>{index + 1}</td>
                <td>{Teknologi.nama}</td>
                <td>{Teknologi.provinsi}</td>
                <td>{Teknologi.kota}</td>
                <td>{Teknologi.etnis}</td>
                <td className="space-x-6">
                  <button>
                    <Link to={`/Teknologi/edit/${Teknologi.uuid}`}>
                      <PencilIcon className="w-5" />
                    </Link>
                  </button>
                  <button
                    onClick={() =>
                      deleteTeknologi(Teknologi.uuid, Teknologi.nama)
                    }
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
