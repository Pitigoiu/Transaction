import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/home/Home";
import Login from './pages/login/Login';
import Signup from "./pages/signup/SignUp";
import PrivateRoute from "./utils/PrivateRoutes1";

function App() {
 const {authIsReady}=useAuthContext()

  return (
  <div className="App">
    {authIsReady&&(
      <BrowserRouter>
       <Navbar/>
        <Routes>
        <Route element={<PrivateRoute value={true}/>} >
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Route>
        <Route element={<PrivateRoute value={false}/>}>
        <Route exact path="/" element={<Home/>}/>
        </Route>
        <Route path="/*" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    )}
    </div>
  );
}

export default App;
