import { useEffect } from 'react'
import styled from "styled-components";
import {
  Outlet,
  useLocation,
} from 'react-router-dom'

const MainLayout = styled.main`
  position: relative;
  min-height: calc(100vh - ${props => props.theme.rect.header_height});
`

const Main = (props) => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, [location])
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}

export default Main
