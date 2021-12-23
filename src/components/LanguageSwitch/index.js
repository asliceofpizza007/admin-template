import { useCallback } from "react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import styled from 'styled-components'

const Languages = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0px 1px 10px #eee, 0px 1px 10px #ccc, 0px 1px 10px #666;
  > li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.5rem 0.8rem;
    color: ${props => props.theme.color.dark};
    font-weight: bold;
    transition: background-color 0.5s ease;
    cursor: pointer;
    &.active,
    &:hover {
      background-color: ${props => props.theme.color.active};
    }
  }
`

const LanguageSwitch = () => {
  const { i18n } = useTranslation()
  const languageWhiteList = useRef({
    en: 'English',
    zh_tw: '繁體',
    zh_cn: '简体',
  })

  const changeLanguage = useCallback((key) => {
    return e => {
      i18n.changeLanguage(key)
    }
  }, [])
  return (
    <Languages>
      {
        Object.keys(languageWhiteList.current).map(key => {

          return (
            <li
              key={key}
              className={i18n.language === key ? 'active' : ''}
              onClick={changeLanguage(key)}
            >
              { languageWhiteList.current[key] }
            </li>
          )
        })
      }
    </Languages>
  )
}

export default LanguageSwitch
