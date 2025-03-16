import { JadwalGlobal } from "./context/JadwalContext";
import TambahJadwal from "./components/TambahJadwal";
import DaftarJadwal from "./components/DaftarJadwal";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("Aplikasi To-Do List dimuat (Mounting)");
    return () => console.log("Aplikasi ditutup (Unmounting)");
  }, []);

  return (
    <JadwalGlobal>
      <h1>Website Penjadwalan Pertemuan 5</h1>
      <TambahJadwal />
      <DaftarJadwal />
    </JadwalGlobal>
  );
}

export default App;
