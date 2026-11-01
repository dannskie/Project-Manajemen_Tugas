import TaskCard from "./TaskCard";

function TaskList({ tasks, onDeleteTask, onClearAll }) {
  return (
    <section className="task-list-section">
      <div className="list-header">
        <h2>Daftar Tugas Aktif</h2>
        {tasks.length > 0 && (
          <button type="button" className="btn-clear" onClick={onClearAll}>
            Kosongkan Semua
          </button>
        )}
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>Belum ada data Tugas</p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;