import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Lifecycle from "./pages/Lifecycle";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/lifecycle"
          element={<Lifecycle />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;