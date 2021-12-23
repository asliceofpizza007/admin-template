import {
  useLayoutEffect,
  useEffect,
  Suspense,
  useMemo,
  useState,
} from 'react'
import styled from 'styled-components'
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group'
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import KeepAlive from 'react-activation'
import { Skeleton } from 'antd'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import {
  setIsMobile,
  toggleNav,
} from '@redux/modules/layouts'
import { setRole } from '@redux/modules/account'
import { useMatchMedia } from '@hooks'
import {
  getLazyComponent,
  parseJWT,
} from '@utils'
import {
  userRoutes,
  serialRoutes,
} from '@js/routes'
import {
  Header,
  Main,
  Navbar,
} from './subComponents'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => {
    const {
      collapsed,
      theme,
    } = props
    return collapsed ?
      theme.rect.nav_collapsed_width :
      theme.rect.nav_width
  }};
  transition: margin-left 0.2s ease-in-out;
  @media (max-width: 996px) {
    margin-left: unset;
  }
`

const AuthLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  
  const dispatch = useDispatch()
  const isNavCollapsed = useSelector(state => state.layouts.isNavCollapsed)
  const role = useSelector(state => state.account.role)
  const { isMatch } = useMatchMedia('max-width', 996)
  useLayoutEffect(() => {
    dispatch(setIsMobile(isMatch))
    dispatch(toggleNav(isMatch))
  }, [isMatch])

  const mergedRoutes = useMemo(() => {
    let routes = [ ...serialRoutes ]
    if(['Admin', 'Staff'].includes(role)) {
      routes = routes.concat(userRoutes)
    }
    
    return routes.map(route => {
      const {
        name,
        path,
        hasParams,
      } = route

      return (
        <Route
          key={name}
          path={path}
          element={
            hasParams ? 
            getLazyComponent(name, 'views') :
            (
              <KeepAlive
                id={name}
                i18n_key={name}
                name={name}
                path={path}
              >
                { getLazyComponent(name, 'views') }
              </KeepAlive>
            )
          }
        />
      )
    })
  }, [role])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) {
      navigate('/login', {
        state: {
          from: location,
        }
      })
      return
    }
    const { role } = parseJWT(token)
    dispatch(setRole(role))
    setIsLoading(false)
  }, [])

  if(isLoading) {
    return (
      <Skeleton />
    )
  }

  return (
    <Layout collapsed={isNavCollapsed}>
      <Header />
      <TransitionGroup>
        <CSSTransition
          mode="out-in"
          classNames="route"
          timeout={500}
          key={location.key}
        >
          <Routes location={location}>
            <Route
              element={
                <Suspense>
                  <Main />
                </Suspense>
              }
            >
              <Route
                index
                element={(
                  <KeepAlive
                    id="Dashboard"
                    name="Dashboard"
                    i18n_key="dashboard"
                  >
                    { getLazyComponent('Dashboard', 'views') }
                  </KeepAlive>
                )}
              />
              { mergedRoutes }
              {/** fallback route */}
              <Route
                path="*"
                element={
                  <Navigate to="/error" />
                }
              />
            </Route>
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Navbar />
    </Layout>
  )
}

export default AuthLayout
