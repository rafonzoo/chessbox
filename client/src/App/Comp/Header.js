export const GlobalHeader = ({ children }) => {
  return (
    <header id="global-header">
      { children }
    </header>
  );
}

export const LargeTitle = ({ label, children }) => {
  return (
    <div className="header-content">
      <div className="content-wrapper">
        <div className="content-user-picture"></div>
        <div className="content-text">{label}</div>
      </div>
      { children ? children : null }
    </div>
  );
}