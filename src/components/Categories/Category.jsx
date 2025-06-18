import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../../requestMethods";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ProductList from "./ProductList";
import Sorting from "./Sorting";
import SortingMobile from "./SortingMobile";
import Filterbar from "./Filterbar";
import FilterBottomSheet from "./FilterBottomSheet";
import Overlay from "./Overlay";
import limitedbanner from "../../assets/Category/LimitedBannerDesktop.png";
import hotdealsbanner from "../../assets/Category/HotDealsBannerDesktop.png";
// import salesBanner from "../../assets/Category/SalesBannerDesktop.jpg";
// import salesBannerMobile from "../../assets/Category/SalesBannerMobile.jpg";
import salesBanner from "../../assets/Category/BannerDesktop.jpg";
import salesBannerMobile from "../../assets/Category/BannerMobile.jpg";
import mobilehotdealsbanner from "../../assets/Category/HotDealsBannerMobile.png";
import "../../css/category.css";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 1203px) {
    width: 100%;
  }

  @media screen and (max-width: 769px) {
    padding: 20px 0;
  }
`;
const Wrapper = styled.div`
  margin: 30px;
  width: 1150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1203px) {
    width: 95%;
  }

  @media only screen and (max-width: 769px) {
    width: 90%;
    margin: 0;
    padding: 0 10px;
  }
`;

const ResultContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Results = styled.div`
  width: ${(props) => (props.className === "half" ? "80%" : "100%")};

  @media screen and (max-width: 900px) {
    width: ${(props) => (props.className === "half" ? "75%" : "100%")};
  }

  @media screen and (max-width: 769px) {
    width: 100%;
  }
`;

const BannerImg = styled.img`
  width: 100%;
  margin-bottom: 20px;

  @media only screen and (max-width: 650px) {
    display: none;
  }
`;

const BannerImgMobile = styled.img`
  display: none;

  @media only screen and (max-width: 650px) {
    display: flex;
    width: 100%;
    /* height: 200px; */
  }
`;

const Div = styled.div`
  width: 100%;
  padding: 5px 25px 15px 25px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media only screen and (max-width: 769px) {
    padding: 0 20px;
  }
`;

const Desc = styled.div`
  font-weight: 400;
  font-size: 20px;
  color: #002734;

  @media only screen and (max-width: 769px) {
    padding-bottom: 20px;
  }
`;

const Path = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Pathname = styled.p`
  color: ${(props) => (props.className === "green" ? "#03a89e" : "#758a91")};
  font-weight: ${(props) => (props.className === "green" ? "700" : "400")};
`;
const CategoryName = styled.p`
  color: #03a89e;
  font-weight: 700;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.p`
  padding: 20px 0;
  font-weight: 700;
  font-size: 26px;
  color: #002734;
`;

const Section = styled.div`
  width: ${(props) => (props.className === "half" ? "100%" : "1150px")};
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1203px) {
    width: 100%;
  }

  @media only screen and (max-width: 769px) {
    width: 100%;
    padding: 10px 0;
  }
`;

const FilterSorter = styled.div`
  display: none;

  @media only screen and (max-width: 759px) {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  @media only screen and (max-width: 320px) {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const FilterButton = styled.div`
  width: 60px;
  padding: 5px 16px;

  border: 1px solid #dee3e5;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #00688b;
`;

const Products = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  justify-content: ${(props) =>
    props.className === "circle" ? "center" : "flex-start"};
  gap: 15px;
  padding: 20px 0;

  @media screen and (max-width: 1203px) {
    min-height: 510px;
    max-height: 100%;
  }

  @media screen and (max-width: 1180px) {
    justify-content: center;
  }

  @media only screen and (max-width: 769px) {
    padding: 0;
    gap: 10px;
  }

  @media only screen and (max-width: 366px) {
    padding: 0;
    gap: 0px;
    justify-content: space-evenly;
  }
`;

const ErrorDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.className === "circle" ? "center" : "flex-start"};
  gap: 5px;
  padding: 20px 0;

  @media screen and (max-width: 1203px) {
    min-height: 510px;
    max-height: 100%;
  }

  @media only screen and (max-width: 759px) {
    padding: 0;
    gap: 5px;
    justify-content: center;
  }

  @media only screen and (max-width: 366px) {
    padding: 0;
    gap: 0px;
    justify-content: space-evenly;
  }
