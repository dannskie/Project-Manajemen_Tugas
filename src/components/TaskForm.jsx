import { useState } from "react";

function TaskForm({ onAddTask, isSubmitting }) {
  const [judul, setJudul] = useState("");
  const [mataKuliah, setMataKuliah] = useState("");
  const [deadline, setDeadline] = useState("H-3");
  const [deskripsi, setDeskripsi] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!judul.trim() || !mataKuliah.trim()) return;

    await onAddTask({
      judul: judul.trim(),
      mataKuliah: mataKuliah.trim(),
      deadline,
      deskripsi: deskripsi.trim() || "Tidak ada catatan tambahan.",
    });

    setJudul("");
    setMataKuliah("");
    setDeadline("H-3");
    setDeskripsi("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Tambah Tugas Baru (POST ke API)</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="judul">Nama Tugas</label>
          <input
            id="judul"
            type="text"
            placeholder="Contoh: Integrasi Fetch API React"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mataKuliah">Mata Kuliah / Organisasi</label>
          <input
            id="mataKuliah"
            type="text"
            placeholder="Contoh: Pemrograman Web"
            value={mataKuliah}
            onChange={(e) => setMataKuliah(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Kategori Deadline</label>
          <select
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            disabled={isSubmitting}
          >
            <option value="H-1">H-1 (Sangat Mendesak)</option>
            <option value="H-3">H-3 (Segera Dikerjakan)</option>
            <option value="H-7">H-7 (Minggu Ini)</option>
            <option value="H-14">H-14 (Dua Minggu Lagi)</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="deskripsi">Deskripsi / Catatan Tugas</label>
        <textarea
          id="deskripsi"
          rows="2"
          placeholder="Contoh: Menampilkan state loading, success, dan error"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" className="btn-submit" disabled={isSubmitting}>
        {isSubmitting ? "Mengirim ke API..." : "+ Tambah"}
      </button>
    </form>
  );
}

export default TaskForm;