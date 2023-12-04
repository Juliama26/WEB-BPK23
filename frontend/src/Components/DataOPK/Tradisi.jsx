import { Link } from "react-router-dom";
import {
  DocumentPlusIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

export default function Tradisi() {
  const [Tradisi, setTradisi] = useState([]);
  const [msg, setMsg] = useState("");
  const [serch, setSerch] = useState("");
  const [dataFound, setDataFound] = useState(true);
  useEffect(() => {
    getAllTradisi();
  }, []);
  const getAllTradisi = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Tradisi");
      setTradisi(response.data);
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };
  const deleteTradisi = async (TradisiID, nama) => {
    try {
      const confirmed = window.confirm(
        `Apakah anda yakin menghapus data ${nama}?`
      );
      if (confirmed) {
        await axios.delete(`http://localhost:5000/Tradisi/${TradisiID}`);

        getAllTradisi();
      }
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };
  const exportDataToXLSX = () => {
    const dataToExport = Tradisi.map((item, index) => ({
      No: index + 1,
      nama: item.nama,
      etnis: item.etnis,
      kategori: item.kategori,
      media: item.media,
      komponen: item.komponen,
      provinsi: item.provinsi,
      kota: item.kota,
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
      { width: 20 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tradisi");
    XLSX.writeFile(wb, "Tradisi.xlsx");
  };

  const serchHandler = (e) => {
    setSerch(e.target.value);
    const filteredData = Tradisi.filter((item) =>
      item.nama.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDataFound(filteredData.length > 0);
  };

  const filterdTradisi = Tradisi.filter((item) =>
    item.nama.toLowerCase().includes(serch.toLowerCase())
  );
  return (
    <div className="font-romans text-secondary py-3 px-2">
      <h1 className="text-xl font-semibold bg-tertiary shadow-md p-2 rounded-md">
        Data Tradisi
      </h1>
      <div className="flex justify-between">
        <div className="flex gap-x-1 mt-3 px-2">
          <h5 className="text-xl">List Tradisi!</h5>
          <Link to={"/Tradisi/add"}>
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
            <th className="w-32">Action</th>
          </tr>
        </thead>
        {dataFound ? (
          <tbody className="text-center">
            {filterdTradisi.map((Tradisi, index) => (
              <tr className="border" key={Tradisi.uuid}>
                <td>{index + 1}</td>
                <td>{Tradisi.nama}</td>
                <td>{Tradisi.provinsi}</td>
                <td>{Tradisi.kota}</td>
                <td className="space-x-6">
                  <button>
                    <Link to={`/Tradisi/edit/${Tradisi.uuid}`}>
                      <PencilIcon className="w-5" />
                    </Link>
                  </button>
                  <button
                    onClick={() => deleteTradisi(Tradisi.uuid, Tradisi.nama)}
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
