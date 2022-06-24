import React, { useRef, useState, useMemo, useCallback } from "react";
import Counter from "./components/Counter";
import CreateUser from "./components/CreateUser";
import Hello from './components/Hello';
import InputSample from "./components/InputSample";
import InputSample2 from "./components/InputSample2";
import UserList from "./components/UserList";
import Wrapper from "./components/Wrapper";

function countAvticeUsers(users) {
  console.log('활성 사용자 수 세는중 ...')
  return users.filter(user => user.active).length
}

function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'dongsong',
      email: 'dongsong@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@gmail.com',
      active: false
    }
  ])

  const nextId = useRef(4)
  const [inputs, setIntpus] = useState({
    username: '',
    email: ''
  })
  const { username, email } = inputs

  const onChange = useCallback((e) => {
    const { name, value } = e.target
    setIntpus({
      ...inputs,
      [name]: value
    })
  }, [inputs])

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email
    }
    setUsers(users => [
      ...users,
      user
    ])
    // setUsers(users.concat(user))
    setIntpus({
      username: '',
      email: ''
    })
    console.log(nextId.current) // 4
    nextId.current += 1
  }, [username, email])

  const onRemove = useCallback((id) => {
    setUsers(users => users.filter(user => user.id !== id))
  }, [])

  const onToggle = useCallback((id) => {
    setUsers(users => users.map(
      user => user.id === id ? { ...user, active: !user.active } : user
    ))
  }, [])

  const count = useMemo(() => countAvticeUsers(users), [users])

  return (
    <>
      <Wrapper>
        <Hello 
          name="React" 
          color="red"
          isSpecial={true}
        />
        <Hello color="blue" />

      </Wrapper>

      <Counter />

      <InputSample />
      <InputSample2 />

      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList 
        users={users} 
        onRemove={onRemove}
        onToggle={onToggle}
      />
      <div>활성 사용자 수 : {count}</div>
    </>
  )
}

export default App;
