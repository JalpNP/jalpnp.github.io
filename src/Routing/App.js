import { Route, Routes, useLocation } from "react-router-dom";  
import Header from "../Common/Header/Header";
import MyContextProvider from "../Common/Context/MyContextProvider";
import Wishlist from "../Common/Header/Wishlist/Wishlist";
import Cart from "../Common/Header/Cart/Cart";
import Register from "../Common/Header/Forms/Register";
import ContactForm from "../Common/Header/Forms/ContactForm";
import Footer from "../Common/Footer/Footer";
import Tearm from "../Common/Footer/Tearm/Tearm";
import UseLocation from "../Common/GoToTop/UseLocation-up";
import Loader from "../Common/Loader/Loader";
import Alert from "../Common/Alert/Alert";
import Logout from "../Common/Header/LogoutModal/LogoutModal";
import Home from "../Components/Home/Home";
import Categories from "../Components/Categories/Categories";
import Accountdetails from "../Components/Accountdetails/Accountdetails";
import AcDetailsEdit from "../Components/Accountdetails/AcDetailsEdit";
import Products from "../Components/Products/Products";
import SingleProduct from "../Components/SingleProduct/SingleProduct";
import ShippingDetails from "../Components/ShippingDetails/ShippingDetails";
import Confirmationpage from "../Components/ShippingDetails/Confirmationpage/Confirmationpage";
import Order from "../Common/Header/Order/Order";
import Trackorder from "../Common/Header/Order/Trackorder";
import NoPage from "../Components/NoPage/NoPage";
import Admin from "../Components/Admin/Admin";
import Locations from "../Components/Locations/Locations";
import Shipping from "../Common/Header/Profile/Shipping.jsx/Shipping";
import Chatbot from "../Components/SingleProduct/FAQ/Chatbot";
import OTPForm from "../Common/Header/OtpLogin/Otp";
import InstantantChatBtn from "../Components/Home/InstantantChatBtn";
import LoginEmail from "../Common/Header/Login/LoginEmail";
import Ai from "../Common/Ai/Ai";
// import Profile from "../Common/Header/Profile/Profile";

function App() {
  const location = useLocation();  

  return (
    <MyContextProvider> 
      <UseLocation />
      <Loader />
      <Alert />
      <Header />
     
      <Logout />
     

      <Routes>
        <Route path="/admin-page" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contactus" element={<ContactForm />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/terms-and-condition" element={<Tearm />} />
        <Route path="/" element={<Home />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/account-details" element={<Accountdetails />} />
        <Route path="/shipping-address" element={<Shipping />} />
        <Route path="/Edit" element={<AcDetailsEdit />} />
        <Route path="/category/:title" element={<Products />} />
        <Route path="/products-by-image" element={<Ai />} />
        <Route path="/category/:title/:name" element={<SingleProduct />} />
        <Route path="/shipping-details" element={<ShippingDetails />} />
        <Route path="/confirm" element={<Confirmationpage />} />
        <Route path="/order" element={<Order />} />
        <Route path="/track-order" element={<Trackorder />} />
        <Route path="/city/:cityname" element={<Locations />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/login" element={<OTPForm />} />
        <Route path="/user-login" element={<LoginEmail />} />
        <Route path="*" element={<NoPage />} />
      </Routes>


      {location.pathname !== "/admin-page" && <Footer />}
      {location.pathname !== "/chat" && <InstantantChatBtn/>}
    </MyContextProvider>
  );
}

export default App;
