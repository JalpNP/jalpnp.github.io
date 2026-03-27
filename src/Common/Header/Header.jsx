import React, { useContext, useEffect, useMemo, useState } from "react";
import "./Header.scss";
import log from "../../assets/logo.png";
import Tooltip from "@mui/material/Tooltip";
import MyContext from "../Context/MyContext";
import Search from "./Search/Search";
import Profile from "./Profile/Profile";
import { VscSearch } from "react-icons/vsc";
import { Heart, ShieldCheck, ShoppingCart, UserRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import axios from "axios";

const Header = () => {
  const {
    wish,

    isProfileHovered,
    setIsProfileHovered,
    searchBarRef2,
    searchBarRef,
    setInput,
    scrolled,
    input,
    Navigate,
    token,
    userdata,
    cartItems,
  } = useContext(MyContext);

  const location = useLocation();

  const navigate = useNavigate();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      // const response = await axios.post("http://localhost:3034/image-search", formData, {
      const response = await axios.post(
        // "https://genzback.onrender.com/image-search",
        "https://gen-z-back.vercel.app/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      navigate("/products-by-image", {
        state: { similarImages: response.data.similarImages },
      });
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const cartShipPament =
    location.pathname !== "/cart" && location.pathname !== "/shipping-details";
  const cartwishlocation =
    location.pathname !== "/cart" &&
    location.pathname !== "/wishlist" &&
    location.pathname !== "/shipping-details" &&
    !location.pathname.includes("city");
  const hidesamllsearch =
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/edit" &&
    location.pathname !== "/account-details" &&
    location.pathname !== "/shipping-address" &&
    location.pathname !== "/order";

  const headerClass = `main-header ${
    scrolled && cartwishlocation ? "sticky-header" : ""
  } ${location.pathname.includes("city") ? "whiteclr" : ""}`;

  const items = useMemo(
    () => ["T-Shirt", "Track-Pants", "Gym-tank", "Sports-sando"],
    [],
  );
  const [animate, setAnimate] = useState(false);

  const [right, setRight] = useState(items[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setRight(items[index]);
    setAnimate(true);

    const timeout = setTimeout(() => setAnimate(false), 700);

    return () => clearTimeout(timeout);
  }, [index, items]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 1600);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <>
      <header className={headerClass}>
        <div className="header-content">
          <div className="left">
            <img src={log} onClick={() => Navigate("/")} alt="" />
          </div>

          {cartShipPament ? (
            <div className="center">
              <input
                className="search-box "
                type="text"
                onChange={(e) => setInput(e.target.value)}
                ref={searchBarRef}
              />{" "}
              <VscSearch className="src" />
              <Tooltip className="ttp" title="VistaAI" placement="top">
                <label htmlFor="imgSearch" className="camera">
                  <Camera size={20} />
                </label>
              </Tooltip>
              <input
                type="file"
                id="imgSearch"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <span className="imgnry-placeholder">
                Search for
                <span className="imgnry-placeholder-value">
                  <span className={animate ? "animate" : ""}>{right}</span>
                </span>
              </span>
              {/* <span className='imgnry-placeholder'> 
              Search for
              <span className={`imgnry-placeholder-value ${animate ? 'animate' : ''}`}> {right}</span>
              </span> */}
              {input && (
                <div className="srchbar">
                  <Search />
                </div>
              )}
            </div>
          ) : (
            <div className="center">
              <p className="cart-text">
                {location.pathname === "/cart"
                  ? "CART DETAILS"
                  : "SHIPPING DETAILS"}
              </p>
            </div>
          )}

          {cartShipPament ? (
            <div className="right">
              {token ? (
                <div
                  className="accounti"
                  onMouseLeave={() => setIsProfileHovered(!isProfileHovered)}
                  onClick={() => setIsProfileHovered(!isProfileHovered)}
                  onMouseEnter={() => setIsProfileHovered(!isProfileHovered)}
                >
                  <UserRound size={20} strokeWidth={1.5} />
                  <span className="lin-name">{userdata && userdata.fname}</span>
                  {isProfileHovered && (
                    <div className="prp">
                      {" "}
                      <Profile />{" "}
                    </div>
                  )}
                </div>
              ) : (
                <div className="belogin">
                  <Tooltip className="ttp" title="Login" placement="top">
                    <div className="login" onClick={() => Navigate("/login")}>
                      <span className="lgntxt">Login</span>
                      <UserRound
                        size={20}
                        strokeWidth={1.5}
                        className="login-icn"
                      />
                    </div>
                  </Tooltip>
                </div>
              )}
              {token ? (
                <div className="accounti">
                  {wish && wish.length > 0 ? (
                    <Heart
                      strokeWidth={1.5}
                      size={20}
                      className="svgs wishs"
                      onClick={() => Navigate("/wishlist")}
                    />
                  ) : (
                    <Heart
                      strokeWidth={1.5}
                      size={20}
                      className="svgs"
                      onClick={() => Navigate("/wishlist")}
                    />
                  )}
                  <span
                    className="lin-name"
                    onClick={() => Navigate("/wishlist")}
                  >
                    Wishlist
                  </span>
                </div>
              ) : (
                <Tooltip title="Wishlist" className="ttp" placement="top">
                  <span>
                    {" "}
                    <Heart
                      strokeWidth={1.5}
                      size={20}
                      className="svgs"
                      onClick={() => Navigate("/wishlist")}
                    />{" "}
                  </span>
                </Tooltip>
              )}
              {token ? (
                <div className="accounti" onClick={() => Navigate("/cart")}>
                  {" "}
                  <ShoppingCart size={20} strokeWidth={1.5} className="svgs" />
                  <span className="lin-name">Cart</span>
                  <span className="cart-num">{cartItems?.length || 0}</span>
                </div>
              ) : (
                <Tooltip title="Wishlist" className="ttp" placement="top">
                  <span>
                    {" "}
                    <ShoppingCart
                      size={20}
                      strokeWidth={1.5}
                      className="svgs"
                      onClick={() => Navigate("/cart")}
                    />{" "}
                  </span>
                </Tooltip>
              )}
            </div>
          ) : (
            <div className="right">
              <p className="secure">
                {" "}
                <ShieldCheck color="green" size={30} /> 100% SECURE
              </p>
            </div>
          )}
        </div>
      </header>

      {!location.pathname.includes("category") &&
        cartwishlocation &&
        hidesamllsearch && (
          <div className="serch2">
            <input
              className="search-box2"
              type="text"
              placeholder="search..."
              onChange={(e) => setInput(e.target.value)}
              ref={searchBarRef2}
              style={{
                borderBottomLeftRadius: input.length > 0 ? "0px" : "20px",
                borderBottomRightRadius: input.length > 0 ? "0px" : "20px",
              }}
            />{" "}
            <VscSearch className="src2" />
            {input && (
              <div className="srchbar2">
                <Search />
              </div>
            )}
          </div>
        )}
    </>
  );
};

export default Header;
