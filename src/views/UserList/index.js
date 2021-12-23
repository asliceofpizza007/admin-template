import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button } from 'antd'
const UserList = () => {
  const navigate = useNavigate()
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <Button 
        onClick={() => {
          setCounter(pre => pre + 1)
          const random = Math.floor(Math.random()*100)
          navigate(`/auth/trends/${random}`)
        }}
        type='primary'
      >
        add
      </Button>
      <h1>
        Counter: {counter}
      </h1>
      user list
    </div>
  )
}

export default UserList
