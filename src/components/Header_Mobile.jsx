import React, { useState } from "react";
import styled from "styled-components";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../rangoon-discount.png";
import LoginIcon from "@mui/icons-material/Login";
import "../css/header.css";
import MenuIcon from "@mui/icons-material/Menu";

import {
  InstantSearch,
  SearchBox,
  // Hits,
  // Configure,
  // Highlight,
} from "react-instantsearch";

import searchClient from "../algolia";

const Container = styled.div`
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 150px;
    display: flex;
  }
`;

const Wrapper = styled.div`
  @media only screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ImageContainer = styled.div`
  @media only screen and (max-width: 768px) {
    flex: 1;
    cursor: pointer;
  }
`;

const Image = styled.img`
  @media only screen and (max-width: 768px) {
    width: 85px;
    max-width: 90px;
    height: 85px;
  }
`;

// const SearchContainer = styled.div`
//   @media only screen and (max-width: 768px) {
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     width: 90%;
//   }
// `;

// const SearchInner = styled.div`
//   @media screen and (max-width: 768px) {
//     width: 100%;
//     border: 1px solid #bfc9cc;
//     border-radius: 8px;
//     display: flex;
//     align-items: center;

//     &:hover {
//       box-shadow: 0px 0px 8px 1px rgba(0, 104, 139, 0.25);
//       border: 1px solid #dee3e5;
//       transition: all 0.6s ease-in-out;
//     }
//   }
// `;

// const SearchInput = styled.input.attrs({
//   placeholderTextColor: "#24282B",
// })`
//   font-size: 15px;
//   font-weight: 300;
//   padding: 0 10px;
//   margin: 0 4px;
//   border: ${(props) => (props.showSearch ? "1px solid lightgray" : "none")};
//   height: 40px;
//   display: inline-block;
//   width: 90%;

//   &:focus {
//     outline: none;
//   }
// `;

// const Dropdown = styled.div`
//   width: 100%;
//   background-color: white;
//   display: flex;
//   flex-direction: column;
//   border: 0.5px solid lightgray;
//   border-radius: 8px;
//   position: absolute;
//   top: 50px;
//   z-index: 5;
// `;

// const SuggestionRow = styled.div`
//   cursor: pointer;
//   text-align: start;
//   padding: 8px;
//   display: flex;
//   align-items: center;
//   color: #00688b;
//   font-size: 15px;

//   &:hover {
//     background-color: #f1f1f1;
//   }
// `;

// const Img = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-right: 10px;
// `;

// const Title = styled.div`
//   color: gray;
//   font-size: 15px;
// `;

const Icons = styled.div`
  @media screen {
    display: flex;
    align-items: center;
    margin-right: -12px;
  }
`;

const UserSection = styled.div`
  @media only screen and (max-width: 759px) {
    font-size: 18px;
  }
`;

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Profile = styled.div`
  font-size: 20px;
  margin: 0 15px;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }
`;

const Block = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    transform: scale(1.1);
  }
`;

const IconSection = styled.div`
  @media only screen and (max-width: 768px) {
    font-size: 20px;
    padding-right: 15px;
    position: relative;
    display: flex;
    align-items: center;
  }
`;

const NumberofItems = styled.span`
  @media screen and (max-width: 768px) {
    position: absolute;
    top: -15px;
    right: 3px;
    padding: 4px 8px;
    background-color: #d52b2b;
    color: white;
    border: 3px solid white;
    font-size: 13px;
    border-radius: 50%;
  }
`;

const HeaderParts = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  width: 90%;
  gap: 20px;
`;

// const IconBox = styled.div`
//   color: gray;
//   cursor: pointer;
//   padding: 8px;
//   display: flex;
//   align-items: center;
//   width: 10%;
// `;

// const block = {
//   textDecoration: "none",
//   cursor: "pointer",
//   color: "black",
// };

