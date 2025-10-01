import { useEffect, useState } from "react";

export function useDebounce( value, timeout ) {
  const [debouncedValue, setdebouncedValue] = useState(value);
  useEffect(() => {
    const x = setTimeout(() => {
      setdebouncedValue(value);
    }, timeout);
    return () => {
      clearTimeout(x);
    };
  }, [value]);
  return debouncedValue;
}
