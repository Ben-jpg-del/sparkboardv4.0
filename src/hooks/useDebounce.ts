"use client"

import { useState, useEffect } from "react"

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set debouncedValue to value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cancel the timeout if value changes or component unmounts
    // This is how we prevent debouncedValue from updating if value changes within the delay period
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
