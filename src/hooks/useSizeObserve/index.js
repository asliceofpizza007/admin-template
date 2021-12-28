import {
  useRef,
  useCallback,
} from 'react'
import { debounce } from 'lodash'
import {
  useAsyncState
} from '@hooks'

const useSizeObserve = (
  delay = 500,
  options = {
    leading: false,
    trailing: true,
  }
) => {
  const [currentWidth, setWidth] = useAsyncState(0)
  const [currentHeight, setHeight] = useAsyncState(0)
  const onResize = useRef(entries => {
    const width = entries[0].contentRect.width
    const height = entries[0].contentRect.height
    setWidth(width)
    setHeight(height)
  })

  const debounceOnResize = useCallback(debounce(onResize.current, delay, options), [])
  const observer = useRef(new ResizeObserver(debounceOnResize))
  return {
    observer: observer.current,
    width: currentWidth,
    height: currentHeight
  }
}

export default useSizeObserve
