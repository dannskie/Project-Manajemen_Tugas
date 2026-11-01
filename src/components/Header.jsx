function Header({ title, subtitle }) {
  return (
    <header className="app-header">
      <div className="header-badge">Task Tracker Kuliah</div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

export default Header;