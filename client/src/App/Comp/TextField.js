export const CSXTextField = ({ classname }) => {
  const addedClassName = `CSXTextField ${classname}`;
  const addClassName = classname ? addedClassName : 'CSXTextField';

  return (
    <input type="search"
      className={addClassName}
      placeholder="Pencarian"
    />
  );
}

export const CSXTextFieldTranslucent = ({classname}) => {
  const addedClassName = `CSXTextField-translucent ${classname}`;
  const addClassName = classname ? addedClassName : 'CSXTextField-translucent';

  return <CSXTextField classname={addClassName} />
}