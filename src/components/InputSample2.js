import React, { useRef, useState } from "react";

function InputSample2() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  })
  const { name, nickname } = inputs

  const nameInput = useRef()

  const onChange = (e) => {
    console.log(e.target.name, e.target.value)
    const { name, value } = e.target
    setInputs({
      ...inputs,
      [name]: value
    })
  }
  const onReset = () => {
    setInputs({
      name: '',
      nickname: ''
    })
    nameInput.current.focus()
  }
  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        value={name}
        ref={nameInput}
        onChange={onChange}
      />
      <input
        name="nickname"
        placeholder="닉네임"
        value={nickname}
        onChange={onChange}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값 : </b>    
        {name} ({nickname})
      </div>
    </div>
  )
}

export default InputSample2;