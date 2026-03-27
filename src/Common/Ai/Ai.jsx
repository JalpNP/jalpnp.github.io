import React, { useContext, useEffect, useState } from "react";
import "../../Components/Products/Products.scss";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import MyContext from "../../Common/Context/MyContext";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { MdClose } from "react-icons/md";
import { useParams, useLocation } from "react-router-dom";
import { ChevronsRight } from "lucide-react";
import Productlist from "../../Components/Products/Productlist";

const Ai = () => {
  const { shortname, setShortname, data } = useContext(MyContext);
  const { title } = useParams();
  const { state } = useLocation();
  const similarImages = state?.similarImages || [];

  const [filOpen, setFilOpen] = useState(false);
  const [shortproOpen, setShortproOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(title);

  useEffect(() => {
    setSelectedCategory(title);
  }, [title]);

  const opnfilter = () => {
    setFilOpen(true);
    document.querySelector("body").style.overflow = "hidden";
  };
  const clsfilter = () => {
    setFilOpen(false);
    document.querySelector("body").style.overflow = "auto";
  };

  const openshortpro = () => {
    setShortproOpen(true);
    document.querySelector("body").style.overflow = "hidden";
  };
  const closeshortpro = () => {
    setShortproOpen(false);
    document.querySelector("body").style.overflow = "auto";
  };

  const handleMaxPriceChange = (event, newValue) => setMaxPrice(newValue);

  const handleSizeSelection = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const applyFilters = () => {
    setFilters({ maxPrice, selectedSizes });
    clsfilter();
  };

  return (
    <>
      {similarImages.length > 0 && (
        <div className="results" style={{ marginTop: "2rem" }}>
          <h2>AI Detected Similar Images</h2>
          <div
            className="image-grid"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {similarImages.map((img, idx) => (
              <img
                key={idx}
                // src={`http://localhost:3034/uploads/${img}`}
                // src={`https://genzback.onrender.com/uploads/${img}`}

                src={`https://gen-z-back.vercel.app/uploads/${img}`}
                alt="similar"
                style={{ width: "150px", margin: "10px", borderRadius: "8px" }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="container2">
        <div className="header">
          <div className="filters">
            <h3 className="small" onClick={opnfilter}>
              FILTERS <span>&#8651;</span>
            </h3>
            <h3 className="big">FILTERS</h3>

            <div className="sel-last">
              <button className="select1">
                {" "}
                Sort by : <b>{shortname}</b>{" "}
              </button>
              <h3 onClick={openshortpro} className="select12">
                {" "}
                Sort by :
              </h3>
              <div className="shortnames">
                <li
                  className="account-division"
                  onClick={() => setShortname("High to low")}
                >
                  High to low
                </li>
                <li
                  className="account-division"
                  onClick={() => setShortname("Low to High")}
                >
                  Low to High
                </li>
                <li
                  className="account-division"
                  onClick={() => setShortname("Popular")}
                >
                  Popular
                </li>
              </div>
            </div>
          </div>
        </div>

        <div className="nav">
          <span className="btsp">
            <button className="fil-apply" onClick={applyFilters}>
              Apply Filter
            </button>{" "}
          </span>
          <div className="box box2">
            <h3>PRICE</h3>
            <Box sx={{ width: 150 }}>
              <Slider
                size="small"
                value={maxPrice}
                min={0}
                max={5000}
                aria-label="Set Max Value"
                valueLabelDisplay="auto"
                onChange={handleMaxPriceChange}
              />
            </Box>
            <p>₹0 - ₹5000 </p>
          </div>
          <div className="box box2">
            <h3>CATEGORIES</h3>
            <ul>
              {data.map((i) => (
                <li key={i.id}>
                  <input
                    type="checkbox"
                    id={i.product_category_route}
                    checked={i.product_category_route === selectedCategory}
                    disabled
                  />
                  <label htmlFor={i.product_category_route}>
                    {i.product_category}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="box box2">
            <h3>Size</h3>
            <ul>
              {["S", "M", "L", "XL"].map((size) => (
                <li key={size}>
                  <input
                    type="checkbox"
                    id={size}
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeSelection(size)}
                  />
                  <label htmlFor={size}>{size}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="main12">
          <Productlist title={"t-shirt"} filters={filters} />
        </div>
      </div>

      {/* FILTER DRAWER */}
      <Drawer
        open={filOpen}
        onClose={clsfilter}
        direction="bottom"
        className="fil-drawer"
        size={"100%"}
      >
        <div className="nav nav2">
          <div className="h2close">
            <h2>
              Filters{" "}
              <button onClick={applyFilters} className="fil-apply">
                Apply Filter
              </button>
            </h2>
            <MdClose className="mdc" onClick={clsfilter} size={24} />
          </div>
          {/* ... same filter content ... */}
        </div>
      </Drawer>

      {/* SORTING DRAWER */}
      <Drawer
        open={shortproOpen}
        onClose={closeshortpro}
        direction="bottom"
        className="shortpro"
        size={"100%"}
      >
        <div className="shortnames">
          <MdClose className="mds" onClick={closeshortpro} size={24} />
          <h2>Sort by</h2>
          <li
            className="account-division"
            onClick={() => {
              setShortname("High to low");
              closeshortpro();
            }}
          >
            High to low <ChevronsRight size={20} strokeWidth={1.5} />
          </li>
          <li
            className="account-division"
            onClick={() => {
              setShortname("Low to High");
              closeshortpro();
            }}
          >
            Low to High <ChevronsRight size={20} strokeWidth={1.5} />
          </li>
          <li
            className="account-division"
            onClick={() => {
              setShortname("Popular");
              closeshortpro();
            }}
          >
            Popular <ChevronsRight size={20} strokeWidth={1.5} />
          </li>
        </div>
      </Drawer>
    </>
  );
};

export default Ai;
