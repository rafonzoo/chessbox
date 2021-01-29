export const SearchInput = ({ classname }) => {
  const inputClassName = 'form-control search-input';
  const addedClassName = `${inputClassName} ${classname}`;
  const addClassName = classname ? addedClassName : inputClassName;

  return (
    <input type="search"
      className={addClassName}
      placeholder="Pencarian"
    />
  );
}

export const SearchInputTranslucent = () => {
  return <SearchInput classname="search-input-translucent" />
}