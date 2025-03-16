import { useState, useEffect } from "react";
import { useJadwal } from "../context/JadwalContext";

const TambahJadwal = () => {
  const [tugas, setTugas] = useState("");
  const { tambahJadwal } = useJadwal();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form disubmit! Jadwal:", tugas); // Debugging
    if (tugas.trim() !== "") {
      tambahJadwal(tugas);
      setTugas("");
    }
  };

  // Lifecycle: Logging perubahan pada input task (Updating)
  useEffect(() => {
    console.log("Jadwal input berubah:", tugas);
  }, [tugas]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={tugas}
        onChange={(e) => setTugas(e.target.value)}
        placeholder="Tambah Jadwal..."
      />
      <button type="submit">Tambah</button>
    </form>
  );
};

export default TambahJadwal;
