const AuthSegment = (
  {
    id,
    title,
    children,
  }
) => {

  return (
    <div id={"CSXAuthentication-" + id} className="CSXAuthentication">
      <div className="CSXAuthentication-container">
        <div className="CSXAuthentication-content">
          <div className="CSXAuthentication-title">{title}</div>
          { children ? children : null }
        </div>
      </div>
    </div>
  );
}

export default AuthSegment;