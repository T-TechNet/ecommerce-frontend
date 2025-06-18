import Announcement from "../components/Announcement";
import styled from "styled-components";
import Header from "../components/Header";
import Navbar from "../components/Navigation/Navbar";
import HomeDisplay from "../components/HomeDisplay/HomeDisplay";
import ProductDetail from "../components/Products/ProductDetail";
import Footer from "../components/Footer";
import ErrorPage from "./ErrorPage";
import Category from "../components/Categories/Category";
import Register from "../components/UserSection/Register";
import Login from "../components/UserSection/Login";
import WishList from "../components/WishList";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout/Checkout";
import Confirmation from "../components/UserSection/Confirmation";
import Popup from "../components/Products/Popup";
import Payment from "../components/Checkout/Payment";
import PasswordReset from "../components/UserSection/PasswordReset";
import ForgetPassword from "../components/UserSection/ForgetPassword";
import UserProfile from "../components/UserSection/UserProfile";
import { TimeoutLogic } from "../TimeoutLogic";
import ScrollToTop from "../components/ScrollToTop";
import OrderConfirm from "../components/Checkout/OrderConfirm";
import FinalOrder from "../components/Checkout/FinalOrder";
import TermsAndConditions from "../components/TermsAndConditions";
import {
  Routes,
  Route,
  // Redirect,
} from "react-router-dom";
import BeforeCheckout from "./BeforeCheckout";
import CompanyProfile from "./CompanyProfile";
import Address from "../components/UserSection/Address";
import Order from "../components/UserSection/Order";
//for pending and complete view detail in order detail
import ViewOrderDetail from "../components/UserSection/OrderDataDetail/ViewOrderDetail";
//for desktop cancel view detail in order detail
import CancelDetail from "../components/CancelDetail";
//for mobile pending and complete view detail in order details
import ViewDetailMobile from "../components/UserSection/OrderDataDetail/ViewDetailMobile";
//for testimonial review
import Testimonial from "../pages/Testimonial";
// oAuth
import Profile from "../components/oAuth/Profile";

//for product-review route when click see all reviews button in ProductDetail component
import ProductReviewDetail from "../components/Products/ProductReviewDetail";

const Body = styled.div`
  // background: pink;
  // @media only screen and (max-width: 759px) {
  //   width: 100%;
  //   overflow: hidden;

  // }
  z-index: -100;
`;

