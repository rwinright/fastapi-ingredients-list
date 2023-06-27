import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import './App.scss';
import NavBar from "./views/shared_components/nav/NavBar";
import Home from "./views/home/Home";
import { useState } from "react";
import Food from "./views/food/Food";
import Todos from "./views/todos/Todos";


function App() {
  const [page, setPage] = useState("");
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food" element={<Food />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
