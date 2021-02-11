export const Fetch = (data) => {
  return {
    type: 'fetch',
    payload: data
  }
}

export const Loading = () => {
  return {
    type: 'loading',
    payload: true,
  }
}

export const SearchResult = (data) => {
  return {
    type: 'search_result',
    payload: data,
  }
}