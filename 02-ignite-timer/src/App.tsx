import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from 'styles/global';
import { defaultTheme } from 'styles/theme';
import { RouteProvider } from 'components';
import { CyclesProvider } from 'hooks/useCycles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesProvider>
        <BrowserRouter>
          <RouteProvider />
        </BrowserRouter>
      </CyclesProvider>

      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
