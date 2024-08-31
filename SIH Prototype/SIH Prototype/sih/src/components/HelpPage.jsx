import React from "react";
import { useNavigate } from "react-router-dom";
import cardImage1 from "../assets/cardImage1.png"; // Replace with your images
import cardImage2 from "../assets/cardImage2.png";
import cardImage3 from "../assets/cardImage3.png";
import cardImage4 from "../assets/cardImage4.png";
import "../components/HelpPage.css";

const HelpPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    // Handle card click events
    console.log(`Card ${id} clicked`);
    // You can add navigation or other logic here if needed
  };

  return (
    <div className="help-page-container">
      <div className="cards-container">
        <div className="card" onClick={() => handleCardClick(1)}>
          <img src={cardImage1} alt="Card 1" />
        </div>
        <div className="card" onClick={() => handleCardClick(2)}>
          <img src={cardImage2} alt="Card 2" />
        </div>
        <div className="card" onClick={() => handleCardClick(3)}>
          <img src={cardImage3} alt="Card 3" />
        </div>
        <div className="card" onClick={() => handleCardClick(4)}>
          <img src={cardImage4} alt="Card 4" />
        </div>
      </div>
      <button className="back-to-home" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default HelpPage;
