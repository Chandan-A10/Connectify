import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./router/mainRoutes";


const App = () => {
  return (
    <Routes>
      {PublicRoutes.map((route) => <Route path={route.path} element={route.element} />)}
    </Routes>
  )
}

export default App;
