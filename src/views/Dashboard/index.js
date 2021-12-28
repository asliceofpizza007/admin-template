import styled from 'styled-components'
import {
  MainContent,
} from '@styled/styledComponents'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Dashboard = () => {
  const arr = Array(1000).fill('text')
  return (
    <MainContent>
      <Content>
        {
          arr.map((el,i) => {
            return (
              <p key={i}>
                {`${el} - ${i}\n`}
                Dashboard scrollbar UI/UX demo
              </p>
            )
          })
        }
      </Content>
    </MainContent>
  )
}

export default Dashboard
