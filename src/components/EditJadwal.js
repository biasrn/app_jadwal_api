import { useState, useEffect } from "react";
import { useJadwal } from "../context/JadwalContext";

const EditJadwal = ({ jdwl, onCancel }) => {
  const [tugasBaru, setTugasBaru] = useState(jdwl.tugas);
  const { editJadwal } = useJadwal();

  // Update the tugas state if the prop jdwl changes
  useEffect(() => {
    setTugasBaru(jdwl.tugas);
  }, [jdwl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tugasBaru.trim() !== "") {
      editJadwal(jdwl.id, tugasBaru);
      onCancel(); // Close the edit form after saving
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={tugasBaru}
        onChange={(e) => setTugasBaru(e.target.value)}
        placeholder="Edit Jadwal..."
      />
      <button type="submit">Simpan</button>
      <button type="button" onClick={onCancel}>
        Batal
      </button>
    </form>
  );
};

export default EditJadwal;
