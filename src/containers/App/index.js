import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { getLazyComponent } from '@utils'

const App = () => {
  return (
    <ConfigProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to="/auth" />
          }
        />
        <Route
          path="/auth/*"
          element={getLazyComponent('AuthLayout')}
        />
        <Route
          path="/login"
          element={getLazyComponent('Login')}
        />
        <Route
          path="*"
          element={
            <div>
              error
            </div>
          }
        />
      </Routes>
    </ConfigProvider>
  )
}

export default App
