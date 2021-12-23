import {
  useEffect,
  useState,
  useCallback,
} from 'react'

const compare = (prefix, breakPoint) => {
  if(prefix === 'max-width') {
    return window.innerWidth < breakPoint
  }
  return window.innerWidth > breakPoint
}

const useMatchMedia = (prefix, breakPoint) => {
  const [isMatch, setMatch] = useState(() => compare(prefix, breakPoint))
  const handleMediaChange = useCallback((e) => {
    const { matches } = e
    setMatch(matches)
  }, [])
  useEffect(() => {
    let mediaQuery = window.matchMedia(`(${prefix}: ${breakPoint}px)`)
    mediaQuery.addEventListener('change', handleMediaChange)
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
      mediaQuery = null
    }
  }, [])

  return {
    isMatch
  }
}

export default useMatchMedia
