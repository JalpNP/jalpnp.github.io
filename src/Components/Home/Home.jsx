import React from "react";
import Categories from "../Categories/Categories";
import "./Home.scss";
import Productlist from "../Products/Productlist";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="home-main">
      <Helmet>
        <title>Shop Trendy Clothes | GenZ Clothing</title>
        <meta
          name="description"
          content="Shop the latest fashion trends at the best prices. Discover high-quality clothes for men, women, and kids. Free shipping & easy returns on all orders!"
        />
        <meta
          name="keywords"
          content="online clothing store, trendy fashion, men's clothing, women's fashion, kids clothing, free shipping, best prices, shopping online"
        />
        <meta property="og:title" content="GenZ Clothing" />
        <meta
          property="og:description"
          content="Shop the latest fashion trends at the best prices. Discover high-quality clothes for men, women, and kids. Free shipping & easy returns on all orders!"
        />
        {/* <meta property="og:image" content="https://your-website.com/images/homepage-og-image.jpg" />
        <meta property="og:url" content="https://your-website.com/" /> */}
      </Helmet>
      <Categories />

      <h2>Popular Products</h2>
      <div className="home-products">
        <Productlist isHomePage={true} filters={{}} />
      </div>
    </div>
  );
};

export default Home;
