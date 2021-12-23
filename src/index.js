import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AliveScope } from 'react-activation'
import { ThemeProvider } from 'styled-components';
import store from '@redux/store'
import { App } from '@containers';

// i18n
import '@/i18n'

// global theme
import '@scss/reset.scss'
import '@scss/global.scss'

// styled theme
import theme from '@styled/theme'

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AliveScope>
          <App />
        </AliveScope>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
