import { Avatar, Dropdown, Navbar } from "flowbite-react";
import img from "../../assets/user.jpg";
import { Authenticate } from "../../context/AouthContext";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { cartContext } from "../../context/cartContext";
import { wishListContext } from "../../context/WishListContext";
import { jwtDecode } from "jwt-decode";

const Navbars = () => {
  const { setToken, token, userName } = useContext(Authenticate);
  const navigate = useNavigate();
  const { numOfItem } = useContext(cartContext);
  const { numOfWishListItem } = useContext(wishListContext);
  let decoded;
  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/SignIn");
  };

  if (localStorage.getItem("token") !== null) {
    decoded = jwtDecode(localStorage.getItem("token"));
  }

  const navLinks = [
    { to: "/Home", label: "Home" },
    { to: "/Products", label: "Products" },
    { to: "/Categories", label: "Categories" },
    { to: "/Brands", label: "Brands" },
  ];

  return (
    <Navbar
      fluid
      className="bg-green-500 shadow-lg d-flex justify-between items-center fixed top-0 start-0 end-0 z-30"
    >
      <Link
        to="/Home"
        className="flex items-center space-x-1 rtl:space-x-reverse text-[calc(1.3rem+.6vw)] text-white"
      >
        <i className="fa-solid fa-cart-shopping"></i>
        <span className="self-center font-semibold whitespace-nowrap">
          Fresh Cart
        </span>
      </Link>
      {token ? (
        <>
          <div className="flex items-center space-x-4 md:order-2">
            <Link
              to="/WishList"
              className=" relative text-white hover:text-red-500"
            >
              <i className="fa-solid fa-heart"></i>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-4 -end-4 dark:border-orange-900">
                {numOfWishListItem}
              </div>
            </Link>
            <Link
              to="/Cart"
              className=" relative text-white hover:text-blue-500 "
            >
              <i className="fa-solid fa-shopping-cart"></i>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-4 -end-4 dark:border-orange-900">
                {numOfItem}
              </div>
            </Link>
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img={img} rounded />}
            >
              <Dropdown.Header>
                <span className="block truncate text-sm font-medium">
                  {decoded.name}
                </span>
              </Dropdown.Header>
              <Dropdown.Item><Link to="/AllOrder">All Orders</Link></Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center space-x-4 md:order-2">
            <Link to="/Register" className="text-white hover:text-orange-200">
              Register
            </Link>
            <Link to="/SignIn" className="text-white hover:text-orange-200">
              Sign-in
            </Link>
            <Navbar.Toggle />
          </div>
        </>
      )}
      <Navbar.Collapse>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block py-2 px-3 rounded md:p-0 ${
                isActive
                  ? "text-orange-500 bg-green-600 md:bg-transparent md:text-orange-500"
                  : "text-white hover:bg-green-600 md:hover:bg-transparent md:hover:text-orange-500"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbars;
