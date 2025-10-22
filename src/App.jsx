import Home from "@/pages/Home/Home";
import ProductPage from "./pages/Home/components/product";
import Upload from "@/pages/Upload/Upload";
import ErrorPage from "@pages/404";
import ScrollToTopButton from "@/pages/Home/components/ScrollToTopButton";
import { Route, Routes } from "react-router"; 
import Login from "@/pages/Login/login";
import SignUp from "@/pages/Login/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ScrollToTopButton />
    </>
  );
}

export default App;
