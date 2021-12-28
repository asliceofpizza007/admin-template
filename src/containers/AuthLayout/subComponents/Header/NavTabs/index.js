import { useMemo } from "react";
import styled from "styled-components";
import { useAliveController } from "react-activation";
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import {
  useLocation,
  matchRoutes,
} from "react-router-dom";
import { Scrollbar } from "@components";
import Tab from './Tab'

const TabsContainer = styled.div`
  margin: 0px 1rem;
  height: 50px;
`
const TabsContent = styled.div`
  display: block;
  padding-top: 5px;
  white-space: nowrap;
`

const NavTabs = (props) => {
  const { getCachingNodes } = useAliveController()
  const allNodes = getCachingNodes()
  const tabs = allNodes.filter(node => node.name !== 'Dashboard')

  const location = useLocation()
  const activeAnchor = useMemo(() => {
    const nodes = [
      {
        name: 'dashboard',
        path: '',
      },
      ...allNodes,
    ]
    return nodes.find(node => {
      const { path } = node
      const match = matchRoutes([{
        path: `/auth${path}`
      }], location)
      return match
    })
  }, [allNodes, location])

  return (
    <TabsContainer>
      <Scrollbar
        anchor={activeAnchor?.name}
        autoScroll
      >
        <TabsContent>
          <Tab
            id="dashboard"
            name="dashboard"
            i18n_key="dashboard"
          />
          <TransitionGroup component={null}>
            {
              tabs.map((tab) => {
                const { name } = tab
                return (
                  <CSSTransition
                    mode="out-in"
                    classNames="tab"
                    timeout={300}
                    key={name}
                  >
                    <Tab
                      { ...tab }
                    />
                  </CSSTransition>
                )
              })
            }
          </TransitionGroup>
        </TabsContent>
      </Scrollbar>
    </TabsContainer>
  )
}

export default NavTabs
