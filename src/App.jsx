import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthGuard, {LoggedIn} from "./middlewares/AuthGuard";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import NavBarCmp from "./components/header/NavBarCmp";
import Profile from "./pages/profile";
import ProfileId from "./pages/profile/id";
import BookDetails from "./pages/Books/bookDetails";
import Register from "./pages/auth/register";
import { Toaster } from "react-hot-toast";
import Cart from "./pages/Cart";
import NotFound from "./pages/notFound";


function App() {
  
  return (
    <>
        <BrowserRouter>
        <Toaster />
        <NavBarCmp />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<LoggedIn><Login /></LoggedIn>}/>
            <Route path="/register" element={<LoggedIn><Register /></LoggedIn>}/>
            <Route path="/books/:id" element={<AuthGuard><BookDetails /></AuthGuard>}/>
            <Route path="/cart" element={<AuthGuard><Cart /></AuthGuard>}/>
            <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>}/>
            <Route path="/profile/:id" element={<AuthGuard><ProfileId /></AuthGuard>}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
          <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-10">
            <div>
              <p>Copyright © { new Date().getFullYear() } - All right reserved by 
                <a className="text-primary font-medium mx-1" href="https://fb.com/MohamedAbdelrahmanDeveloper">Mohamed</a>
              </p>
            </div>
          </footer>
        </BrowserRouter>
    </>
  );
}

export default App;
