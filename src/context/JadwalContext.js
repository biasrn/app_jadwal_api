import { createContext, useState, useEffect, useContext } from "react";

const JadwalContext = createContext();

export const JadwalGlobal = ({ children }) => {
  const [jadwal, setJadwal] = useState([]);

  // Lifecycle: Memuat daftar tugas dari localStorage saat aplikasi pertama kali dijalankan (Mounting)
  useEffect(() => {
    const simpanJadwal = JSON.parse(localStorage.getItem("jadwal"));
    if (simpanJadwal) {
      setJadwal(simpanJadwal);
    }
  }, []);

  // Lifecycle: Menyimpan daftar tugas ke localStorage setiap kali todos berubah (Updating)
  useEffect(() => {
    localStorage.setItem("jadwal", JSON.stringify(jadwal));
  }, [jadwal]);

  const tambahJadwal = (tugas) => {
    if (!tugas || typeof tugas !== "string") return;
    console.log("Menambahkan tugas:", tugas); // Debugging
    setJadwal([...jadwal, { id: Date.now(), tugas: tugas.trim() }]);
  };

  const hapusJadwal = (id) => {
    setJadwal(jadwal.filter((jdwl) => jdwl.id !== id));
  };

  // Memperbaiki fungsi editJadwal agar dapat mengedit tugas
  const editJadwal = (id, tugasBaru) => {
    if (!tugasBaru || typeof tugasBaru !== "string") return;
    setJadwal(
      jadwal.map((jdwl) =>
        jdwl.id === id ? { ...jdwl, tugas: tugasBaru.trim() } : jdwl
      )
    );
  };

  return (
    <JadwalContext.Provider value={{ jadwal, tambahJadwal, hapusJadwal, editJadwal }}>
      {children}
    </JadwalContext.Provider>
  );
};

export const useJadwal = () => useContext(JadwalContext);
