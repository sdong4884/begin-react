import React, {
  useCallback,
  useMemo,
  useReducer,
  useRef,
  createContext,
} from 'react'
import produce from 'immer'
import CreateUser from './components/CreateUser'
import UserList from './components/UserList'
import Button from './components/Button'

window.produce = produce

function countAvticeUsers(users) {
  console.log('활성 사용자 수 세는중 ...')
  return users.filter((user) => user.active).length
}

const initialState = {
  inputs: {
    username: '',
    email: '',
  },
  users: [
    {
      id: 1,
      username: 'dongsong',
      email: 'dongsong@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@gmail.com',
      active: false,
    },
  ],
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      }
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      }
    case 'TOGGLE_USER':
      // return {
      //   ...state,
      //   users: state.users.map(user =>
      //     user.id === action.id ? { ...user, active: !user.active } : user
      //   )
      // }
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id)
        user.active = !user.active
      })
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      }
    default:
      throw new Error('Unhandled action')
  }
}

export const UserDispatch = createContext(null)

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { users } = state
  const { username, email } = state.inputs

  const nextId = useRef(4)

  const onChange = useCallback((e) => {
    const { name, value } = e.target
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value,
    })
  }, [])

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      },
    })
    nextId.current += 1
  }, [username, email])

  const count = useMemo(() => countAvticeUsers(users), [users])

  return (
    <>
      <UserDispatch.Provider value={dispatch}>
        <CreateUser
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
        />
        <UserList users={users} />
        <div>활성 사용자 수 : {count}</div>
      </UserDispatch.Provider>

      <div class="button-groups">
        <h1>Buttons</h1>
        <div className="buttons">
          <Button size="large">BUTTON</Button>
          <Button size="medium">BUTTON</Button>
          <Button size="small">BUTTON</Button>
        </div>
        <div className="buttons">
          <Button size="large" color="gray">
            BUTTON
          </Button>
          <Button size="medium" color="gray">
            BUTTON
          </Button>
          <Button size="small" color="gray">
            BUTTON
          </Button>
        </div>
        <div className="buttons">
          <Button size="large" color="pink">
            BUTTON
          </Button>
          <Button size="medium" color="pink">
            BUTTON
          </Button>
          <Button size="small" color="pink">
            BUTTON
          </Button>
        </div>
        <div className="buttons">
          <Button size="large" outline>
            BUTTON
          </Button>
          <Button size="medium" color="gray" outline>
            BUTTON
          </Button>
          <Button size="small" color="pink" outline>
            BUTTON
          </Button>
        </div>
        <div className="buttons">
          <Button size="large" fullWidth>
            BUTTON
          </Button>
          <Button size="large" color="gray" fullWidth>
            BUTTON
          </Button>
          <Button
            size="large"
            color="pink"
            fullWidth
            className="customize-button"
            onClick={() => {
              console.log('클릭!')
            }}
          >
            BUTTON
          </Button>
        </div>
      </div>
    </>
  )
}

export default App
