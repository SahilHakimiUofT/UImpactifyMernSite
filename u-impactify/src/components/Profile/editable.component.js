import React, { useState, useEffect } from 'react'
import "./editable.css"

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setEdit(false)
    setValue(text)
    props.updateField(text)
  }

  const editView = () => {
    return (
      <div>
        <input type='text' defaultValue={value} onChange={(e) => setText(e.target.value)} className="textbox"/>
        <button className="btn btn-secondary" onClick={changeEditMode}>X</button>
        <button className="btn btn-primary" onClick={handleSubmit}>OK</button>
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