const IconStyle = {
  fontSize: "28px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};

const loginIcon = {
  fontSize: "28px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: "15px",
};

const profileIcon = {
  fontSize: "28px",
  cursor: "pointer",
};

const burger = {
  color: "black",
};

const Header_Mobile = ({ click, profile, user, cartItems, wishList, nav }) => {
  const [input, setInput] = useState("");
  // const [dropdown, setDropdown] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const path2 = location.pathname;

  // FOR SHUFFLING ARRAY

  const navigate = useNavigate();

  // const handleInput = (e) => {
  //   if (e.target.value === "") {
  //     setDropdown(false);
  //     setInput("");
  //   } else {
  //     setDropdown(true);
  //     setInput(e.target.value);
  //   }
  // };

  const handleSearch = (e, input) => {
    e.preventDefault();
    if (input.trim() !== "") {
      navigate(`/searchResult/${encodeURIComponent(input)}?page=1`);
    }
    setInput("");
  };

  // const viewProduct = () => {
  //   setInput("");
  //   setDropdown(false);
  // };

  // function Hit({ hit }) {
  //   const handleClick = () => {
  //     navigate(`/${hit.category[0]}/product/${hit._id}`);
  //     setInput("");
  //   };

  //   return (
  //     hit &&
  //     hit.display === "true" && (
  //       <>
  //         <div className="hit" onClick={() => handleClick()}>
  //           <img
  //             src={hit.image[0]}
  //             alt={hit.title}
  //             width="50px"
  //             height="50px"
  //           />
  //           <span className="title">
  //             <Highlight className="highlighted" attribute="title" hit={hit} />
  //           </span>
  //         </div>
  //       </>
  //     )
  //   );
  // }

  return (
    <>
      {path2 === "/myorders/mobile/ordNum" ||
      path2 === "/myorders/mobile/ordNum/cancel" ? (
        ""
      ) : (
        <>
          <Container>
            <Wrapper>
              <HeaderParts>
                <MenuIcon style={{ burger }} onClick={nav} />

                <ImageContainer onClick={() => navigate("/")}>
                  <Image src={logo} />
                </ImageContainer>

                <Icons>
                  {user ? (
                    <ProfileDiv>
                      <Profile
                        className={`icon ${path === "profile" && "active"}`}
                        onClick={profile}
                      >
                        <PersonOutlineIcon style={profileIcon} />
                      </Profile>
                    </ProfileDiv>
                  ) : (
                    <Block onClick={click}>
                      <UserSection>
                        <LoginIcon style={loginIcon} />
                      </UserSection>
                    </Block>
                  )}

                  <IconSection className="icon">
                    <Link to="/wishlist" style={{ color: "black" }}>
                      <FavoriteBorderIcon
                        style={IconStyle}
                        className={`icon ${path === "wishlist" && "active"}`}
                      ></FavoriteBorderIcon>
                      {wishList.length === 0 ? (
                        <></>
                      ) : (
                        <NumberofItems>{wishList.length}</NumberofItems>
                      )}
                    </Link>
                  </IconSection>

                  <IconSection className="icon">
                    <Link to="/cart" style={{ color: "black" }}>
                      <ShoppingCartOutlinedIcon
                        style={IconStyle}
                        className={`icon ${path === "cart" && "active"}`}
                      ></ShoppingCartOutlinedIcon>
                      {cartItems?.map((i) => {
                        i === undefined && (cartItems.length = 0);
                      })}
                      {cartItems.length > 0 ? (
                        <NumberofItems>{cartItems.length}</NumberofItems>
                      ) : (
                        <></>
                      )}
                    </Link>
                  </IconSection>
                </Icons>
              </HeaderParts>

              {/* <SearchContainer>
                <SearchInner>
                  <SearchInput
                    placeholder="Search"
                    value={input}
                    onChange={(e) => handleInput(e)}
                    onKeyDown={handleKeyDown}
                  />
                  {input && (
                    <IconBox onClick={() => clearSearch()}>
                      <ClearIcon />
                    </IconBox>
                  )}

                  <SearchIcon
                    style={{
                      color: "white",
                      padding: "8px",
                      fontSize: "25px",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      backgroundColor: "#197fa6",
                      borderRadius: "0px 8px 8px 0px",
                      width: "10%",
                    }}
                    onClick={() => handleSearch(input)}
                  />
                </SearchInner>

                {dropdown && (
                  <Dropdown>
                    {dropdown &&
                      data &&
                      data
                        .filter((i) => {
                          const searchTerm = input.toLowerCase();
                          const desc = i.desc.toLowerCase();
                          const brand = i.brand.toLowerCase();
                          const cat = i.category[0].toLowerCase();

                          if (searchTerm) {
                            return (
                              desc.includes(searchTerm) ||
                              brand.includes(searchTerm) ||
                              cat.includes(searchTerm) ||
                              i.type?.toLowerCase().includes(searchTerm) ||
                              i.features?.toLowerCase().includes(searchTerm)
                            );
                          }
                        })
                        .slice(0, 4)
                        .map((i) => {
                          return (
                            <Link
                              to={`/${i.category[0]}/product/${i._id}`}
                              style={block}
                              key={i._id}
                            >
                              <SuggestionRow onClick={() => viewProduct()}>
                                <Img src={i.image[0]} />
                                <Title>{i.title}</Title>
                              </SuggestionRow>
                            </Link>
                          );
                        })}
                    {dropdown && (
                      <SuggestionRow onClick={() => handleSearch(input)}>
                        See all results for "{input}"{" "}
                        <ArrowRightAltIcon style={arrow} />
                      </SuggestionRow>
                    )}
                  </Dropdown>
                )}
              </SearchContainer> */}

              <div className="search-container">
                <InstantSearch
                  searchClient={searchClient}
                  indexName="rd_products"
                >
                  {/* <Configure filters="display:true" hitsPerPage={5} /> */}
                  <SearchBox
                    className="custom-search-box"
                    value={input}
                    searchAsYouType={false}
                    onChange={(e) => setInput(e.target.value)}
                    onSubmit={(e) => handleSearch(e, input)}
                  />
                  {/* {input && input.length >= 1 && <Hits hitComponent={Hit} />} */}
                </InstantSearch>
              </div>
            </Wrapper>
          </Container>
        </>
      )}
    </>
  );
};

export default Header_Mobile;
