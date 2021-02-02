export const userIsAuthorized = () => {
  const storage = window.localStorage;
  return storage.getItem('CSX_TOKEN') ? true : false;
}

export const setTokenStorage = (data) => {
  const storage = window.localStorage;
  if (!storage.getItem("CSX_TOKEN")) {
    storage.setItem("CSX_TOKEN", data);
  }
}

export const removeTokenStorage = () => {
  const storage = window.localStorage;
  if (storage.getItem("CSX_TOKEN")) {
    storage.removeItem("CSX_TOKEN");
  }
}