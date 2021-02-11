const INITIAL_STATE = {
  data: [],
  fullData: [],
  loading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'fetch':
      return {...state, data: action.payload, fullData: action.payload, loading: false};
    case 'loading':
      return {...state, loading: action.payload};
    case 'search_result':
      return {...state, data: action.payload};
    default:
      return state;
  }
}