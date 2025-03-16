import { createContext, useState, useEffect, useContext } from "react";

const JadwalContext = createContext();

export const JadwalGlobal = ({ children }) => {
  const [jadwal, setJadwal] = useState([]);

  // Mengambil jadwal dari API saat aplikasi pertama kali dimuat
  useEffect(() => {
    fetch("http://localhost:5000/api/jadwal")
      .then((response) => response.json())
      .then((data) => setJadwal(data))
      .catch((error) => console.error("Error fetching jadwal:", error));
  }, []);

  // Menambahkan jadwal baru
  const tambahJadwal = (tugas) => {
    if (!tugas || typeof tugas !== "string") return;

    fetch("http://localhost:5000/api/jadwal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tugas }),
    })
      .then((response) => response.json())
      .then((newJadwal) => setJadwal((prevJadwal) => [...prevJadwal, newJadwal]))
      .catch((error) => console.error("Error adding jadwal:", error));
  };

  // Menghapus jadwal
  const hapusJadwal = (id) => {
    fetch(`http://localhost:5000/api/jadwal/${id}`, { method: "DELETE" })
      .then(() => setJadwal((prevJadwal) => prevJadwal.filter((jdwl) => jdwl.id !== id)))
      .catch((error) => console.error("Error deleting jadwal:", error));
  };

  // Mengedit jadwal
  const editJadwal = (id, tugasBaru) => {
    if (!tugasBaru || typeof tugasBaru !== "string") return;

    fetch(`http://localhost:5000/api/jadwal/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tugas: tugasBaru }),
    })
      .then((response) => response.json())
      .then((updatedJadwal) => {
        setJadwal((prevJadwal) =>
          prevJadwal.map((jdwl) => (jdwl.id === id ? updatedJadwal : jdwl))
        );
      })
      .catch((error) => console.error("Error editing jadwal:", error));
  };

  return (
    <JadwalContext.Provider value={{ jadwal, tambahJadwal, hapusJadwal, editJadwal }}>
      {children}
    </JadwalContext.Provider>
  );
};

export const useJadwal = () => useContext(JadwalContext);
