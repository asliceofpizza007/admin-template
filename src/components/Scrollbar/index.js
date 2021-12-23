import {
  useRef,
  useEffect,
} from 'react'
import SmoothScrollbar from 'smooth-scrollbar'
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll'

const Scrollbar = (props) => {
  const {
    style,
    alwaysShowTracks = false,
    overscroll = false,
    children,
  } = props
  const el = useRef(null)
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
    let instance = SmoothScrollbar.init(el.current, options)
    return () => {
      instance.destroy()
      instance = null // for gc
    }
  }, [])

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
