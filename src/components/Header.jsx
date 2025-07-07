import React, { useState } from "react";
import styled from "styled-components";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../rangoon-discount.png";
import LoginIcon from "@mui/icons-material/Login";
import "../css/header.css";

import { InstantSearch, SearchBox } from "react-instantsearch";

import searchClient from "../algolia";

const Container = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    margin-bottom: 20px;
  }
`;

const Wrapper = styled.div`
  width: 1180px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`;

const Image = styled.img`
  width: 150px;
  height: 110px;
  object-fit: cover;
  cursor: pointer;
`;

// const SearchContainer = styled.div`
//   display: flex;
//   flex: 1.5;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   position: relative;
// `;

// const SearchInner = styled.div`
//   width: 50%;
//   border: 1px solid #bfc9cc;
//   border-radius: 8px;
//   display: flex;
//   align-items: center;
//   position: absolute;

//   &:hover {
//     box-shadow: 0px 0px 8px 1px rgba(0, 104, 139, 0.25);
//     border: 1px solid #dee3e5;
//     transition: all 0.6s ease-in-out;
//   }
// `;

// const SearchInput = styled.input.attrs({
//   placeholderTextColor: "#24282B",
// })`
//   font-size: 15px;
//   font-weight: 300;
//   padding: 0 10px;
//   margin: 0 10px;
//   border: ${(props) => (props.showSearch ? "1px solid lightgray" : "none")};
//   height: 40px;
//   width: 90%;
//   display: inline-block;

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
//   top: 25px;
//   z-index: 1;
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
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const UserSection = styled.div`
  font-size: 20px;
  padding: 0 15px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
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

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px;
`;

const Text1 = styled.p`
  padding-bottom: 5px;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  color: #002734;
`;

const Text2 = styled.p`
  font-weight: 400;
  font-size: 13px;
  color: #667d85;
`;

const Block = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    transform: scale(1.1);
  }
`;

const IconSection = styled.div`
  font-size: 20px;
  display: flex;
  padding: 0 15px;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    transform: scale(1.1);
  }
`;

const NumberofItems = styled.span`
  position: absolute;
  top: -12px;
  right: -1px;
  padding: 4px 8px;
  background-color: #d52b2b;
  color: white;
  border: 3px solid white;
  font-size: 13px;
  border-radius: 50%;
`;

// const IconBox = styled.div`
//   color: gray;
//   cursor: pointer;
//   padding: 8px;
//   display: flex;
//   align-items: center;
// `;

// const block = {
//   textDecoration: "none",
//   cursor: "pointer",
//   color: "black",
// };

const IconStyle = {
  fontSize: "28px",
  cursor: "pointer",
  paddingBottom: "5px",
};

const profileIcon = {
  fontSize: "28px",
  cursor: "pointer",
  marginBottom: "10px",
};

const Header = ({ click, profile, user, setUser, cartItems, wishList }) => {
  const [input, setInput] = useState("");
  // const [dropdown, setDropdown] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
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

  // TO SEARCH WHEN YOU CLICK ENTER
  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     setInput(event.target.value);
  //     // setDropdown(false);
  //     navigate(`/searchResult/${encodeURIComponent(input)}?page=1`);
  //     setInput("");
  //   }
  // };

  // const clearSearch = () => {
  //   setInput("");
  //   // setDropdown(false);
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
  //   // setDropdown(false);
  // };

  // function Hit({ hit }) {
  //   const handleClick = () => {
  //     navigate(`/${hit.category[0]}/product/${hit._id}`);
  //     setInput("");
  //   };

  //   return (
  //     hit &&
  //     hit.display && (
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
  //         {/* <SuggestionRow onClick={() => handleSearch(input)}>
  //           See all results for "{input}" <ArrowRightAltIcon style={arrow} />
  //         </SuggestionRow> */}
  //       </>
  //     )
  //   );
  // }

  return (
    <>
      <Container>
        <Wrapper>
          <ImageContainer>
            <Image src={logo} onClick={() => navigate("/")} />
          </ImageContainer>

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
                    .slice(0, 5)
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
            <InstantSearch searchClient={searchClient} indexName="rd_products">
              {/* <Configure filters="display:true" hitsPerPage={5} /> */}
              <SearchBox
                className="custom-search-box"
                value={input}
                searchAsYouType={false}
                onChange={(e) => setInput(e.target.value)}
                onSubmit={(e) => handleSearch(e, input)}
              />
              {/* {input && input.length >= 5 && <Hits hitComponent={Hit} />} */}
            </InstantSearch>
          </div>

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
                <Info>
                  <Text1>Log in</Text1>
                  <Text2>Your account</Text2>
                </Info>
                <UserSection>
                  <LoginIcon style={IconStyle} />
                </UserSection>
              </Block>
            )}

            <IconSection className="icon">
              <Link to="/wishlist" style={{ color: "black" }}>
                <FavoriteBorderIcon
                  style={IconStyle}
                  className={`icon ${path === "wishlist" && "active"}`}
                ></FavoriteBorderIcon>
              </Link>
              {wishList.length === 0 ? (
                <></>
              ) : (
                <NumberofItems>{wishList.length}</NumberofItems>
              )}
            </IconSection>

            <IconSection className="icon">
              <Link to="/cart" style={{ color: "black" }}>
                <ShoppingCartOutlinedIcon
                  style={IconStyle}
                  className={`icon ${path === "cart" && "active"}`}
                ></ShoppingCartOutlinedIcon>
              </Link>
              {cartItems?.map((i) => {
                i === undefined && (cartItems.length = 0);
              })}
              {cartItems.length > 0 ? (
                <NumberofItems>{cartItems.length}</NumberofItems>
              ) : (
                <></>
              )}
            </IconSection>
          </Icons>
        </Wrapper>
      </Container>
    </>
  );
};

export default Header;
