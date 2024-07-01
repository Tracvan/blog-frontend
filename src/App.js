import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from './components/post/Post';
import Master from './pages/Master/Master';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Master />}>
            <Route path={"/posts"} element={<Post />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
