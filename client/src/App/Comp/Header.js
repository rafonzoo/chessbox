export const GlobalHeader = ({ children }) => {
  return (
    <header id="CSXHeader" className="CSXHeader">
      { children }
    </header>
  );
}

export const LargeTitle = ({ label, children, noImage }) => {
  return (
    <div className="CSXHeaderMain CSXSafearea">
      <div className="CSXLargeTitle">
        { !noImage ? <div className="CSXLargeTitle-image"></div> : null }
        <div className="CSXLargeTitle-label">{label}</div>
      </div>
      { children ? children : null }
    </div>
  );
}