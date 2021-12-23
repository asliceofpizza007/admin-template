const TOGGLE_NAV = 'TOGGLE_NAV'
const SET_IS_MOBILE = 'SET_IS_MOBILE'

// actions
export const toggleNav = (collapsed) => {
  return {
    type: TOGGLE_NAV,
    collapsed,
  }
}

export const setIsMobile = (status) => {
  return {
    type: SET_IS_MOBILE,
    isMobile: status
  }
}

// reducer
let initLayoutState = {
  isNavCollapsed: false,
  isMobile: false,
}

const layoutReducer = (state = initLayoutState, action) => {
  switch (action.type) {
    case TOGGLE_NAV:
      const collapsed = typeof action.collapsed === 'boolean' ? action.collapsed : !state.isNavCollapsed
      return {
        ...state,
        isNavCollapsed: collapsed,
      }
    case SET_IS_MOBILE:
      return {
        ...state,
        isMobile: action.isMobile,
      }
    default:
      return state
  }
}

export default layoutReducer
