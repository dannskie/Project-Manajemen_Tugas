function TaskCard({ task, onDeleteTask }) {
  const badgeClassMap = {
    "H-1": "badge-h1",
    "H-3": "badge-h3",
    "H-7": "badge-h7",
    "H-14": "badge-h14",
  };

  return (
    <article className="task-card">
      <div className="task-card-header">
        <span className="course-tag">{task.mataKuliah}</span>
        <span className={`deadline-badge ${badgeClassMap[task.deadline]}`}>
          Deadline {task.deadline}
        </span>
      </div>
      <h3 className="task-title">{task.judul}</h3>
      <p className="task-desc">{task.deskripsi}</p>
      <div className="task-card-footer">
        <button
          type="button"
          className="btn-delete"
          onClick={() => onDeleteTask(task.id)}
        >
          Selesai / Hapus
        </button>
      </div>
    </article>
  );
}

export default TaskCard;