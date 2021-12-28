import styled from 'styled-components'

const MainContent = styled.section`
  padding: 1.2rem 1rem;
`

const FontIcon = styled.i`
  color: ${props => {
    const {
      theme,
      color,
    } = props
    return color || theme.color.light_gray
  }};
  font-size: ${props => {
    const {
      size,
    } = props
    return size ? `${size}px` : 'inherit'
  }};

  & + * {
    margin-left: 5px;
  }
`

export {
  MainContent,
  FontIcon,
}
