import { useParams } from "react-router-dom"
import KeepAlive from "react-activation"

const Trend = () => {
  const { animal_id } = useParams()
  return (
    <KeepAlive
      id={`trend-${animal_id}`}
      name={`trend-${animal_id}`}
      i18n_key="trend"
      param={animal_id}
      path={`/trends/${animal_id}`}
    >
      <div>
        trend
        <span>
          {animal_id}
        </span>
      </div>
    </KeepAlive>
  )
}

export default Trend
