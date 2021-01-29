export const EmptyContent = ({ manualHeight }) => {
  const height = manualHeight ? manualHeight : '78vh';

  return (
    <div className="d-flex justify-content-center" style={{ height: height }}>
      <div className="text-center mt-4 align-self-center">
        <p style={{ fontSize: '36px' }}>¯\_(ツ)_/¯</p>
        <p className="mt-4">
          We're really sorry. We will back as <br />
          soon as the content ready.
        </p>
      </div>
    </div>
  );
}