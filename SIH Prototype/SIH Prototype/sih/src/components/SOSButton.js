import emailjs from "emailjs-com";
import React from "react";

const SOSButton = () => { // not working needs debuging and fixing
  const defaultEmail = "subramaniyamjsp@gmail.com";

  const handleSOSClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const templateParams = {
          to_email: defaultEmail, // Use the default email address
          from_name: "User Name", // Optionally, replace with a dynamic user name
          location_link: `https://maps.google.com/?q=${latitude},${longitude}`,
        };

        emailjs
          .send(
            "service_i2anm7p",
            "template_b96xctg",
            templateParams,
            "1P4WSH82IkoZhDYpJ"
          )
          .then(
            (response) => {
              console.log(
                "SOS alert sent successfully!",
                response.status,
                response.text
              );
            },
            (error) => {
              console.error("Failed to send SOS alert:", error);
            }
          );
      },
      (error) => {
        console.error("Error fetching location: ", error);
      },
      {
        enableHighAccuracy: true, // Request high accuracy
      }
    );
  };

  return (
    <div
      style={{
        background:
          'url("https://img.freepik.com/free-vector/warning-alert-dark-background-protection-attention_1017-50558.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // or you can use 'contain' depending on your needs
        height: "920px", // Set the height here
        width: "2040px", // Set the width here
        color: "white",
      }}
    >
      <p
        style={{
          fontSize: "50px",
          margin: "0",
          paddingTop: "20px",
          paddingLeft: "250px",
          color: "white",
          textShadow: "200px 200px 40x0px black", // Optional: Adds a shadow to enhance contrast
          fontFamily: "monospace",
          fontWeight: "bolder",
        }}
      >
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        Click Here in Case of Emergency to Share Your Location
      </p>

      <button
        onClick={handleSOSClick}
        style={{
          marginLeft: "850px",
          marginTop: "50px",
          padding: "150px",
          borderRadius: "550px",
          background:
            'url("https://previews.123rf.com/images/valentint/valentint1604/valentint160402850/55165774-sos-icon-internet-button-on-red-background.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "300px",
        }}
      ></button>
    </div>
  );
};

export default SOSButton;
