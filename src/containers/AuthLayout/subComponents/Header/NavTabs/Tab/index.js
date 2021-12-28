import { useCallback } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import {
  useNavigate,
  useMatch,
} from "react-router-dom"
import { useAliveController } from "react-activation"
import { camelToUnderscore } from '@utils';
import { FontIcon } from '@styled/styledComponents'

const TabNode = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: ${props => props.active ? props.theme.color.primary : '#fff'};
  color: ${props => props.active ? '#fff' : props.theme.color.primary};
  padding: 5px 1rem;
  transition: color 0.3s ease-out, background-color 0.3s ease-out, opacity 0.3s ease-out;
  cursor: pointer;
  & + & {
    margin-left: 10px;
  }
  > span {
    font-weight: bold;
  }
  &:hover {
    background-color: ${props => props.theme.color.primary};
    color: #fff;
  }
`
const Close = styled(FontIcon)`
  margin-left: 10px;
  transition: color 0.3s ease-in, transform 0.1s ease;
  &:hover {
    color: ${props => props.theme.color.active};
    transform: scale(1.2)
  }
`

const Tab = (props) => {
  const {
    name,
    path = '',
    param,
    i18n_key,
  } = props
  const { t } = useTranslation('nav')
  const { drop } = useAliveController()
  const navigate = useNavigate()
  const match = useMatch(`/auth${path}`)
  const handleNavigate = useCallback(() => {
    if(match) return
    navigate(`/auth${path}`)
  }, [match])
  const key = camelToUnderscore(i18n_key)
  const options = {}
  if(param) {
    options.context = 'colon'
    options.id = param
  }

  const handleClose = useCallback((e) => {
    e.stopPropagation()
    drop(name)
  }, [])
  return (
    <TabNode
      id={name}
      active={!!match}
      onClick={handleNavigate}
    >
      <span>
        { t(key, options) }
      </span>
      {
        path && !match &&
        <Close
          size={12}
          className="aidmics-cross"
          onClick={handleClose}
        />
      }
    </TabNode>
  )
}

export default Tab