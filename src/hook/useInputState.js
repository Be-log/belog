import { useState } from 'react'

//Write 페이지 커스텀 훅

function useInputState(initialValue) {
  const [value, setValue] = useState(initialValue)
  const [editedValue, setEditedValue] = useState("")

  const handleChange = (event) => {
    setEditedValue(event.target.value)
  }

  const handleEdit = (message) => {
    if (editedValue !== "") {
      const confirmation = window.confirm(message)
      if (confirmation) {
        setValue(editedValue)
        setEditedValue("")
      }
    } else {
      alert("입력값이 비어있습니다.")
    }
  }

  return [value, editedValue, handleChange, handleEdit]
}

export default useInputState
