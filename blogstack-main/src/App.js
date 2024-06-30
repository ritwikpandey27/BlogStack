import './App.css';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import SignIn from './Pages/SignIn';
import PrivateRoute from './Components/PrivateRoute'
import PublishBlog from './Pages/PublishBlog';
import EditBlog from './Pages/EditBlog';
import BlogPage from './Pages/BlogPage';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';


import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

// const location = useLocation();

  return (
  <>
  
  <Router>
    <Navbar/>
  
    <Routes>
    <Route path="/"  element={<Home/>}/>

    <Route path="/profile" element={<PrivateRoute/>}>
    <Route path="/profile"  element={<Profile/>}/>
    </Route>

    <Route path="/publish-blogs" element={<PrivateRoute/>}>
    <Route path="/publish-blogs"  element={<PublishBlog/>}/>
    </Route>

    <Route path="/edit-blog" element={<PrivateRoute/>}>
    <Route path="/edit-blog/:blogId"  element={<EditBlog/>}/>
    </Route>


    <Route path="/sign-in"  element={<SignIn/>}/>

    <Route path="/:category/:blogTitle/:blogId" element={<BlogPage/>}/>
  </Routes>
  </Router>
  
  <ToastContainer
position="top-center"
hideProgressBar
autoClose={2500}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
theme="dark"
/>
  </>
  );
}

export default App;
