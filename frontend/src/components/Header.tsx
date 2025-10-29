import "./Header.css";

interface HeaderProps {
  onShowStats: () => void;
  showingStats: boolean;
}

export default function Header({ onShowStats, showingStats }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <img src="/image.png" alt="ITHReex Logo" className="logo-img" />
          <div className="header-title">
            <h1>Sistema de Gestión de Empleados</h1>
            <p>ITHReex - Santino Ursino</p>
          </div>
        </div>
        <button className="btn-stats" onClick={onShowStats}>
          {showingStats ? "Ver Empleados" : "Ver Estadísticas"}
        </button>
      </div>
    </header>
  );
}
