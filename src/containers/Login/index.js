import { useCallback } from 'react'
import {
  Form,
  Input,
  Button,
  Dropdown,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAxios } from '@hooks'
import { getFormData } from '@utils'
import { LanguageSwitch } from '@components'
import { FontIcon } from '@styled/styledComponents'
import logo from '@images/logo.png'

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
  width: 620px;
  padding: 3rem 1.5rem;
  background-color: #fff;
  border-radius: 4px;
  @media (max-width: ${props => props.theme.break_points.tablet}) {
    width: 80vw;
  }
`

const ImageBlock = styled.div`
  padding-bottom: 3rem;
  > img {
    filter: drop-shadow(2px 4px 3px ${props => props.theme.color.primary});
  }
`

const Translate = styled(FontIcon)`
  display: inline-block;
  margin-left: 20px;
  transform: translateY(5px);
  cursor: pointer;
`

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation('common')
  const { language } = i18n
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
        species: 'WW',
        device_id: 'browser',
        locale: language,
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
          span: language === 'en' ? 5 : 3,
        }}
        onFinish={onFinish}
      >
        <ImageBlock>
          <img src={logo} alt="logo" />
        </ImageBlock>
        <Item
          label={t('account')}
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
          label={t('password')}
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
            offset: language === 'en' ? 5 : 3,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            { t('login') }
          </Button>
          <Dropdown
            overlay={<LanguageSwitch />}
          >
            <Translate
              className="aidmics-translate"
              size={24}
              color={'#999'}
            />
          </Dropdown>
        </Item>
      </LoginForm>
    </LoginContainer>
  )
}

export default Login
