import React from 'react'

const AddButton = ({cb, disabled}) => {
  return (
    <button onClick={() => cb()} disabled={disabled}>
        Add
    </button>
  )
}

export default AddButton