import './App.css';
import Router from './Router';
import { NavbarSection } from './components/AppShell/AppShell';

function App() {
  return (
    <>
      <NavbarSection>
        <Router />
      </NavbarSection>
    </>
  );
}

export default App;

