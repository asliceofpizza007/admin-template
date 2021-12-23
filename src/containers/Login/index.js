import { useCallback } from 'react'
import {
  Form,
  Input,
  Button,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAxios } from '@hooks'
import { getFormData } from '@utils'

const { Item }  = Form
const { Password } = Input

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.color.primary};
`

const LoginForm = styled(Form)`
  width: 500px;
  height: 240px;
  padding: 2rem 1rem;
  background-color: #fff;
`

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const {
    request: login,
    isLoading,
  } = useAxios('/login', {
    method: 'POST',
    "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8',
  }, (res) => {
    localStorage.setItem('token', res.token)
    const preRoute = location.state?.from?.pathname || '/auth'
    navigate(preRoute)
  })
  const onFinish = useCallback(async (values) => {
    try {
      const data = getFormData({
        ...values,
        species: 'SW',
        device_id: 'browser',
        locale: i18n.language,
      })
      await login({ data })
    } catch(error) {
      console.error(error)
    }
  }, [])

  return (
    <LoginContainer>
      <LoginForm
        name="login"
        labelCol={{
          span: 5,
        }}
        onFinish={onFinish}
      >
        <Item
          label="Account"
          name="account"
          rules={[
            {
              required: true,
              message: 'Please input your account.',
            },
            {
              type: 'email',
              message: 'Account is not a valid email',
            }
          ]}
        >
          <Input placeholder="account@email.com" />
        </Item>
        <Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password.',
            }
          ]}
        >
          <Password />
        </Item>
        <Item
          wrapperCol={{
            offset: 5,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Submit
          </Button>
        </Item>
      </LoginForm>
    </LoginContainer>
  )
}

export default Login
