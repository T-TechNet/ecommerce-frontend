/**
 * Cart Items, Wishlist, USER LOGGED IN STATUS and SearchInput data are managed with useState().
 *
 * Home accept and pass props from App.js and diverse into two, Mobile component and Desktop component for UI demonstration.
 *
 * @module UI
 */

import React, { useState, useEffect } from "react";
import MobileComponent from "./MobileComponent";
import DesktopComponent from "./DesktopComponent";

const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
const localWishList = JSON.parse(localStorage.getItem("wishlist") || "[]");

const Home = ({ nav, login, profile }) => {
  let [cartItems, setCartItems] = useState(localCart);
  const [wishList, setWishList] = useState(localWishList);
  const [user, setUser] = useState("");
  const [searchInput, setSearchInput] = useState("");
  // const [deviceType, setDeviceType] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Function to check if the window size qualifies as "mobile"
  const checkIsMobile = () => {
    const isMobileSize = window.innerWidth <= 768;
    setIsMobile(isMobileSize);
  };

  // useEffect hook to add and clean up the resize event listener
  useEffect(() => {
    checkIsMobile(); // Call the function on initial render

    // Event listener callback function to handle resize
    const handleResize = () => {
      checkIsMobile(); // Call the function when the window is resized
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const productTotal = cartItems?.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );

  // ADD TO CART
  const handleAddProduct = (product, count) => {
    const ProductExist = cartItems.find((item) => item._id === product._id);

    if (ProductExist) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? {
                ...ProductExist,
                quantity: count
                  ? ProductExist.quantity + count
                  : ProductExist.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: count }]);
    }
  };

  // DECREASE QTY FROM CART
  const handleRemoveProduct = (product) => {
    const ProductExist = cartItems.find((item) => item._id === product._id);

    if (ProductExist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...ProductExist, quantity: ProductExist.quantity - 1 }
            : item
        )
      );
    }
  };

  // REMOVE PRODUCT FROM CART
  const deleteCartItem = (product) => {
    const ProductExist = cartItems.find((item) => item._id === product._id);

    if (ProductExist) {
      setCartItems(cartItems.filter((item) => item._id !== product._id));
    }
  };

  // ADD TO WISHLIST
  const handleWishList = (product, count) => {
    const ProductExist = wishList.find((item) => item._id === product._id);

    if (ProductExist) {
      setWishList(wishList.filter((item) => item._id !== product._id));
    } else {
      setWishList([...wishList, { ...product, quantity: 1, count }]);
    }
  };

  // REMOVE FROM WISHLIST
  const deleteWishList = (product) => {
    const ProductExist = wishList.find((item) => item._id === product._id);

    if (ProductExist) {
      setWishList(wishList.filter((item) => item._id !== product._id));
    }
  };

  useEffect(() => {
    // CHECK USER LOGGED IN STATUS
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
      // getUserOrder();
      // saveWishList(); //save wishlist in database
      // saveCart(); //save cart in database
    } else {
      sessionStorage.setItem("guest", "true");
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [cartItems, wishList]);

  return (
    <div>
      {isMobile ? (
        <MobileComponent
          nav={nav}
          login={login}
          profile={profile}
          cartItems={cartItems}
          setCartItems={setCartItems}
          wishList={wishList}
          setWishList={setWishList}
          user={user}
          setUser={setUser}
          searchInput={searchInput}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
          deleteCartItem={deleteCartItem}
          handleWishList={handleWishList}
          deleteWishList={deleteWishList}
          productTotal={productTotal}
          setSearchInput={setSearchInput}
          // setPageTitle={setPageTitle}
          // setPageDescription={setPageDescription}
          // setPageImage={setPageImage}
        />
      ) : (
        <DesktopComponent
          nav={nav}
          login={login}
          profile={profile}
          cartItems={cartItems}
          setCartItems={setCartItems}
          wishList={wishList}
          setWishList={setWishList}
          user={user}
          setUser={setUser}
          searchInput={searchInput}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
          deleteCartItem={deleteCartItem}
          handleWishList={handleWishList}
          deleteWishList={deleteWishList}
          productTotal={productTotal}
          setSearchInput={setSearchInput}
          // setPageTitle={setPageTitle}
          // setPageDescription={setPageDescription}
          // setPageImage={setPageImage}
        />
      )}
    </div>
  );
};

export default Home;
