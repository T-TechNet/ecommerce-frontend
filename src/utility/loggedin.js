import { publicRequest } from "../requestMethods";

export const getUserOrder = async () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  if (user) {
    await publicRequest
      .get(`/orders/find?userId=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data[0]) {
          // console.log(res.data[0]);
          localStorage.setItem("order", JSON.stringify(res.data[0]));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const saveWishList = async () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const wishlist = JSON.parse(localStorage.getItem("wishlist"));

  if (wishlist) {
    const tempProducts = wishlist.map((item) => ({
      productId: item._id,
      category: item.category[0],
      quantity: 1,
    }));

    let data = {};
    data.userId = loggedInUser._id;
    data.products = tempProducts;

    await publicRequest
      .post(`/wishlists?type=loggedin`, data, {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // localStorage.setItem("wishlist", JSON.stringify(res.data));
        // console.log(res.data);
        // alert("Added to wishlist!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const saveCart = async () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (cart) {
    const tempProducts = cart.map((item) => ({
      productId: item._id,
      category: item.category[0],
      quantity: item.quantity,
    }));

    let data = {};
    data.userId = loggedInUser._id;
    data.products = tempProducts;

    await publicRequest
      .post(`/carts?type=loggedin`, data, {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // localStorage.setItem("cart", JSON.stringify(res.data));

        // console.log(res.data);
        // alert("Added to wishlist!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
