import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  // State and setters for debounced value
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
      // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay);

    
      return () => {
        clearTimeout(handler)
      }
    }, [value, delay]) // Only re-call effect if value or delay changes

    return debounceValue
}