`;

const StackDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 769px) {
    width: 100%;
    padding-bottom: 30px;
  }
`;

const arrow = {
  padding: "0 10px",
};

const Category = ({ wishList, handleWishList }) => {
  const [brandRefinementItems, setBrandRefinementItems] = useState([]);
  const [typeRefinementItems, setTypeRefinementItems] = useState([]);

  let { category, type, input } = useParams();
  category = decodeURIComponent(category);

  const searchParams = new URLSearchParams(window.location.search);
  const [page, setPage] = useState(parseInt(searchParams.get("page")));

  const [products, setProducts] = useState(); // fetched products
  const [loading, setLoading] = useState(false);
  let limit = 20; // products limit per page
  const [totalPageCount, setTotalPageCount] = useState();
  const [totalProductsCount, setTotalProductsCount] = useState();

  // if user applies filters or sorters
  const [filters, setFilters] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [sort, setSort] = useState("dateNtoO");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // for filter bottom
  const [isOpen, setIsOpen] = useState(false); // for filter bottom sheet

  const [serverError, setServerError] = useState(false);

  const toggleBottomSheet = () => {
    setIsOpen(!isOpen);
  };

  const handlePageChange = (category, type, e, value) => {
    let url = "";
    if (input) {
      url = `/searchResult/${input}?page=${value}`;
    } else {
      url = `/list/${category}/${type}?page=${value}`;
    }
    window.history.pushState(null, null, url);
    setPage(value);
  };

  const getSearchResults = async () => {
    setLoading(true);
    setServerError(false);
    try {
      const res = await publicRequest.get(
        `/products/algolia-search?searchTerm=${input}&brand=${filteredBrands}&page=${page}&limit=${limit}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      setBrandRefinementItems(res.data.filters);
      if (res.data.data.length > 0) {
        setProducts(res.data.data);
      } else {
        setServerError(true);
      }
      setTotalPageCount(res.data.pagination);
      setTotalProductsCount(res.data.product_count);
      setLoading(false);
    } catch (err) {
      // console.log("Error", err);
      setServerError(true);
      setLoading(false);
    }
  };

  const getCategoryProducts = async () => {
    setLoading(true);
    setServerError(false);
    try {
      const res = await publicRequest.get(
        `/products/view?category=${category}&subCat=${type}&type=${filteredTypes}&brand=${filteredBrands}&page=${page}&limit=${limit}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );

      setBrandRefinementItems(res.data.brandRefinementList);
      setTypeRefinementItems(res.data.typeRefinementList);

      if (res.data.data.length > 0) {
        setProducts(res.data.data);
      } else {
        setServerError(true);
      }
      setTotalPageCount(res.data.pagination);
      setLoading(false);
    } catch (err) {
      // console.log(err);
      setServerError(true);
      setLoading(false);
    }
  };

  const getHotDeals = async () => {
    setLoading(true);
    try {
      const res = await publicRequest.get(
        `/products/hotdeals?page=${page}&limit=20`
      );
      setProducts(res.data.data);
      setTotalPageCount(res.data.pagination);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setServerError(true);
    }
  };

  const getSalesItems = async () => {
    setLoading(true);
    try {
      const res = await publicRequest.get(`/products/sales/get`);
      setProducts(res.data.products);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setServerError(true);
    }
  };

  // const getCouponItems = async () => {
  //   try {
  //     const res = await publicRequest.get(
  //       `/coupon-item?type=${filteredTypes}&brand=${filteredBrands}&page=${page}&limit=${limit}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  //     );
  //     setProducts(res.data.data);
  //     setTotalPageCount(res.data.pagination);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getLaptops = async () => {
  //   try {
  //     if (type === "all") {
  //       const res = await publicRequest.get(
  //         `/laptops/view?type=laptop&brand=${filteredBrands}&page=${page}&limit=${limit}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  //       );
  //       setProducts(res.data.data);
  //       setTotalPageCount(res.data.pagination);
  //     } else {
  //       const res = await publicRequest.get(
  //         `/laptops/view?type=${type}&brand=${filteredBrands}&page=${page}&limit=${limit}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  //       );
  //       setProducts(res.data.data);
  //       setTotalPageCount(res.data.pagination);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getGadgets = async () => {
  //   try {
  //     const res = await publicRequest.get(
  //       `/gadgets/view?type=${filteredTypes}&brand=${filteredBrands}&&page=${page}&limit=${limit}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  //     );
  //     setProducts(res.data.data);
  //     setTotalPageCount(res.data.pagination);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getNetworks = async () => {
  //   try {
  //     const res = await publicRequest.get(
  //       `/network/view?type=${type}&brand=${filteredBrands}&page=${page}&limit=${limit}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  //     );
  //     setProducts(res.data.data);
  //     setTotalPageCount(res.data.pagination);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getPowerSolution = async () => {
  //   try {
  //     const res = await publicRequest.get(
  //       `/powersolution/view?type=${filteredTypes}&brand=${filteredBrands}&page=${page}&limit=${limit}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  //     );
  //     setProducts(res.data.data);
  //     setTotalPageCount(res.data.pagination);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getPhone = async () => {
  //   try {
  //     const res = await publicRequest.get(
  //       `/phone/view?type=${filteredBrands}&page=${page}&limit=${limit}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  //     );
  //     setProducts(res.data.data);
  //     setTotalPageCount(res.data.pagination);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    setProducts("");
    if (input) {
      getSearchResults();
    } else if (category === "hotdeals") {
      getHotDeals();
    } else if (category === "sales") {
      getSalesItems();
    } else {
      window.scrollTo(0, 0);
      getCategoryProducts();
    }
  }, [
    category,
    type,
    input,
    sort,
    filteredBrands,
    filteredTypes,
    minPrice,
    maxPrice,
    page,
  ]);

  // WHEN USER GOES BACKWARDS FROM CHROME
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const currentpage = parseInt(urlParams.get("page"), 10) || 1;
      setPage(currentpage);
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <Container>
      <Wrapper>
        {input ? ( // IF SEARCH INPUT EXISTS
          <Div>
            <SortContainer>
              <Desc>
                {totalPageCount > 1
                  ? `1-${totalPageCount} of ${totalProductsCount} results for `
                  : totalProductsCount
                  ? `${totalProductsCount} results for `
                  : loading
                  ? "loading results for  "
                  : "0 results for  "}
                <span style={{ color: "#00688B", fontWeight: "700" }}>
                  "{input}"
                </span>
              </Desc>

              <Sorting setSort={setSort} />
            </SortContainer>
            {/* FOR DESKTOP */}
            <Filterbar
              category={category}
              type={type}
              brandRefinementItems={
                brandRefinementItems && brandRefinementItems
              }
              typeRefinementItems={typeRefinementItems && typeRefinementItems}
              filteredBrands={filteredBrands}
              setFilteredBrands={setFilteredBrands}
              filteredTypes={filteredTypes}
              setFilteredTypes={setFilteredTypes}
              filters={filters}
              setFilters={setFilters}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />

            {/* FOR MOBILE */}
            <FilterSorter>
              <FilterButton onClick={toggleBottomSheet}>
                <FilterAltOutlinedIcon style={{ paddingRight: "5px" }} />
                <Label>Filter</Label>
                <Overlay open={isOpen} setOpen={setIsOpen} />
              </FilterButton>
              <FilterBottomSheet
                category={category}
                type={type}
                open={isOpen}
                setOpen={setIsOpen}
                brandRefinementItems={
                  brandRefinementItems && brandRefinementItems
                }
                typeRefinementItems={typeRefinementItems && typeRefinementItems}
                filteredBrands={filteredBrands}
                setFilteredBrands={setFilteredBrands}
                filteredTypes={filteredTypes}
                setFilteredTypes={setFilteredTypes}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
              />
              <SortingMobile setSort={setSort} />
            </FilterSorter>
          </Div>
        ) : category === "hotdeals" ? (
          <>
            <BannerImg src={hotdealsbanner} />
            <BannerImgMobile src={mobilehotdealsbanner} />
          </>
        ) : category === "sales" ? (
          <>
            <BannerImg src={salesBanner} />
            <BannerImgMobile src={salesBannerMobile} />
          </>
        ) : (
          // IF IT IS TYPICAL CATEGORY PAGE
          <Div>
            {category === "coupon" && <BannerImg src={limitedbanner} />}
            <Path>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Pathname>Home</Pathname>
              </Link>
              <ArrowRightIcon style={arrow} />
              <Pathname className={type === "all" && "green"}>
                {category === "coupon"
                  ? "Limited Offer"
                  : `${category.charAt(0).toUpperCase() + category.slice(1)}`}
              </Pathname>

              {type && type !== "all" && <ArrowRightIcon style={arrow} />}
              <CategoryName>
                {type && type === "aio-desktop"
                  ? "AIO & Desktop"
                  : type === "all"
                  ? ""
                  : type === "ups" || type === "avr"
                  ? `${type?.toUpperCase()}`
                  : `${type?.charAt(0).toUpperCase() + type?.slice(1)}`}
              </CategoryName>
            </Path>

            <SortContainer>
              <Title>
                {type === "ups" || type === "avr"
                  ? `${type.toUpperCase()}`
                  : type !== "all"
                  ? `${type?.charAt(0).toUpperCase() + type?.slice(1)}`
                  : category === "coupon"
                  ? "Limited Offer"
                  : `${category.charAt(0).toUpperCase() + category.slice(1)}`}
              </Title>

              <Sorting setSort={setSort} />
            </SortContainer>

            {/* FOR DESKTOP */}
            <Filterbar
              category={category}
              type={type}
              brandRefinementItems={
                brandRefinementItems && brandRefinementItems
              }
              typeRefinementItems={typeRefinementItems && typeRefinementItems}
              filteredBrands={filteredBrands}
              setFilteredBrands={setFilteredBrands}
              filteredTypes={filteredTypes}
              setFilteredTypes={setFilteredTypes}
              filters={filters}
              setFilters={setFilters}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />

            {/* FOR MOBILE */}
            <FilterSorter>
              <FilterButton onClick={toggleBottomSheet}>
                <FilterAltOutlinedIcon style={{ paddingRight: "5px" }} />
                <Label>Filter</Label>
                <Overlay open={isOpen} setOpen={setIsOpen} />
              </FilterButton>
              <FilterBottomSheet
                category={category}
                type={type}
                open={isOpen}
                setOpen={setIsOpen}
                brandRefinementItems={
                  brandRefinementItems && brandRefinementItems
                }
                typeRefinementItems={typeRefinementItems && typeRefinementItems}
                filteredBrands={filteredBrands}
                setFilteredBrands={setFilteredBrands}
                filteredTypes={filteredTypes}
                setFilteredTypes={setFilteredTypes}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
              />
              <SortingMobile setSort={setSort} />
            </FilterSorter>
          </Div>
        )}

        <ResultContainer>
          {products ? (
            <Results className="full">
              <Section className="full">
                <Products>
                  {products.map((item) => (
                    <ProductList
                      item={item}
                      key={item._id}
                      wishList={wishList}
                      handleWishList={handleWishList}
                    />
                  ))}
                </Products>
              </Section>

              <StackDiv>
                <Stack spacing={2} style={{ paddingTop: "30px" }}>
                  <Pagination
                    count={totalPageCount}
                    page={parseInt(searchParams.get("page"))}
                    onChange={(e, value) =>
                      handlePageChange(category, type, e, value)
                    }
                    // hidePrevButton
                    // hideNextButton
                  />
                </Stack>
              </StackDiv>
            </Results>
          ) : serverError ? (
            <Section>
              <ErrorDiv className="circle" style={{ padding: "100px 0" }}>
                <SearchOffIcon style={{ color: "#667D85" }} />
                <span>Couldn't find any results</span>
              </ErrorDiv>
            </Section>
          ) : loading ? (
            <Results className={input ? "half" : "full"}>
              <Section className={input ? "half" : "full"}>
                <Products className="circle">
                  <CircularProgress
                    style={{
                      color: "#03A89E",
                      padding: "20px 0",
                    }}
                  />
                </Products>
              </Section>
            </Results>
          ) : (
            <></>
          )}
        </ResultContainer>
      </Wrapper>
    </Container>
  );
};

export default Category;
