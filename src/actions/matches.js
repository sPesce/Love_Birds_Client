export const setMatches = matches =>
{
  return {
    type: 'SET_MATCHES',
    matches
  }
}

export const updateMatch = match =>
{
  return {
    type: 'UPDATE_MATCH',
    match
  }
}

export const addMatch = match =>
{
  return {
    type: 'ADD_MATCH',
    match
  }
}