import {
  useEffect,
  useRef,
  useState,
} from "react";

const useAsyncState = (defaultValue) => {
  const isMounted = useRef(null)
  const [state, setState] = useState(defaultValue)
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])
  const setValue = (updatedValue) => {
    if(isMounted.current) {
      setState(updatedValue)
    }
  }

  return [state, setValue]
}

export default useAsyncState
