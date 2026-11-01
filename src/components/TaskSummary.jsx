function TaskSummary({ tasks }) {
  const countByDeadline = (type) =>
    tasks.filter((task) => task.deadline === type).length;

  return (
    <section className="summary-section">
      <div className="summary-card total">
        <span className="summary-label">Total Tugas</span>
        <strong className="summary-value">{tasks.length}</strong>
      </div>
      <div className="summary-card urgent">
        <span className="summary-label">Deadline H-1</span>
        <strong className="summary-value">{countByDeadline("H-1")}</strong>
      </div>
      <div className="summary-card warning">
        <span className="summary-label">Deadline H-3</span>
        <strong className="summary-value">{countByDeadline("H-3")}</strong>
      </div>
      <div className="summary-card medium">
        <span className="summary-label">Deadline H-7</span>
        <strong className="summary-value">{countByDeadline("H-7")}</strong>
      </div>
      <div className="summary-card safe">
        <span className="summary-label">Deadline H-14</span>
        <strong className="summary-value">{countByDeadline("H-14")}</strong>
      </div>
    </section>
  );
}

export default TaskSummary;