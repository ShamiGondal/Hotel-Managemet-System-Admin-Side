import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import robotPng from "../../assets/robot.png";
import Reservations from "../Admin/CustomerReservations";
import Complaints from "../Admin/Complaints";
import Feedbacks from "../Admin/CustomerFeedbacks";
import { Button } from "@mui/material";
import { useDarkMode } from "../Hooks/DarkModeContext";
import Cookies from "js-cookie";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Order from "./CustomerOrders";
import CustomerDetails from "./CustomerDetails";
import CustomerPayments from "./CustomerPayments";
import Fooditems from "./FoodItems";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode, isDrawerDarkMode, setIsDrawerDarkMode } =
    useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [pendingReservationsCount, setPendingReservationsCount] = useState(0);
  const [unresolvedComplaintsCount, setUnresolvedComplaintsCount] = useState(0);
  const apiUri = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    setIsDrawerDarkMode(isDarkMode);
  }, [isDarkMode, setIsDrawerDarkMode]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch pending orders count
      const ordersResponse = await fetch(
        `${apiUri}api/pendingOrders`
      );
      const ordersData = await ordersResponse.json();
      setPendingOrdersCount(
        ordersData.pendingReservationsResult[0].PendingOrders
      );

      // Fetch pending reservations count
      const reservationsResponse = await fetch(
        `${apiUri}api/pendingReservation`
      );
      const reservationsData = await reservationsResponse.json();
      setPendingReservationsCount(
        reservationsData.pendingReservationsQuery[0].PendingReservations
      );

      // Fetch unresolved complaints count
      const complaintsResponse = await fetch(
        `${apiUri}api/unresolvedComplaints`
      );
      const complaintsData = await complaintsResponse.json();
      setUnresolvedComplaintsCount(
        complaintsData.unresolvedComplaintsResult[0].UnresolvedComplaints
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  const fetchUnresolveComplaintsCount = async () => {
    try {
      // Fetch the count of pending reservations from the API
      // Update the pendingReservationsCount state variable
      const response = await fetch(
        `${apiUri}api/unresolvedComplaints`
      );
      const data = await response.json();
      setPendingOrdersCount(data.unresolvedComplaintsResult[0].PendingOrders);
    } catch (error) {
      console.error("Error fetching pending reservations count:", error);
      toast.error("Failed to fetch pending reservations count");
    }
  };
  const handleMenuItemClick = (menuItem) => {
    setDrawerOpen(false); // Close the drawer after selecting an item
    // Navigate to the corresponding URL
    navigate(`/${menuItem.replace(" ", "-")}`);
    // For the Login menu item, set the selected menu item to null to prevent duplicate rendering
    if (menuItem === "Login") {
      setSelectedMenuItem(null);
    } else {
      setSelectedMenuItem(menuItem);
    }
  };

  const fetchPendingOrdersCount = async () => {
    try {
      // Fetch the count of pending reservations from the API
      // Update the pendingReservationsCount state variable
      const response = await fetch(`${apiUri}api/pendingOrders`);
      const data = await response.json();
      setPendingOrdersCount(data.pendingReservationsResult[0].PendingOrders);
    } catch (error) {
      console.error("Error fetching pending reservations count:", error);
      toast.error("Failed to fetch pending reservations count");
    }
  };

  const fetchPendingReservationsCount = async () => {
    try {
      // Fetch the count of pending reservations from the API
      // Update the pendingReservationsCount state variable
      const response = await fetch(
        `${apiUri}api/pendingReservation`
      );
      const data = await response.json();
      setPendingReservationsCount(
        data.pendingReservationsQuery[0].PendingOrders
      );
    } catch (error) {
      console.error("Error fetching pending reservations count:", error);
      toast.error("Failed to fetch pending reservations count");
    }
  };

  const handleSignOut = () => {
    Cookies.remove("token"); // Remove token from cookies
    setIsLoggedIn(false); // Update login status
    navigate("./Admin-Login"); // Redirect to home page
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  if (isDrawerDarkMode) {
    document.body.style.backgroundColor = "black";
  } else {
    document.body.style.backgroundColor = "white";
  }

  return (
    <>
      <ToastContainer />
      <nav
        className={`navbar navbar-expand-lg  fixed-top bg-${
          isDarkMode ? "dark" : "light"
        }  food-items-container ${isDarkMode ? "dark-mode" : ""} `}
      >
        <div className={`container-fluid `}>
          <div className="navbar-brand d-flex gap-4">
            <Button onClick={toggleDrawer}>
              <i className="fa-solid fa-bars fw-bolder text-danger fs-4 "></i>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container-fluid" style={{ marginTop: "70px" }}>
        {" "}
        {/* Adjust the margin-top to match the height of the navbar */}
        <Drawer
          open={drawerOpen}
          onClose={toggleDrawer}
          anchor="left"
          sx={{
            "& .MuiDrawer-paper": {
              overflowX: "hidden",
              overflowY: "hidden",
            },
          }}
        >
          <div style={{ width: 250, marginTop: 40 }}>
            <IconButton
              edge="end"
              onClick={toggleDrawer}
              sx={{ position: "absolute", top: 0, right: 10 }}
            >
              <CloseIcon />
            </IconButton>
            {}
            <MenuItem onClick={() => handleMenuItemClick("Customer-Orders")}>
              Orders ({pendingOrdersCount})
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Customer-Reservations")}
            >
              Reservations ({pendingReservationsCount})
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("Customer-Details")}>
              Customers
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("Customer-Payments")}>
              Payments
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("Customer-Feedbacks")}>
              FeedBacks
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("FoodItems")}>
              FoodItem
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Customer-Complaints")}
            >
              Complaints ({unresolvedComplaintsCount})
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("Customer-Feedbacks")}>
              Feedbacks
            </MenuItem>
          </div>

          <footer
            style={{
              position: "absolute",
              bottom: 70,
              left: 0,
              width: "100%",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 16px",
              }}
            >
              <Button
                onClick={handleMenuOpen}
                style={{
                  cursor: "pointer",
                  marginRight: "8px",
                  marginBottom: -60,
                  position: "absolute",
                  right: 0,
                  borderRadius: 50,
                  border: `1px solid #e0e0e0`,
                }}
              >
                <img
                  src={robotPng}
                  alt="Footer Logo"
                  style={{ height: "50px", width: "50px" }}
                />
              </Button>
              {/* Dropdown menu */}
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    width: "200px",
                    marginTop: "-80px",
                  },
                }}
              >
                {/* <MenuItem onClick={() => handleMenuItemClick('Admin-Settings')}>Settings</MenuItem> */}
                <hr className="bg-dark" />
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          </footer>
        </Drawer>
        {/* Other components */}
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
