export const userIsAuthorized = () => {
  const storage = window.localStorage;
  return storage.getItem('CSX_TOKEN') ? true : false;
}

export const getTokenStorage = () => {
  const storage = window.localStorage;
  return storage.getItem('CSX_TOKEN');
}

export const parseTokenPayload = () => {
  const userIDfromJWT = getTokenStorage();
  const splitToken = userIDfromJWT.split('.');
  const extractPayload = atob(splitToken[1]);

  return JSON.parse(extractPayload);
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