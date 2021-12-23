import {
  useRef,
  useMemo,
  useCallback,
  useState,
  useLayoutEffect,
} from 'react'
import { Menu } from 'antd'
import { useTranslation } from 'react-i18next'
import {
  matchRoutes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { isArray } from "lodash";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { toggleNav } from '@redux/modules/layouts'
import { camelToUnderscore } from '@utils';

const {
  Item,
  SubMenu,
} = Menu

const Menus = () => {
  const { t } = useTranslation('nav')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isNavCollapsed = useSelector(state => state.layouts.isNavCollapsed)
  const isMobile = useSelector(state => state.layouts.isMobile)
  const role = useSelector(state => state.account.role)

  const userNavigation = useRef([
    {
      name: 'user',
      icon: (
        <i className="aidmics-user" />
      ),
      menus: [
        {
          name: 'UserList',
          icon: (
            <i className="aidmics-users" />
          ),
          path: '/users',
          deps_routes: [
            '/trends/:animal_id',
            '/trends',
          ]
        }
      ]
    }
  ])
  const serialNavigation = useRef([
    {
      name: 'serial',
      icon: (
        <i className="aidmics-list" />
      ),
      menus: [
        {
          name: 'SerialList',
          icon: (
            <i className="aidmics-list" />
          ),
          path: '/serials',
          deps_routes: [
            '/serials/:serial_id',
          ]
        },
        {
          name: 'OrderList',
          icon: (
            <i className="aidmics-layer" />
          ),
          path: '/orders',
        },
      ]
    }
  ])
  const mergedNavigation = useMemo(() => {
    const navigation = [...serialNavigation.current]
    if(['Admin', 'Staff'].includes(role)) {
      navigation.splice(0, 0, ...userNavigation.current)
    }
    return navigation
  }, [role])

  const generateNav = useCallback((list = []) => {
    if(!isArray(list)) return
    const nav = list.map(item => {
      const {
        name,
        icon,
        path,
        menus,
      } = item
      const title = t(camelToUnderscore(name))
      if(menus?.length) {
        return (
          <SubMenu
            key={name}
            title={title}
            icon={icon}
          >
            { generateNav(menus) }
          </SubMenu>
        )
      }
      return (
        <Item
          key={path}
          icon={icon}
        >
          { title }
        </Item>
      )
    })
    return nav
  }, [])

  const items = useMemo(() => {
    return generateNav(mergedNavigation)
  }, [t, mergedNavigation])
  const [selectedKeys, setSelectedKeys] = useState()
  const [openKeys, setOpenKeys] = useState()
  const createHash = useCallback((list = [], hash = {}, keys = []) => {
    if(!isArray(list)) return
    list.forEach(item => {
      const openKeyPath = [
        ...keys,
      ]
      const {
        name,
        menus,
        path,
        deps_routes,
      } = item
      if(menus?.length) {
        openKeyPath.push(name)
        createHash(menus, hash, openKeyPath)
      } else {
        let routes = [path]
        if(deps_routes?.length) {
          routes = routes.concat(deps_routes)
        }
        const routeObjects = routes.map(route => {
          return {
            path: `/auth${route}`,
          }
        })
        hash[path] = {
          openKeyPath,
          routeObjects,
        }
      }
    })
    return hash
  }, [])
  const hash = useMemo(() => {
    return createHash(mergedNavigation)
  }, [mergedNavigation])
  useLayoutEffect(() => {
    let openKey = []
    let selectKey = 'dashboard'
    Object.keys(hash).forEach(key => {
      const {
        openKeyPath,
        routeObjects,
      } = hash[key]
      const matches = matchRoutes(routeObjects, location)
      if(matches) {
        openKey = openKeyPath
        selectKey = key
      }
    })

    // disabled set open keys when menu is collapsed.
    if(!isNavCollapsed) {
      setOpenKeys(openKey)
    }
    setSelectedKeys(selectKey)
  }, [location, isNavCollapsed, isMobile])

  const handleOnNavClick = useCallback(({key}) => {
    const path = `/auth${key === 'dashboard' ? '' : key}`
    if(path === location.pathname) return
    navigate(path)
    if(isMobile) {
      dispatch(toggleNav())
    }
  }, [isMobile, location])

  const handleOnOpenChange = useCallback((keys) => {
    setOpenKeys(keys)
  }, [])

  return (
    <Menu
      style={{ height: '100%', }}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      mode="inline"
      theme="dark"
      inlineCollapsed={isNavCollapsed && !isMobile}
      onClick={handleOnNavClick}
      onOpenChange={handleOnOpenChange}
    >
      <Item
        key="dashboard"
        icon={
          <i className="aidmics-home" />
        }
      >
        { t('dashboard') }
      </Item>
      { items }
    </Menu>
  )
}

export default Menus
