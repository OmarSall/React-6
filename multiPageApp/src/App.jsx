import { BrowserRouter, Routes, Route, Navigate  } from "react-router";
import PostsList  from "./components/PostsList";
import TodosList from "./components/TodosList";
import "./App.css"

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate to="/posts" />} />
              <Route path="posts" element={<PostsList />} />
              <Route path="todos" element={<TodosList />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
