import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { RouterConfig } from "@config/router";

import "@assets/fonts/font.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function App() {
  const queryClient = new QueryClient();
  return (
    <div className="container font-iranSans">
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterConfig />
      </QueryClientProvider>
    </div>
  );
}

export default App;
