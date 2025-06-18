import { publicRequest } from "../requestMethods";

export const addToDbWishlist = async (product, count) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const data = {
    userId: user._id,
    products: [
      {
        productId: product._id,
        category: product.category[0],
        quantity: count,
      },
    ],
  };

  await publicRequest
    .post("/wishlists", data, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log(res.data);
      alert("Added to wishlist!");
    })
    .catch((err) => {
      console.log(err);
    });
};
