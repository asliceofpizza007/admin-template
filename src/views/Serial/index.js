import { useParams } from "react-router-dom"
import KeepAlive from "react-activation"

const Serial = () => {
  const { serial_id } = useParams()
  return (
    <KeepAlive
      id={`serial-${serial_id}`}
      name={`serial-${serial_id}`}
      i18n_key="serial"
      param={serial_id}
      path={`/serials/${serial_id}`}
    >
      <div>
        serial
        <span>
          {serial_id}
        </span>
      </div>
    </KeepAlive>
  )
}

export default Serial
