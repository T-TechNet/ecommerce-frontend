import { publicRequest } from "../requestMethods";

export const getTestimonial = async () => {
  let data = [];

  await publicRequest
    .get("/testimonials")
    .then((res) => {
      let array = res.data;
      array.map((item) => {
        data.push(item);
      });
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};
