import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskSummary from "./components/TaskSummary";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

function App() {
  const [tasks, setTasks] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTasksFromAPI = async (customUrl = API_URL) => {
    setFetchStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(`${customUrl}?_limit=6`);
      if (!response.ok) {
        throw new Error(`Gagal memuat data dari server (Status HTTP: ${response.status})`);
      }

      const data = await response.json();
      const deadlineOptions = ["H-1", "H-3", "H-7", "H-14"];
      const courseOptions = [
        "Pemrograman Web",
        "Penjaminan Mutu Perangkat Lunak",
        "Pemrograman Perangkat Bergerak",
        "Proyek Tingkat",
      ];

      const formattedTasks = data.map((item, index) => ({
        id: item.id,
        judul: `Modul Tugas #${item.id}: ${item.title}`,
        mataKuliah: courseOptions[index % courseOptions.length],
        deadline: deadlineOptions[index % deadlineOptions.length],
        deskripsi: item.completed
          ? "Status sinkronisasi API: Referensi tugas telah diverifikasi."
          : "Status sinkronisasi API: Tugas aktif dari server, segera kerjakan.",
      }));

      setTasks(formattedTasks);
      setFetchStatus("success");
    } catch (error) {
      setErrorMessage(
        error.message || "Terjadi gangguan jaringan saat menghubungi server API."
      );
      setFetchStatus("error");
    }
  };
  useEffect(() => {
    fetchTasksFromAPI();
  }, []);
  const handleAddTask = async (newTaskData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTaskData.judul,
          course: newTaskData.mataKuliah,
          deadline: newTaskData.deadline,
          description: newTaskData.deskripsi,
          completed: false,
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim data tugas baru ke API.");
      }

      const result = await response.json();

      const createdTask = {
        ...newTaskData,
        id: Date.now() + (result.id || 0),
      };

      setTasks((prevTasks) => [createdTask, ...prevTasks]);
    } catch (error) {
      alert("Error POST API: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
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
        title="Manajemen Tugas Kuliah"
        subtitle="Integrasi AJAX & REST API (JSONPlaceholder) dengan pemantauan deadline H-1, H-3, H-7, dan H-14"
      />
      <section className="api-control-bar">
        <div className="api-info">
          <span className="api-badge">Sumber API</span>
          <code>GET & POST https://jsonplaceholder.typicode.com/todos</code>
        </div>
        <div className="api-actions">
          <button
            type="button"
            className="btn-sim"
            onClick={() => fetchTasksFromAPI(API_URL)}
          >
            Muat Ulang API (Normal)
          </button>
          <button
            type="button"
            className="btn-sim"
            onClick={() => setFetchStatus("loading")}
          >
            Simulasi Loading
          </button>
          <button
            type="button"
            className="btn-sim danger"
            onClick={() =>
              fetchTasksFromAPI("https://jsonplaceholder.typicode.com/endpoint-salah-404")
            }
          >
            Simulasi Error API
          </button>
        </div>
      </section>

      <main className="main-content">
        <TaskSummary tasks={tasks} />
        <TaskForm onAddTask={handleAddTask} isSubmitting={isSubmitting} />

        {fetchStatus === "loading" && (
          <div className="api-state-box loading-box">
            <div className="spinner"></div>
            <h3>Sedang memuat daftar tugas dari server API...</h3>
            <p>Mohon tunggu sebentar, aplikasi sedang mengambil data secara asinkron.</p>
          </div>
        )}

        {fetchStatus === "error" && (
          <div className="api-state-box error-box">
            <h3>Gagal Mengambil Data dari API!</h3>
            <p className="error-detail">{errorMessage}</p>
            <button
              type="button"
              className="btn-retry"
              onClick={() => fetchTasksFromAPI(API_URL)}
            >
              Coba Lagi
            </button>
          </div>
        )}

        {fetchStatus === "success" && (
          <TaskList
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
            onClearAll={handleClearAll}
          />
        )}
      </main>
    </div>
  );
}

export default App;