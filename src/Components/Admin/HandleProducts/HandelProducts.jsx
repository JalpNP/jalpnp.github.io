import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./HandleProduct.scss";

const ProductList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await axios.get("http://localhost:3034/api");
        // const response = await axios.get("https://genzback.onrender.com/api");
        const response = await axios.get("  https://gen-z-back.vercel.app/api");

        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (categoryId, productId) => {
    try {
      const response = await axios.post(
        // "https://genzback.onrender.com/api/products/delete",
        "https://gen-z-back.vercel.app/api/products/delete",
        { categoryId, productId },
      );
      if (response.data.success) {
        alert("Product deleted successfully");
        setCategories((prevCategories) =>
          prevCategories.map((category) => ({
            ...category,
            product_container: category.product_container.filter(
              (product) => product.id !== productId,
            ),
          })),
        );
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Form validation schema including additional fields
  const validationSchema = Yup.object().shape({
    file: Yup.mixed().required("File is required"),
    product_name: Yup.string().required("Name is required"),
    product_route: Yup.string().required("Product route is required"),
    product_price: Yup.string().required("Price is required"),
    product_price_deleted: Yup.string().required("Previous price is required"),
    stock_info: Yup.string().required("Stock info is required"),
    product_description: Yup.string().required("Description is required"),
    rating: Yup.number().required("Rating is required"),
    count: Yup.number().required("Count is required"),
    size_main: Yup.string().required("Sizes are required"),
    // side_img is now uploaded as file so not validated here as text
  });

  // Formik setup for adding a product
  const formik = useFormik({
    initialValues: {
      file: null,
      product_name: "",
      product_route: "",
      product_price: "",
      product_price_deleted: "",
      stock_info: "",
      product_description: "",
      rating: "",
      count: "",
      size_main: "", // Comma separated sizes, e.g. "S,M,L"
      side_img_file: null, // Side image file input
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!selectedCategoryId) {
        alert("Please select a category before adding a product.");
        return;
      }
      const formData = new FormData();
      formData.append("categoryId", selectedCategoryId);
      if (values.file) formData.append("file", values.file);
      if (values.side_img_file)
        formData.append("side_img_file", values.side_img_file);
      formData.append("product_name", values.product_name);
      formData.append("product_route", values.product_route);
      formData.append("product_price", values.product_price);
      formData.append("product_price_deleted", values.product_price_deleted);
      formData.append("stock_info", values.stock_info);
      formData.append("product_description", values.product_description);
      formData.append("rating", values.rating);
      formData.append("count", values.count);
      formData.append("size_main", values.size_main);

      try {
        const response = await axios.post(
          // "https://genzback.onrender.com/api/product-add",
          "https://gen-z-back.vercel.app/api/product-add",

          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        if (response.data.success) {
          alert("Product added successfully");
          resetForm();
          window.location.reload();
        } else {
          alert("Failed to add product");
        }
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
  });

  // Auto-generate product_route when product_name changes
  const handleProductNameChange = (e) => {
    const nameValue = e.target.value;
    formik.setFieldValue("product_name", nameValue);
    if (
      !formik.values.product_route ||
      formik.values.product_route.trim() === ""
    ) {
      const route = nameValue.trim().toLowerCase().replace(/\s+/g, "-");
      formik.setFieldValue("product_route", route);
    }
  };

  return (
    <div className="product-list">
      <h1>Product Categories</h1>
      {/* Add product form */}
      <div className="add-product-form">
        <h4>Add Products</h4>
        <form onSubmit={formik.handleSubmit}>
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.product_category}
              </option>
            ))}
          </select>
          <div className="image-add-container">
            <input
              type="file"
              name="file"
              onChange={(event) =>
                formik.setFieldValue("file", event.currentTarget.files[0])
              }
            />
          </div>
          <input
            type="text"
            id="product_name"
            placeholder="Product Name"
            name="product_name"
            value={formik.values.product_name}
            onChange={handleProductNameChange}
          />
          <input
            type="text"
            placeholder="Product Route"
            name="product_route"
            value={formik.values.product_route}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            placeholder="₹Product Price"
            name="product_price"
            value={formik.values.product_price}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            placeholder="₹Previous Price"
            name="product_price_deleted"
            value={formik.values.product_price_deleted}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            placeholder="Stock Info (In Stock / Out of Stock)"
            name="stock_info"
            value={formik.values.stock_info}
            onChange={formik.handleChange}
          />
          <textarea
            placeholder="Product Description"
            name="product_description"
            value={formik.values.product_description}
            onChange={formik.handleChange}
          />
          <input
            type="number"
            placeholder="Rating (e.g., 4.5)"
            name="rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
          />
          <input
            type="number"
            placeholder="Count (number of reviews)"
            name="count"
            value={formik.values.count}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            placeholder="Available Sizes (comma separated, e.g., S,M,L)"
            name="size_main"
            value={formik.values.size_main}
            onChange={formik.handleChange}
          />
          <div className="image-add-container">
            <label htmlFor="side_img_file">Upload Side Images (max 5)</label>
            <input
              type="file"
              name="side_img_file"
              id="side_img_file"
              onChange={(event) =>
                formik.setFieldValue(
                  "side_img_file",
                  event.currentTarget.files[0],
                )
              }
            />
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>
      {categories.map((category) => (
        <div key={category.id} className="category">
          <h2>{category.product_category}</h2>
          <img
            src={category.category_img}
            alt={category.product_category}
            className="category-img"
          />

          {/* Display all products with full details */}
          <div className="products-container">
            {category.product_container.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.product_img}
                  alt={product.product_name}
                  className="primary-image"
                />
                <h3>{product.product_name}</h3>
                <p>
                  <strong>Route:</strong> {product.product_route}
                </p>
                <p>
                  <strong>Price:</strong> ₹{product.product_price}
                </p>
                <p className="discounted-price">
                  <strong>Previous Price:</strong> ₹
                  {product.product_price_deleted}
                </p>
                <p>
                  <strong>Rating:</strong> {product.rating} ({product.count}{" "}
                  reviews)
                </p>
                <p>
                  <strong>Stock:</strong>{" "}
                  {product.stock ? "In Stock" : "Out of Stock"}
                </p>
                <p>
                  <strong>Description:</strong> {product.product_description}
                </p>
                {product.side_img && product.side_img.length > 0 && (
                  <div className="side-images">
                    <p>
                      <strong>Side Images:</strong>
                    </p>
                    {product.side_img.map((img) => (
                      <img
                        key={img.id}
                        src={img.img}
                        alt={`${product.product_name} side ${img.id}`}
                        className="side-image"
                      />
                    ))}
                  </div>
                )}
                {product.size_main && product.size_main.length > 0 && (
                  <div className="sizes">
                    <p>
                      <strong>Available Sizes:</strong>
                    </p>
                    {product.size_main.map((size) => (
                      <span key={size.id} className="size">
                        {size.size}
                      </span>
                    ))}
                  </div>
                )}
                <button onClick={() => handleDelete(category.id, product.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
