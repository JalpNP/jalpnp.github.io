import axios from "axios";
import MyContext from "./MyContext";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MyContextProvider = ({ children }) => {
  // header scrolling effect (for header) start
  const [scrolled, setScrolled] = useState(false);
  const HandleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", HandleScroll);
  }, []);
  // header scrolling effect (for header) end

  // loaader start
  const [mainloader, setMainloader] = useState(false);
  // loader end

  // message for alert start
  const [message, setMessage] = useState("");
  // message for alert end

  //proflie show hide in header
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  //end

  // shippingaddress form show or not start
  const [edit, setEdit] = useState(false);

  const openshipformModal = () => {
    setEdit(true);
    document.querySelector("body").style.overflow = "hidden";
  };
  const closeshipformModal = () => {
    setEdit(false);
    document.querySelector("body").style.overflow = "auto";
  };
  //end

  //for radio button to select address for delivery
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
  };
  //end

  //editaddress form open & close start
  const [editform, setEditform] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleEditAddress = (address) => {
    setSelectedAddress(address); // Set the selected address for edit that address
    setEditform(true); // Open the edit address forms
    document.querySelector("body").style.overflow = "hidden";
  };
  const closehandleEditAddress = () => {
    setSelectedAddress(null); // Set the selected address for edit that address
    setEditform(false); // Open the edit address forms
    document.querySelector("body").style.overflow = "auto";
  };

  //  open alert start
  const [open, setOpen] = useState(false);
  //  open alert end

  // search iput state
  const [input, setInput] = useState("");

  //forgot open close
  const [forgot, setForgot] = useState(false);
  const openforgot = () => {
    setForgot(true);
    document.querySelector("body").style.overflow = "hidden";
  };
  const closeforgot = () => {
    setForgot(false);
    document.querySelector("body").style.overflow = "auto";
  };

  //location
  const location = useLocation();

  const [data, setData] = useState([]);
  // fetch data from api start

  //navigation state start
  const Navigate = useNavigate();
  //navigation state end

  // for instaopen(newslater) start
  const handleInsta = () => {
    window.open("https://www.instagram.com");
  };
  // for insta open(newslater) end

  // for youtube open(newslater) start
  const handleYoutube = () => {
    window.open("https://www.youtube.com/");
  };
  // for youtube open(newslater) end

  // const url = "http://localhost:3034";
  // const url = "https://genzback.onrender.com";
  const url = "https://gen-z-back.vercel.app";
  //

  const [passModalOpen, setPassModalOpen] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/api`);
        setData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    fetchData();
  }, [url, data]);

  // fetch data fron api end

  // for search bar empty when user click outside it
  const searchBarRef = useRef(null);

  // useEffect hook to handle click outside of search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setInput(""); // Set input value to null on outside click
        const searchBox = document.querySelector(".search-box");

        if (searchBox) {
          searchBox.value = "";
        }
      }
    };

    // Add event listener on component mount
    document.addEventListener("click", handleClickOutside);

    // Clean up event listener on component unmount
    return () => document.removeEventListener("click", handleClickOutside);
  }, [searchBarRef]);

  const searchBarRef2 = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef2.current &&
        !searchBarRef2.current.contains(event.target)
      ) {
        setInput(""); // Set input value to null on outside click
        const searchBox2 = document.querySelector(".search-box2");

        if (searchBox2) {
          searchBox2.value = "";
        }
      }
    };

    // Add event listener on component mount
    document.addEventListener("click", handleClickOutside);

    // Clean up event listener on component unmount
    return () => document.removeEventListener("click", handleClickOutside);
  }, [searchBarRef2]);

  //end

  // for saving token state start
  const [token, setToken] = useState(() => {
    const storetoken = localStorage.getItem("token");
    return storetoken ? storetoken : "";
  });

  const [userdata, setUserdata] = useState(() => {
    const storeUser = localStorage.getItem("userdata");
    if (storeUser) {
      try {
        return JSON.parse(storeUser);
      } catch (e) {
        console.error(`Error parsing userdata from localStorage:`, e);
        localStorage.removeItem("userdata");
        return null;
      }
    }
    return null;
  });

  // for shipping data save state start
  const [shipping, setShipping] = useState(() => {
    const storedShipping = localStorage.getItem("shipping");
    return storedShipping ? JSON.parse(storedShipping) : [];
  });

  // for shipping data save state end

  // for order list  start
  const [order, setOrder] = useState(() => {
    const savedorder = localStorage.getItem("order");
    return savedorder ? JSON.parse(savedorder) : [];
  });
  // for order list  end

  // handle login start
  const handleLogin = (data) => {
    localStorage.setItem("token", data.data);
    localStorage.setItem("userdata", JSON.stringify(data.accountInfo));
    localStorage.setItem("cart", JSON.stringify(data.cartInfo));
    localStorage.setItem("wish", JSON.stringify(data.wishInfo));
    localStorage.setItem("shipping", JSON.stringify(data.shippingInfo));
    localStorage.setItem("order", JSON.stringify(data.orderInfo));
    setWish(data.wishInfo);
    setUserdata(data.accountInfo);
    setToken(data.data);
    setCartItems(data.cartInfo);
    setOrder(data.orderInfo);
    setShipping(data.shippingInfo);
  };
  // handle login end

  // handle logout start
  const handleLogout = () => {
    Navigate("/");

    localStorage.removeItem("token");
    localStorage.removeItem("userdata");
    localStorage.removeItem("cart");
    localStorage.removeItem("wish");
    localStorage.removeItem("shipping");
    localStorage.removeItem("order");
    setToken("");
    setUserdata(null);
    setCartItems([]);
    setWish([]);
    setOrder([]);
    setShipping([]);
    window.location.reload();
    closelModal();
  };

  //search image
  const [uploadedImage, setUploadedImage] = useState(null);

  // handle logout end
  // logout modalopen state starts
  const [lmodal, setLmodal] = useState(false);

  const openlModal = () => {
    setLmodal(true);
  };

  const closelModal = () => {
    setLmodal(false);
  };

  // logout modalopen  state ends

  //product shorting
  const [shortname, setShortname] = useState("Popular");
  //product shorting end

  // for review count start
  const formatReviewCount = (count) => {
    if (count && count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count || null;
  };
  // for review count end

  // showwishsize state
  const [showwishsize, setShowwishsize] = useState(false);

  // for size select error state start
  const [selectSize, setSelectSize] = useState(false);
  // for size select error state over

  // for size save  state start
  const [size, setSize] = useState("");
  // for size save  state over

  // for size button click start
  const handleSize = (size) => {
    setSize(size);
    setSelectSize(false);
  };
  // for size button click end

  //size chart open&close start
  const [isModalsize, setIsModalsize] = useState(false);

  const opensizeModal = () => {
    setIsModalsize(true);
    document.querySelector("body").style.overflow = "hidden";
  };

  const closesizeModal = () => {
    setIsModalsize(false);
    document.querySelector("body").style.overflow = "auto";
  };

  //size chart open&close End

  // loading for cart button singleproduct state start
  const [loading, setLoading] = useState(false);
  // add to cart button singleproduct state process start

  // big zoom img in single product start
  const [overshow, setOvershow] = useState(false);
  // big zoom img in single product end

  // for image movement start
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  // for image movement end

  // for image movement save start
  const [saveimg, setSaveimg] = useState("");
  // for image movement save end

  // mouse over for single product start
  const handlebigover = () => {
    setSaveimg(document.getElementById("change").src);
    setOvershow(true);
  };
  // mouse over for single product end

  // for image movement start

  const handleMouseMove = (e) => {
    const zoomer = e.currentTarget;
    const offsetX = e.nativeEvent.offsetX;
    const offsetY = e.nativeEvent.offsetY;
    const width = zoomer.offsetWidth;
    const height = zoomer.offsetHeight;

    const x = (offsetX / width) * 100;
    const y = (offsetY / height) * 100;

    setCursorPosition({ x: x, y: y });
  };
  // for image movement end

  // for save caritems state start
  const [cartItems, setCartItems] = useState(() => {
    const saved1Cart = localStorage.getItem("cart");
    return saved1Cart ? JSON.parse(saved1Cart) : [];
  });
  // for save caritems state end

  // for add to cart button process start
  const handleCheckout = async (
    categoryid,
    productid,
    productimg,
    productname,
    productprice,
  ) => {
    try {
      if (!token) {
        setOpen(true);
        setMessage("please login first");
        setTimeout(() => {
          Navigate("/login");
        }, 2500);
        return;
      }

      if (!size) {
        setSelectSize(true);
        return;
      }
      setLoading(true);
      const { data } = await axios.post(
        `${url}/add-to-cart`,
        {
          categoryid,
          productid,
          size,
          productimg,
          productname,
          productprice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setOpen(true);
        setMessage(data.message);
        setCartItems(data.cartInfo);
        localStorage.setItem("cart", JSON.stringify(data.cartInfo));
        setSize("");
        setSelectedItemname("");
      } else {
        setOpen(true);
        setMessage(data.error);
        setSelectedItemname("");
      }
    } catch (error) {
      console.error(
        "Error during checkout:",
        error.response?.data?.error || error.message,
      );
    } finally {
      setLoading(false);
    }
  };
  //for add to cart button process end

  // get cartdata from api matching with database start
  const cartProductData =
    cartItems &&
    cartItems.map((cart) => {
      const category = data.find((category) => category.id === cart.categoryid);

      if (category && category.product_container) {
        const product = category.product_container.find(
          (product) => product.id === cart.productid,
        );

        if (product) {
          return { ...product, ...cart };
        }
      }

      return null;
    });
  // get cartdata from api matching with database end

  // total value start
  const TotalValue =
    cartItems &&
    cartItems.reduce((acc, item) => acc + item.productprice * item.quantity, 0);

  // remove product from cart start

  const removeProductFromCart = async (categoryid, productid, size) => {
    try {
      setMainloader(true);
      const { data } = await axios.post(
        `${url}/remove-from-cart`,
        { categoryid, productid, size },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        setCartItems(data.cartInfo);
        localStorage.setItem("cart", JSON.stringify(data.cartInfo));
      } else {
        setOpen(true);
        setMessage(data.error);
      }
    } catch (error) {
      console.error(
        "Error removing from cart:",
        error.response?.data?.error || error.message,
      );
      setMessage("An error occurred. Please try again.");
      setOpen(true);
    } finally {
      setMainloader(false);
    }
  };
  // remove product from cart end

  // for increase quantity in cart start
  const handleIncreaseQuantity = async (categoryid, productid, size) => {
    try {
      setMainloader(true);

      const { data } = await axios.post(
        `${url}/increase-quantity`,
        { categoryid, productid, size },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setCartItems(data.cartInfo);
        localStorage.setItem("cart", JSON.stringify(data.cartInfo));
      } else {
        setOpen(true);
        setMessage(data.error);
      }
    } catch (error) {
      console.error(
        "Error adding quantity in cart:",
        error.response?.data?.error || error.message,
      );
      setMessage("An error occurred. Please try again.");
      setOpen(true);
    } finally {
      setMainloader(false);
    }
  };

  // for increase quantity in cart end

  // for increase quantity in cart start
  const handleDecreaseQuantity = async (categoryid, productid, size) => {
    try {
      setMainloader(true);

      const { data } = await axios.post(
        `${url}/decrease-quantity`,
        { categoryid, productid, size },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        setCartItems(data.cartInfo);
        localStorage.setItem("cart", JSON.stringify(data.cartInfo));
      } else {
        setOpen(true);
        setMessage(data.error);
      }
    } catch (error) {
      console.error(
        "Error deleting quantity in cart:",
        error.response?.data?.error || error.message,
      );
      setMessage("An error occurred. Please try again.");
      setOpen(true);
    } finally {
      setMainloader(false);
    }
  };

  // for increase quantity in cart end

  //when user click on item in wishlist to go that item page
  const handleNavigate = (cid, pid) => {
    const category = data.find((item) => item.id === cid);

    if (!category) {
      console.error("Category not found");
      return;
    }

    const product = category.product_container.find((prod) => prod.id === pid);

    if (!product) {
      console.error("Product not found");
      return;
    }

    const product_category_route = category.product_category_route;
    const product_route = product.product_route;

    window.location.href = `/category/${product_category_route}/${product_route}`;
  };
  //end

  // for wish list  start
  const [wish, setWish] = useState(() => {
    const savedwish = localStorage.getItem("wish");
    return savedwish ? JSON.parse(savedwish) : [];
  });
  // for wish list  end

  // FOR ADD TO Wish PROCESS START
  const handlewish = async (
    categoryid,
    productid,
    productimg,
    productname,
    productprice,
  ) => {
    try {
      if (!token) {
        setOpen(true);
        setMessage("please login first");
        setTimeout(() => {
          Navigate("/login");
        }, 2500);
        return;
      }

      setMainloader(true);
      const { data } = await axios.post(
        `${url}/add-to-wish`,
        { categoryid, productid, productimg, productname, productprice },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setOpen(true);
        setMessage(data.message);
        setWish(data.wishInfo);
        localStorage.setItem("wish", JSON.stringify(data.wishInfo));
      } else {
        setOpen(true);
        setMessage(data.error);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || error.message);
      setOpen(true);
    } finally {
      setMainloader(false);
    }
  };

  // FOR ADD TO Wish PROCESS end

  // remove product from cart start

  const removeProductFromWish = async (categoryid, productid) => {
    try {
      setMainloader(true);
      const { data } = await axios.post(
        `${url}/remove-from-wish`,
        { categoryid, productid },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        localStorage.setItem("wish", JSON.stringify(data.wishInfo));
        setWish(data.wishInfo);
      } else {
        setMessage(data.error);
        setOpen(true);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || error.message);
      setOpen(true);
    } finally {
      setMainloader(false);
    }
  };
  // remove product from cart end

  // which item move to cart show the size

  const [selectedItemname, setSelectedItemname] = useState("");
  // end

  //start  mobile drawer for select size
  const [dopen, setDopen] = useState(false);

  const handled = (itname) => {
    setDopen(true);
    setSelectSize(true);
    setSelectedItemname(itname);
  };
  const handledoff = () => {
    setDopen(false);
    setSelectSize(false);
    setSize("");
    setSelectedItemname("");
  };

  // end

  // star move to cart item from wishlist

  const move2cart = async (categoryid, productid) => {
    try {
      setMainloader(true);
      if (!size) {
        setShowwishsize(true);
        setSelectSize(true);
        return;
      }
      const { data } = await axios.post(
        `${url}/move2cart`,
        {
          categoryid,
          productid,
          size,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setOpen(true);
        setMessage(data.message);
        setCartItems(data.cartInfo);
        localStorage.setItem("cart", JSON.stringify(data.cartInfo));
        localStorage.setItem("wish", JSON.stringify(data.wishInfo));
        setWish(data.wishInfo);
        setSize("");
        setSelectedItemname("");
        setDopen(false);
      } else {
        setOpen(true);
        setMessage(data.error);
        setSize("");
        setSelectedItemname("");
        setDopen(false);
      }
    } catch (error) {
      console.error("Error moving item to cart:", error);
    } finally {
      setMainloader(false);
    }
  };

  //end move to cart from wishlist

  //confirmation page start
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${url}/add-to-order`,
        { orderDate: new Date(), addressId: selectedAddressId },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setMessage(data.message);
        localStorage.setItem("cart", JSON.stringify(data.cartInfo));
        localStorage.setItem("order", JSON.stringify(data.orderInfo));
        setCartItems(data.cartInfo);
        setOrder(data.orderInfo);
        setOpen(true);
      } else {
        setMessage(data.error);
        setOpen(true);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || error.message);
      setOpen(true);
    } finally {
      setMainloader(false);
    }
  };
  //end

  // trackorder state start
  const [selectedOrder, setSelectedOrder] = useState(() => {
    const storedselctedorder = localStorage.getItem("selectedorderitem");
    return storedselctedorder ? JSON.parse(storedselctedorder) : null;
  });

  //track order state end

  //Reorder item from order details start
  const handleReorder = async (reord) => {
    try {
      if (!token) {
        setOpen(true);
        setMessage("please login first");
        setTimeout(() => {
          Navigate("/login");
        }, 2500);
        return;
      }
      setSize(size);
      setMainloader(true);
      const { data } = await axios.post(
        `${url}/add-to-reorder`,
        {
          orderDate: new Date(),
          categoryid: reord.categoryid,
          productid: reord.productid,
          productimg: reord.productimg,
          productname: reord.productname,
          productprice: reord.productprice,
          size: reord.size,
          quantity: reord.quantity,
          deliveryaddressid: selectedAddressId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setMessage(data.message);
        localStorage.setItem("order", JSON.stringify(data.orderInfo));
        setOrder(data.orderInfo);
        setOpen(true);
      } else {
        setMessage(data.error);
        setOpen(true);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || error.message);
      setOpen(true);
    } finally {
      setMainloader(false);
    }
  };
  //Reorder End

  return (
    <MyContext.Provider
      value={{
        uploadedImage,
        setUploadedImage,
        passModalOpen,
        setPassModalOpen,
        isProfileHovered,
        setIsProfileHovered,
        handleReorder,
        isModalsize,
        closesizeModal,
        opensizeModal,
        location,
        dopen,
        searchBarRef,
        searchBarRef2,
        setDopen,
        handledoff,
        handled,
        selectedItemname,
        setSelectedItemname,
        closeshipformModal,
        openshipformModal,
        edit,
        setEdit,
        shipping,
        setShipping,
        scrolled,
        data,
        input,
        cartItems,
        setCartItems,
        setInput,
        forgot,
        closeforgot,
        openforgot,
        Navigate,
        mainloader,
        setMainloader,
        message,
        setMessage,
        open,
        setOpen,
        url,
        handleInsta,
        handleYoutube,
        handleLogin,
        token,
        userdata,
        lmodal,
        setLmodal,
        handleLogout,
        closelModal,
        openlModal,
        setUserdata,
        setToken,
        shortname,
        setShortname,
        selectSize,
        setSelectSize,
        size,
        setSize,
        handleSize,
        handleMouseMove,
        handlebigover,
        overshow,
        setOvershow,
        cursorPosition,
        setCursorPosition,
        saveimg,
        setSaveimg,
        loading,
        setLoading,
        formatReviewCount,
        removeProductFromCart,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        TotalValue,
        handleCheckout,
        cartProductData,
        handleNavigate,
        removeProductFromWish,
        handlewish,
        wish,
        setWish,
        move2cart,
        showwishsize,
        handleSelectAddress,
        selectedAddressId,
        setSelectedAddressId,
        closehandleEditAddress,
        handleEditAddress,
        editform,
        selectedAddress,
        order,
        setOrder,
        handleSubmit,
        selectedOrder,
        setSelectedOrder,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
