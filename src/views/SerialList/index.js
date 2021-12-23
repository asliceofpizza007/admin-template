import { useNavigate } from "react-router-dom"

const SerialList = () => {
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => {
        const random = Math.floor(Math.random()*100)
        navigate(`/auth/serials/${random}`)
      }}>
        add
      </button>
      serial list
    </div>
  )
}

export default SerialList
