import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./assets/css/index.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import ChangePassword from "./pages/ChangePassword";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import CatalogPage from "./pages/CatalogPage";
import LooksPage from "./pages/LooksPage";
import ErrorPage from "./pages/ErrorPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import ShippingAndReturn from "./pages/ShippingAndReturn";
import TermsAndCondition from "./pages/TermsAndCondition";
import PaymentOptions from "./pages/PaymentOptions";
import RewardPoints from "./pages/RewardPoints";
import AboutUs from "./pages/AboutUs";
import ForgetPassword from "./components/auth/ForgetPassword";
import tssurl from "./port";
import Transaction from "./pages/TransactionsHistory";
import Contact from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import OrderSummary from "./pages/OrderSummary";
import CheckoutPage from "./pages/CheckoutPage";

const fetchData = async () => {
  try {
    const lastApiCallDate = localStorage.getItem("lastApiCallDate");
    const today = new Date().toISOString().slice(0, 10);
    if (lastApiCallDate !== today) {
      const response = await axios.post(`${tssurl}/visitors/createVisitors`);
      console.log("API response:", response.data);
      localStorage.setItem("lastApiCallDate", today);
    } else {
      console.log("API already called today.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const App = () => {
  const [locationData, setLocationData] = useState([]);
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationData(position.coords);
          },
          (error) => console.error(error)
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/products/:subCategory' element={<SubCategoryPage />} />
        <Route path='/productDetails/:pid' element={<ProductDetailsPage />} />
        <Route
          path='/profile'
          element={<ProfilePage position={locationData} />}
        />
        <Route path='/changePassword' element={<ChangePassword />} />
        <Route path='/wishlist' element={<WishlistPage />} />
        <Route path='/cart/carts' element={<CartPage />} />
        <Route path='/catalog/:catalogid' element={<CatalogPage />} />
        <Route path='/catalog/looks/:catalogId' element={<LooksPage />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/aboutUs' element={<AboutUs />}/>
        <Route path='/resetpassword' element={<ForgetPassword />}/>
        <Route path='/terms-and-conditions' element={<TermsAndCondition />} />
        <Route path='/shipping-and-returns' element={<ShippingAndReturn />} />
        <Route path='/PaymentOptions' element={<PaymentOptions />}/>
        <Route path='/RewardPoints' element={<RewardPoints />}/>
        <Route path='/ContactUs' element={<Contact />}/>
        <Route path='/Order-History' element={<Transaction />}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy />}/>
        <Route path='/orderDetailPage/:oid' element={<OrderSummary />}/>
        <Route
          path='/checkout'
          element={<CheckoutPage position={locationData} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