const DesktopComponent = ({
  nav,
  login,
  profile,
  cartItems,
  setCartItems,
  wishList,
  setWishList,
  user,
  setUser,
  searchInput,
  handleAddProduct,
  handleRemoveProduct,
  deleteCartItem,
  handleWishList,
  deleteWishList,
  productTotal,
  setSearchInput,
  // setPageTitle,
  // setPageDescription,
  // setPageImage
}) => {
  return (
    <div style={{ fontFamily: "Open Sans" }}>
      <Body>
        <ScrollToTop />
        <Announcement />
        {user && <TimeoutLogic setUser={setUser} />}

        {/* {path !== "/checkout/contact" ? (
      <Header
        click={login}
        user={user}
        setUser={setUser}
        cartItems={cartItems}
        wishList={wishList}
        setSearchInput={setSearchInput}
      />
    ) : null} */}
        {/* {path !== "/checkout/contact" ? <Navbar click={nav} /> : null} */}
        <Header
          click={login}
          profile={profile}
          user={user}
          setUser={setUser}
          cartItems={cartItems}
          wishList={wishList}
          setSearchInput={setSearchInput}
        />

        <Navbar click={nav} />

        <Popup setUser={setUser} handleAddProduct={handleAddProduct} />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <HomeDisplay
                wishList={wishList}
                handleAddProduct={handleAddProduct}
                handleWishList={handleWishList}
              />
            }
          />

          <Route
            exact
            path="list/:category"
            element={
              <Category wishList={wishList} handleWishList={handleWishList} />
            }
          />
          <Route
            exact
            path="list/:category/:type"
            element={
              <Category wishList={wishList} handleWishList={handleWishList} />
            }
          />
          <Route
            exact
            path="list/:category/:type/:brand"
            element={
              <Category wishList={wishList} handleWishList={handleWishList} />
            }
          />

          <Route
            exact
            path={"/searchResult/:input"}
            element={
              <Category wishList={wishList} handleWishList={handleWishList} />
            }
          />

          <Route
            exact
            path="/:category/product/:id"
            element={
              <ProductDetail
                click={login}
                user={user}
                setUser={setUser}
                wishList={wishList}
                handleAddProduct={handleAddProduct}
                handleWishList={handleWishList}
                deleteWishList={deleteWishList}
                // setPageTitle={setPageTitle}
                // setPageDescription={setPageDescription}
                // setPageImage={setPageImage}
              />
            }
          />
          <Route exact path={"/testimonials"} element={<Testimonial />} />
          <Route
            exact
            path={"/product-review"}
            element={<ProductReviewDetail />}
          />
          <Route exact path="/*" element={<ErrorPage />} />
          <Route exact path="/:username/profile" element={<UserProfile />} />
          <Route exact path="/:username/addresses" element={<Address />} />
          <Route exact path="/:username/orders" element={<Order />} />
          <Route exact path="/login" element={<Login setUser={setUser} />} />
          <Route exact path="/register" element={<Register click={login} />} />
          <Route exact path="/forgot-password" element={<ForgetPassword />} />
          <Route
            exact
            path="/reset-password/:id/:token"
            element={<PasswordReset click={login} />}
          />
          <Route
            exact
            path="/verifyUserEmail/:username/:token"
            element={<Confirmation />}
          />
          {/* <Route
            exact
            path="/user-confirmation/:username/:token"
            element={<Confirmation />}
          /> */}

          <Route
            exact
            path="/wishlist"
            element={
              <WishList
                user={user}
                setUser={setUser}
                cartItems={cartItems}
                wishList={wishList}
                setWishList={setWishList}
                handleAddProduct={handleAddProduct}
                deleteWishList={deleteWishList}
              />
            }
          />

          <Route
            exact
            path="/cart"
            element={
              <Cart
                click={login}
                cartItems={cartItems}
                setCartItems={setCartItems}
                handleAddProduct={handleAddProduct}
                handleRemoveProduct={handleRemoveProduct}
                deleteCartItem={deleteCartItem}
                productTotal={productTotal}
                wishList={wishList}
                handleWishList={handleWishList}
              />
            }
          />

          <Route
            exact
            path="/checkout/contact"
            element={
              <Checkout
                user={user}
                setUser={setUser}
                cartItems={cartItems}
                setCartItems={setCartItems}
                total={productTotal}
              />
            }
          />

          <Route
            exact
            path="/checkout-as"
            element={
              <BeforeCheckout
                user={user}
                setUser={setUser}
                // cartItems={cartItems}
                // setCartItems={setCartItems}
                // total={productTotal}
              />
            }
          />

          <Route
            exact
            path="/checkout/payment"
            element={
              <Payment
                user={user}
                cartItems={cartItems}
                setCartItems={setCartItems}
                total={productTotal}
              />
            }
          />

          <Route
            exact
            path="/checkout/order-confirmed"
            element={
              <FinalOrder
                user={user}
                setCartItems={setCartItems}
                cartItems={cartItems}
                total={productTotal}
              />
            }
          />

          <Route
            exact
            path="/checkout/order-confirmation"
            element={
              <OrderConfirm
                user={user}
                setCartItems={setCartItems}
                cartItems={cartItems}
                total={productTotal}
              />
            }
          />

          <Route
            exact
            path="terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route exact path="about-us" element={<CompanyProfile />} />

          <Route
            exact
            path="/myorders/:ordNum"
            element={
              <ViewOrderDetail
                click={login}
                cartItems={cartItems}
                setCartItems={setCartItems}
                handleAddProduct={handleAddProduct}
                handleRemoveProduct={handleRemoveProduct}
                deleteCartItem={deleteCartItem}
                productTotal={productTotal}
                wishList={wishList}
                handleWishList={handleWishList}
              />
            }
          />
          <Route
            exact
            path="/myorders/mobile/ordNum"
            element={
              <ViewDetailMobile
                click={login}
                cartItems={cartItems}
                setCartItems={setCartItems}
                handleAddProduct={handleAddProduct}
                handleRemoveProduct={handleRemoveProduct}
                deleteCartItem={deleteCartItem}
                productTotal={productTotal}
                wishList={wishList}
                handleWishList={handleWishList}
              />
            }
          />
          <Route
            exact
            path="/myorders/ordNum/cancel"
            element={
              <CancelDetail
                click={login}
                cartItems={cartItems}
                setCartItems={setCartItems}
                handleAddProduct={handleAddProduct}
                handleRemoveProduct={handleRemoveProduct}
                deleteCartItem={deleteCartItem}
                productTotal={productTotal}
                wishList={wishList}
                handleWishList={handleWishList}
              />
            }
          />

          {/* oAuth  start
          <Route exact path="/sign-up" Component={LogoutButton} />
         <Route exact path="/sign-in" Component={SideLogin}/>
        
            oAuth end */}
          {/* oAuth  start */}
          <Route exact path="/profile" Component={Profile} />
          {/* oAuth end */}
        </Routes>
        <Footer click={login} />
      </Body>
    </div>
  );
};
export default DesktopComponent;
