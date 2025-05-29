import { BrowserRouter, Routes, Route, Navigate  } from "react-router";
import PostsList  from "./components/PostsList";
import TodosList from "./components/TodosList";
import PostDetails from "./components/PostDetails";
import TodoDetails from "./components/TodoDetails";
import "./App.css"

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate to="/posts" />} />
              <Route path="posts" element={<PostsList />} />
              <Route path="todos" element={<TodosList />} />
              <Route path="posts/:id" element={<PostDetails />} />
              <Route path="todos/:id" element={<TodoDetails />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
