import { useState } from "react";

export const useForceUpdate = () => { // eslint-disable-next-line
  const [value, setValue] = useState(0);
  return () => setValue(value => ++value);
}