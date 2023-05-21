import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from 'styles/global';
import { defaultTheme } from 'styles/theme';
import { RouteProvider } from 'components';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <RouteProvider />
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
