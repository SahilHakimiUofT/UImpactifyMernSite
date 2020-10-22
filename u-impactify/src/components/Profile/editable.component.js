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

  const onSubmit = (e) => {
    e.preventDefault()
    setEdit(false)
    setValue(text)
    props.updateField(text)
  }

  const editView = () => {
    return (
      <form onSubmit={onSubmit} className="form-group">
        <input type='text' defaultValue={value} onChange={(e) => setText(e.target.value)} className="form-control textbox"/>
        <button className="btn btn-secondary" onClick={changeEditMode}>X</button>
        <input type='submit' value='OK' className="btn btn-primary"/>
      </form>
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
