import { useCallback } from "react"
import styled from "styled-components"
import { Dropdown } from "antd"
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { useNavigate } from "react-router-dom"
import { useAliveController } from 'react-activation'
import { toggleNav } from "@redux/modules/layouts"
import { FontIcon } from "@styled/styledComponents"
import { LanguageSwitch } from '@components'
import { useAxios } from '@hooks'
import NavTabs from './NavTabs'

const Head = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: ${props => props.theme.rect.header_height};
  display: flex;
  flex-direction: column;
  box-shadow: 0px -3px 10px ${props => props.theme.color.dark};
  background-color: ${props => props.theme.color.light_gray};
  z-index: 1;
`

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 1rem;
  color: ${props => props.theme.color.light_gray};
  background-color: ${props => props.theme.color.primary};
`
const CollapseIcon = styled(FontIcon)`
  cursor: pointer;
`
const InfoContent = styled.ul`
  display: flex;
  align-items: center;
  > li {
    display: flex;
    align-items: center;
    cursor: pointer;
    & + li {
      margin-left: 10px;
    }
  }
`

const Header = (props) => {
  const { clear } = useAliveController()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isNavCollapsed = useSelector(state => state.layouts.isNavCollapsed)
  const isMobile = useSelector(state => state.layouts.isMobile)

  const toggleNavbar = useCallback(() => {
    dispatch(toggleNav())
  }, [])

  const {
    request: logout,
  } = useAxios('/logout', {
    method: 'POST'
  })
  const handleLogout = useCallback(async () => {
    try {
      await logout({})
      localStorage.clear()
      clear()
      navigate('/login')
    } catch(err) {
      console.error(err)
    }
  }, [])

  return (
    <Head>
      <Info>
        <CollapseIcon
          className={`aidmics-collapsed-${isMobile ? 'right' : isNavCollapsed ? 'right' : 'left'}`}
          size={24}
          onClick={toggleNavbar}
        />
        <InfoContent>
          <li>
            <Dropdown
              overlay={<LanguageSwitch />}
            >
              <FontIcon
                className="aidmics-translate"
                size={24}
              />
            </Dropdown>
          </li>
          <li>
            <FontIcon className="aidmics-user" />
            <span>Austin</span>
          </li>
          <li>
            <FontIcon
              className="aidmics-logout"
              size={24}
              onClick={handleLogout}
            />
          </li>
        </InfoContent>
      </Info>
      <NavTabs />
    </Head>
  )
}

export default Header
