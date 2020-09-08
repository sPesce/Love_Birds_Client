export const setCaretaker = caretaker =>
{
  return {
    type: 'SET_CARETAKER',
    caretaker
  }
}

export const removeCaretaker = () =>
{
  return {
    type: "REMOVE_CARETAKER",
    caretaker: {}
  }
}