import {
  useRef,
  useEffect,
  useCallback,
} from 'react'
import SmoothScrollbar from 'smooth-scrollbar'
import { useSizeObserve } from '@hooks'
// import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll'

const Scrollbar = (props) => {
  const {
    anchor,
    autoScroll = false,
    scrollDirection = 'width', // width or height
    style,
    alwaysShowTracks = false,
    // overscroll = false,
    children,
  } = props
  const el = useRef(null)
  const instance = useRef(null)
  const {
    observer,
    width,
    height,
  } = useSizeObserve()
  useEffect(()=> {
    if(!el.current) return
    const options = {
      plugins: {
        alwaysShowTracks,
        overscroll: {
          effect: 'glow',
        }
      }
    }
    instance.current = SmoothScrollbar.init(el.current, options)
    observer.observe(el.current)
    return () => {
      observer.disconnect()
      instance.current.destroy()
      instance.current = null // for gc
    }
  }, [])

  

  const handleAnchor = useCallback(e => {
    // don't auto scroll when there's no anchor assigned or scroll bar visible
    if(!autoScroll || !anchor) return
    const {
      container,
      content,
    } = instance.current.getSize()
    const hasScrollbar = content[scrollDirection] > container[scrollDirection]
    if(!hasScrollbar) return
    const el = document.querySelector(`#${anchor}`)
    instance.current.scrollIntoView(el)
  }, [anchor, instance])

  useEffect(() => {
    handleAnchor()
  }, [width, height, anchor])

  return (
    <div
      ref={el}
      className="smooth-scroll"
      style={style}
    >
      { children }
    </div>
  )
}

export default Scrollbar
