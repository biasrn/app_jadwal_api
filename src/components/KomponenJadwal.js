import { useState, useEffect } from "react";
import { useJadwal } from "../context/JadwalContext";
import EditJadwal from "./EditJadwal";

const KomponenJadwal = ({ jdwl }) => {
  const { hapusJadwal } = useJadwal();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log(`Tugas ditambahkan: ${jdwl.tugas}`);
    return () => console.log(`Tugas dihapus: ${jdwl.tugas}`);
  }, [jdwl.tugas]);

  if (!jdwl || !jdwl.tugas) return null;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <EditJadwal jdwl={jdwl} onCancel={handleCancelEdit} />
      ) : (
        <>
          {jdwl.tugas}
          <button onClick={() => hapusJadwal(jdwl.id)}>Hapus</button>
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
    </li>
  );
};

export default KomponenJadwal;
