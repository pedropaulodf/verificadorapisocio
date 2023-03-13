import { QueryClient, QueryClientProvider } from "react-query";
import { DadosApiContextProvider } from "./contexts/useDadosApiContext";
import Home from "./pages/Home";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <DadosApiContextProvider>
        <Home />
      </DadosApiContextProvider>
    </QueryClientProvider>
  );
}

export default App;
