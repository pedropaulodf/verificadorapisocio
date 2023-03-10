import { DadosApiContextProvider } from "./contexts/useDadosApiContext";
import Home from "./pages/Home";
function App() {
  return (
    <DadosApiContextProvider>
      <Home />
    </DadosApiContextProvider>
  );
}

export default App;
