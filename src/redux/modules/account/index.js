const SET_ROLE = "SET_ROLE"

// actions
export const setRole = (role) => {
  return {
    type: SET_ROLE,
    role,
  }
}

// reducer
let initAccountState = {
  role: null,
}

const accountReducer = (state = initAccountState, action) => {
  switch (action.type) {
    case SET_ROLE:
      return {
        ...state,
        role: action.role,
      }
    default:
      return state
  }
}

export default accountReducer
