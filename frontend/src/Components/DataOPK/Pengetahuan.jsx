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

export default function Pengetahuan() {
  const [Pengetahuan, setPengetahuan] = useState([]);
  const [msg, setMsg] = useState("");
  const [serch, setSerch] = useState("");
  const [dataFound, setDataFound] = useState(true);
  useEffect(() => {
    getAllPengetahuan();
  }, []);
  const getAllPengetahuan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Pengetahuan");
      setPengetahuan(response.data);
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };
  const deletePengetahuan = async (PengetahuanID, nama) => {
    try {
      const confirmed = window.confirm(
        `Apakah anda yakin menghapus data ${nama}?`
      );
      if (confirmed) {
        await axios.delete(
          `http://localhost:5000/Pengetahuan/${PengetahuanID}`
        );
        getAllPengetahuan();
      }
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };
  const exportDataToXLSX = () => {
    const dataToExport = Pengetahuan.map((item, index) => ({
      No: index + 1,
      nama: item.nama,
      etnis: item.etnis,
      satuan: item.satuan,
      perkiraan: item.perkiraan,
      jenis: item.jenis,
      kegunaan: item.kegunaan,
      deskripsi: item.deskripsi,
      lokasi: item.lokasi,
      provinsi: item.provinsi,
      kota: item.kota,
      kecamatan: item.kecamatan,
      desa: item.desa,
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
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pengetahuan");
    XLSX.writeFile(wb, "Pengetahuan.xlsx");
  };

  const serchHandler = (e) => {
    setSerch(e.target.value);
    const filteredData = Pengetahuan.filter((item) =>
      item.nama.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDataFound(filteredData.length > 0);
  };

  const filterdPengetahuan = Pengetahuan.filter((item) =>
    item.nama.toLowerCase().includes(serch.toLowerCase())
  );
  return (
    <div className="font-romans text-secondary py-3 px-2">
      <h1 className="text-xl font-semibold bg-tertiary shadow-md p-2 rounded-md">
        Data Pengetahuan
      </h1>
      <div className="flex justify-between">
        <div className="flex gap-x-1 mt-3 px-2">
          <h5 className="text-xl">List Pengetahuan!</h5>
          <Link to={"/Pengetahuan/add"}>
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
            <th className="w-44">Kecamatan</th>
            <th className="w-32">Action</th>
          </tr>
        </thead>
        {dataFound ? (
          <tbody className="text-center">
            {filterdPengetahuan.map((Pengetahuan, index) => (
              <tr className="border" key={Pengetahuan.uuid}>
                <td>{index + 1}</td>
                <td>{Pengetahuan.nama}</td>
                <td>{Pengetahuan.provinsi}</td>
                <td>{Pengetahuan.kota}</td>
                <td>{Pengetahuan.kecamatan}</td>
                <td className="space-x-6">
                  <button>
                    <Link to={`/Pengetahuan/edit/${Pengetahuan.uuid}`}>
                      <PencilIcon className="w-5" />
                    </Link>
                  </button>
                  <button
                    onClick={() =>
                      deletePengetahuan(Pengetahuan.uuid, Pengetahuan.nama)
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
