import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaEnvelope, FaHandsHelping, FaSignOutAlt } from "react-icons/fa"; // Import logout and email icons
import { MdViewSidebar } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import "../components/HomePage.css";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    // Retrieve email from session storage when the component mounts
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("email"); // Clear email from session storage
    console.log("Logged out");
    navigate("/login"); // Redirect to login page after logout
  };

  const navigateToHelp = () => {
    navigate("/help"); // Navigate to the help page
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
  };

  const slides = [
    { id: 1, image: img1, text: "Saftey is number one prority!" },
    { id: 2, image: img2, text: "Empower, Protect, Support!" },
    { id: 3, image: img3, text: "Stand Together for Safety!" },
    { id: 4, image: img4, text: "Stand Together for Safety!" },
  ];

  return (
    <div className="homepage-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <MdViewSidebar
            className="sider-icon"
            size={40}
            onClick={toggleSidebar}
          />
          </div>
          <h1>Women's Safety Website</h1>
        <div className="navbar-profile">
          <div className="help-container" onClick={navigateToHelp}>
            <FaHandsHelping className="help-icon" size={30} />
            <span className="help-text">Help</span>
          </div>
          <CgProfile
            className="profile-icon"
            size={40}
            onClick={toggleProfileMenu}
          />
          {isProfileMenuOpen && (
            <div className="profile-dropdown">
              {email && (
                <div className="email-display">
                  <FaEnvelope /> {email}
                </div>
              )}
              <button onClick={handleLogout} className="logout-button">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="sidebar-close" onClick={toggleSidebar}>
          &times;
        </button>
        <div className="sidebar-content">
          <h2>Sidebar</h2>
          <ul>
            <li>
              <Link to="/gesture" className="sidebar-text">
                SOS Gesture
              </Link>
            </li>
            <li>
              <Link to="/alerts" className="sidebar-text">
                SOS Alerts
              </Link>
            </li>
            <li>
              <Link to="/genderDistribution" className="sidebar-text">
                Gender Distribution
              </Link>
            </li>
            <li>
              <Link to="/req" className="sidebar-text">
                Hotspot Request
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="slider-container">
        <Slider {...sliderSettings}>
          {slides.map((slide) => (
            <div key={slide.id} className="slide">
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
              />
              <div className="slide-overlay">
                <div className="slide-text">
                  <h2>{slide.text}</h2>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomePage;
