import styled from "styled-components";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { toggleNav } from '@redux/modules/layouts'
import { Scrollbar } from '@components'
import logo from '@images/logo-icon.png'
import Menus from './Menus'


const Nav = styled.nav`
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  width: ${props => {
    const {
      theme,
      collapsed,
    } = props
    const { rect } = theme
    return collapsed ?
      rect.nav_collapsed_width :
      rect.nav_width
  }};
  background-color: #001529;
  transition: width 0.2s ease-in-out, left 0.2s ease-in-out;
  overflow: hidden;
  z-index: 10;
  @media (max-width: 996px) {
    width: ${props => props.theme.rect.nav_width};
    left: ${props => props.collapsed ? '-230px' : '0'};
  }
`
const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: ${props => props.theme.rect.nav_logo_height};
  padding: 0 24px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 24px;
  > img {
    width: 25px;
    margin: unset;
  }
  p {
    margin-left: 10px;
    white-space: nowrap;
    font-weight: bold;
  }
`
const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9;
`

const Navbar = (props) => {
  const dispatch = useDispatch()
  const isNavCollapsed = useSelector(state => state.layouts.isNavCollapsed)
  const isMobile = useSelector(state => state.layouts.isMobile)


  return (
    <>
      <Nav collapsed={isNavCollapsed}>
        <Logo>
          <img src={logo} alt="logo" />
          {
            !isNavCollapsed &&
            <p>
              Aidmics
            </p>
          }
        </Logo>
        <Scrollbar
          style={{
            height: 'calc(100% - 60px)',
          }}
        >
          <Menus />
        </Scrollbar>
      </Nav>
      {
        isMobile && !isNavCollapsed &&
        <Mask
          onClick={() => {
            dispatch(toggleNav())
          }}
        />
      }
    </>
  )
}

export default Navbar
