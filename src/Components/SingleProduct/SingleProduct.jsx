import React, { useContext, useEffect, useRef, useState } from "react";
import "./SingleProduct.scss";
import { useParams } from "react-router-dom";
import MyContext from "../../Common/Context/MyContext";
import SingleImage from "./SingleImage/SingleImage";
import { FaFacebookF, FaCopy, FaWhatsapp, FaTwitter } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  ArchiveRestore,
  ChevronDown,
  HandCoins,
  Lock,
  MapPin,
  RefreshCw,
  Truck,
} from "lucide-react";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import SizeChartModal from "./Sizechart/Sizechart";
import { Helmet } from "react-helmet";
import FAQ from "./FAQ/FAQ";
import Productlist from "../Products/Productlist";

const SingleProduct = () => {
  const selectSizeErrorRef = useRef(null);
  const [filters] = useState({ maxPrice: 5000, selectedSizes: [] });

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<span key={i}>&#9733;</span>); // Filled star (★)
      } else {
        stars.push(<span key={i}>&#9734;</span>); // Unfilled star (☆)
      }
    }
    return stars;
  };

  const fullUrl = window.location.href;

  const {
    loading,
    selectSize,
    handleSize,
    size,
    cursorPosition,
    data,
    saveimg,
    formatReviewCount,
    overshow,
    handleCheckout,
    handlewish,
    opensizeModal,
  } = useContext(MyContext);

  const { title, name } = useParams();

  const [activeSection, setActiveSection] = useState("details");

  const [visibleReviews, setVisibleReviews] = useState(3);

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 3);
  };

  const handleAddToCart = (outerId, innerId, img, productName, price) => {
    // Scroll to the "Select Size" error
    selectSizeErrorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    handleCheckout(outerId, innerId, img, productName, price);
  };

  const [scrolled1, setScrolled1] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollPercentage =
      (scrollTop / (documentHeight - viewportHeight)) * 100;

    if (scrollPercentage > 40) {
      setScrolled1(true);
    } else {
      setScrolled1(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="layout">
      {data
        .filter((Item) => Item.product_category_route === title)
        .map((outer) => {
          return (
            <>
              {outer.product_container
                .filter((Item) => Item.product_route === name)
                .map((inner) => {
                  return (
                    <>
                      <Helmet>
                        <title>
                          {inner.product_name} | Buy {inner.product_name} Online
                          | Best Price
                        </title>
                        <meta name="description" content={inner.product_name} />
                        <meta
                          name="keywords"
                          content={`${inner.product_name}, buy ${inner.product_name} online, ${inner.product_name} clothing, fashion`}
                        />
                        <meta
                          property="og:title"
                          content={`${inner.product_name} - https://i.ibb.co/fzkBRjwS/Logo.png`}
                        />
                        <meta
                          property="og:description"
                          content={inner.product_description}
                        />
                        <meta property="og:image" content={inner.product_img} />
                        {/* <meta property="og:url"
                        content={`https://your-website.com/product/${product.id}`} /> */}
                      </Helmet>
                      <div className="single-product-page" key={inner.id}>
                        <div className="left">
                          <SingleImage
                            img={inner.product_img}
                            sideimg={inner.side_img}
                          />
                        </div>
                        <div className="right">
                          {overshow && (
                            <div
                              className="overlay-big"
                              style={{
                                backgroundPosition: `${cursorPosition.x}% ${cursorPosition.y}%`,
                                backgroundImage: `url(${saveimg})`,
                                backgroundSize: "150% ",
                              }}
                            ></div>
                          )}
                          <span className="name">{inner.product_name}</span>
                          <div className="rating">
                            {inner.reviews && inner.reviews.length > 0 ? (
                              <>
                                <span className="star">
                                  {renderStars(
                                    (
                                      inner.reviews.reduce(
                                        (acc, review) => acc + review.rating,
                                        0,
                                      ) / inner.reviews.length
                                    ).toFixed(1),
                                  )}
                                </span>
                                &nbsp;
                                {(
                                  inner.reviews.reduce(
                                    (acc, review) => acc + review.rating,
                                    0,
                                  ) / inner.reviews.length
                                ).toFixed(1)}
                                &nbsp; (
                                {formatReviewCount(inner.reviews.length)})
                              </>
                            ) : null}
                          </div>
                          <span className="rating buy">
                            {" "}
                            200+ purchased in the last month
                          </span>
                          <span className="price">
                            &#8377;{inner.product_price} &nbsp;{" "}
                            <del style={{ color: "rgba(0,0,0,0.5)" }}>
                              {" "}
                              &#8377;{inner.product_price_deleted}{" "}
                            </del>
                          </span>

                          <div class="size">
                            Size:
                            {inner.size_main.map((a) => {
                              return (
                                <span
                                  style={{
                                    backgroundColor: a.size === size && "black",
                                    color: a.size === size && "white",
                                  }}
                                  onClick={() => handleSize(a.size)}
                                >
                                  {a.size}
                                </span>
                              );
                            })}
                          </div>
                          {selectSize && (
                            <p ref={selectSizeErrorRef}>
                              ** please select size
                            </p>
                          )}

                          <button className="chart-btn" onClick={opensizeModal}>
                            Size Chart{" "}
                            <ChevronDown size={16} strokeWidth={1.75} />
                          </button>

                          <div
                            className={`cart-buttons ${
                              scrolled1 ? "relative-buttons" : ""
                            }`}
                          >
                            <button
                              className="add-to-cart-button"
                              disabled={loading}
                              onClick={() =>
                                handleAddToCart(
                                  outer.id,
                                  inner.id,
                                  inner.product_img,
                                  inner.product_name,
                                  inner.product_price,
                                )
                              }
                            >
                              {" "}
                              {loading ? "Adding to Cart..." : <>Add To Cart</>}
                            </button>

                            <button
                              className="add-to-cart-button"
                              onClick={() =>
                                handlewish(
                                  outer.id,
                                  inner.id,
                                  inner.product_img,
                                  inner.product_name,
                                  inner.product_price,
                                )
                              }
                            >
                              {" "}
                              Add To Wishlist
                            </button>
                          </div>
                          <div className="info-item">
                            <h3>About this item</h3>
                            <span className="text-bold">
                              Category:
                              <span className="normal-text">
                                &nbsp;{outer.product_category}
                              </span>
                            </span>
                            <span className="text-bold">
                              Share:
                              <span
                                className="Social-icons"
                                style={{ display: "flex" }}
                              >
                                <a
                                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                    fullUrl,
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <FaFacebookF title="facebook" />
                                </a>
                                <a
                                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                    fullUrl,
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <FaTwitter title="instergram" />
                                </a>
                                <a
                                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                                    fullUrl,
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <FaWhatsapp title="whatsapp" />
                                </a>
                                <CopyToClipboard text={fullUrl}>
                                  <FaCopy title="copy" />
                                </CopyToClipboard>
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="last1">
                          <div className="del">
                            <p>Delivery will be available in just 2 Days. </p>
                          </div>

                          <div className="location">
                            <p>
                              <MapPin size={16} strokeWidth={2} /> Update your
                              location{" "}
                            </p>
                          </div>
                          <div className="stock">
                            <p>have in stock </p>
                          </div>
                          <div className="conditions">
                            <span>
                              <ArchiveRestore
                                className="ic"
                                size={30}
                                color="#fd6a08"
                                strokeWidth={1.5}
                              />
                              <p>10 days return and exchange </p>
                            </span>
                            <span>
                              <HandCoins
                                className="ic"
                                size={30}
                                color="#fd6a08"
                                strokeWidth={1.5}
                              />
                              <p> Pay on Delivery</p>
                            </span>
                            <span>
                              <Truck
                                className="ic"
                                size={30}
                                color="#fd6a08"
                                strokeWidth={1.5}
                              />
                              <p> Free Delivery </p>
                            </span>
                          </div>

                          <div>
                            <p className="lock">
                              <Lock size={16} color="#565252" /> Secure
                              Transection{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="desc">
                        <div className="headings">
                          <h2
                            className={
                              activeSection === "details" ? "active" : ""
                            }
                            onClick={() => setActiveSection("details")}
                          >
                            Product Details
                          </h2>
                          <h2
                            className={
                              activeSection === "reviews" ? "active" : ""
                            }
                            onClick={() => setActiveSection("reviews")}
                          >
                            Reviews
                          </h2>
                        </div>

                        {activeSection === "details" && (
                          <div className="pr-details">
                            <li>{inner.product_description}</li>
                            <li>
                              <strong>Product Dimensions:</strong> 31 x 21.8 x
                              11 cm; 600 grams
                            </li>
                            <li>
                              <strong>First Available:</strong> 25 May 2021
                            </li>
                            <li>
                              <strong>Manufacturer:</strong> Campus
                            </li>
                            <li>
                              <strong>Item Model Number:</strong> 5G-846
                            </li>
                            <li>
                              <strong>Country of Origin:</strong> India
                            </li>
                            <li>
                              <strong>Category:</strong> Men
                            </li>
                            <li>
                              <strong>Manufacturer Details:</strong> Campus,
                              Campus Activewear Pvt. Ltd., C9&10 Salaqui
                              Industrial Area, Dehradun 248197
                            </li>
                            <li>
                              <strong>Product Weight:</strong> 600 g
                            </li>
                            <li>
                              <strong>Item Dimensions LxWxH:</strong> 31 x 21.8
                              x 11 cm
                            </li>
                            <li>
                              <strong>Total Quantity:</strong> 1 count
                            </li>
                            <li>
                              <strong>Customer Reviews:</strong> 3.9 out of 5
                              stars 4,026 ratings:
                            </li>
                          </div>
                        )}
                        {activeSection === "reviews" &&
                        inner.reviews &&
                        inner.reviews.length > 0 ? (
                          <>
                            {inner.reviews
                              .slice(0, visibleReviews)
                              .map((review, index) => (
                                <div key={index} className="reviews-details">
                                  <div className="review-header">
                                    <Avatar
                                      className="avatar"
                                      sx={{
                                        bgcolor: deepPurple[500],
                                        width: 46,
                                        height: 46,
                                      }}
                                    >
                                      {review.name[0]}
                                    </Avatar>
                                  </div>
                                  <div className="right-part">
                                    <div className="stars">
                                      {renderStars(review.rating)}
                                    </div>
                                    <p className="review-text">
                                      {review.message}
                                    </p>
                                    <div className="review-footer">
                                      <p className="reviewer-name">
                                        {review.name}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {visibleReviews < inner.reviews.length && (
                              <button
                                onClick={loadMoreReviews}
                                className="load-more-btn"
                              >
                                <RefreshCw
                                  strokeWidth={1.5}
                                  size={16}
                                  color={"gray"}
                                />{" "}
                                Load More Reviews
                              </button>
                            )}
                          </>
                        ) : (
                          <p style={{ textAlign: "center" }}>
                            No reviews available.
                          </p> // Or return null if you don't want to show any message.
                        )}
                      </div>
                    </>
                  );
                })}

              <Productlist title={title} filters={filters} />
              <FAQ />
              <SizeChartModal />
            </>
          );
        })}
    </div>
  );
};

export default SingleProduct;
