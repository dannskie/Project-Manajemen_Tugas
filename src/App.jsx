import { useState } from "react";
import Header from "./components/Header";
import TaskSummary from "./components/TaskSummary";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      judul: "Implementasi Modul Bab 6 React Dasar",
      mataKuliah: "Pemrograman Web",
      deadline: "H-1",
      deskripsi: "Membuat 5 component terpisah",
    },
    {
      id: 2,
      judul: "Perhitungan Software Maturity Index (SMI)",
      mataKuliah: "Penjaminan Mutu Perangkat Lunak",
      deadline: "H-3",
      deskripsi: "Menyelesaikan analisis metrik kualitas",
    },
    {
      id: 3,
      judul: "Desain Form Registrasi Event Mobile",
      mataKuliah: "Pemrograman Perangkat Bergerak",
      deadline: "H-7",
      deskripsi: "Menyusun validasi input peserta internal dan eksternal pada halaman registrasi.",
    },
    {
      id: 4,
      judul: "Penyusunan Proposal Pengabdian Masyarakat",
      mataKuliah: "Proyek Tingkat",
      deadline: "H-14",
      deskripsi: "Finalisasi dokumentasi konsep desa cerdas",
    },
  ]);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <div className="app-container">
      <Header
        title="Manajemen Tugas Semester Ini"
        subtitle="Semangat Mengerjakan tugas tugas yang adaa!!"
      />
      <main className="main-content">
        <TaskSummary tasks={tasks} />
        <TaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onClearAll={handleClearAll}
        />
      </main>
    </div>
  );
}

export default App;