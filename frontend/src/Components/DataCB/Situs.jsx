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

export default function Situs() {
  const [Situs, setSitus] = useState([]);
  const [msg, setMsg] = useState("");
  const [serch, setSerch] = useState("");
  const [dataFound, setDataFound] = useState(true);
  useEffect(() => {
    getAllSitus();
  }, []);
  const getAllSitus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/situs");
      setSitus(response.data);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };
  const deleteSitus = async (SitusID, nama) => {
    try {
      const confirmed = window.confirm(
        `Apakah anda yakin menghapus data ${nama}?`
      );
      if (confirmed) {
        await axios.delete(`http://localhost:5000/Situs/${SitusID}`);
        getAllSitus();
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };
  const exportDataToXLSX = () => {
    const dataToExport = Situs.map((item, index) => ({
      No: index + 1,
      Nama_Situs: item.nama,
      Nama_Lain: item.namalain,
      Provinsi: item.provinsi,
      Kab_Kota: item.kota,
      Kec_Distrik: item.kecamatan,
      Desa_Kel: item.desa,
      Dusun_Kamp: item.dusun,
      Koord_X: item.koordx,
      Koord_Y: item.koordy,
      Narasumber: item.narasumber,
      Deskripsi: item.deskripsi,
      Gambar: item.fotoPath,
      Sertifikat: item.sertiPath,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    ws["!cols"] = [
      { width: 5 },
      { width: 28 },
      { width: 12 },
      { width: 16 },
      { width: 18 },
      { width: 18 },
      { width: 18 },
      { width: 18 },
      { width: 16 },
      { width: 16 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Situs");
    XLSX.writeFile(wb, "Situs.xlsx");
  };

  const serchHandler = (e) => {
    setSerch(e.target.value);
    const filteredData = Situs.filter((item) =>
      item.nama.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDataFound(filteredData.length > 0);
  };

  const filterdSitus = Situs.filter((item) =>
    item.nama.toLowerCase().includes(serch.toLowerCase())
  );
  return (
    <div className="font-romans text-secondary py-3 px-2">
      <h1 className="text-xl font-semibold bg-tertiary shadow-md p-2 rounded-md">
        Data Situs
      </h1>
      <div className="flex justify-between">
        <div className="flex gap-x-1 mt-3 px-2">
          <h5 className="text-xl">List Situs!</h5>
          <Link to={"/situs/add"}>
            <DocumentPlusIcon className="w-6  text-ring hover:text-secondary duration-300 ease-in-out" />
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
            <th>Nama Situs</th>
            <th>Provinsi</th>
            <th>Kota</th>
            <th>Koordinat X</th>
            <th>Koordinat Y</th>
            <th className="w-32">Action</th>
          </tr>
        </thead>
        {dataFound ? (
          <tbody className="text-center">
            {filterdSitus.map((Situs, index) => (
              <tr className="border" key={Situs.uuid}>
                <td>{index + 1}</td>
                <td>{Situs.nama}</td>
                <td>{Situs.provinsi}</td>
                <td>{Situs.kota}</td>
                <td>{Situs.koordx}</td>
                <td>{Situs.koordy}</td>
                <td className="space-x-6">
                  <button>
                    <Link to={`/situs/edit/${Situs.uuid}`}>
                      <PencilIcon className="w-5" />
                    </Link>
                  </button>
                  <button onClick={() => deleteSitus(Situs.uuid, Situs.nama)}>
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
