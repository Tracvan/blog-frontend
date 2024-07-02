import './App.css';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import Post from './components/post/Post';
import Master from './pages/Master/Master';
import LoginForm from "./components/LoginForm/LoginForm";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path={"/"} element={<Master />}>
                <Route path={"/posts"} element={<Post />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
