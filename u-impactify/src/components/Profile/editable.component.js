import React, { useState, useEffect } from 'react'

export default function Editable(props) {
  const [value, setValue] = useState(props.content)
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState(props.content)

  useEffect(() => {
    setValue(props.content);
    setText(props.content);

    if (props.content === '') {
      setValue("none");
      setText("none")
    }

  }, [props.content])

  const changeEditMode = () => {
    setEdit(!edit)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setEdit(false)
    setValue(text)
    props.updateField(text)
    props.updateDatabase()
  }

  const editView = () => {
    return (
      <div>
        <form onSubmit={onSubmit}>
          <input type='text' defaultValue={value} onChange={(e) => setText(e.target.value)}/>
          <button onClick={changeEditMode}>X</button>
          <input type='submit' value='OK' />
        </form>
      </div>
    )
  }

  const displayView = () => {
    return (
      <div onClick={changeEditMode}>
        {value}&nbsp;
      </div>
    )
  }

  return (
    edit ? editView() : displayView()
  )
}
