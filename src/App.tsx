import 'carbon-components/css/carbon-components.min.css';
import { AuthProvider } from './contexts/AuthContext';
import { Main } from './components'
import { GlobalStyle } from './globalStyles';

export function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Main />
      </AuthProvider>
    </>
  );
}