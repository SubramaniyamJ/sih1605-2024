import React, { useEffect, useRef, useState } from "react";

const containerStyle = {
  width: "100vw",
  height: "95vh",
};

const center = {
  lat: 20.5937, // Center of India
  lng: 78.9629,
};

// Define marker icons
const markerIcons = {
  severe: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  moderate: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  low: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
};

// Example locations with severity and full names
const locations = [
  {
    lat: 19.076,
    lng: 72.8777,
    severity: "severe",
    title: "Severe Crime Location",
    name: "Mumbai, Maharashtra, India",
    crimes: [
      {
        year: 2023,
        description: "Sexual assault for woman aged 23",
        link: "https://newsarticle1.com",
      },
      {
        year: 2022,
        description: "Abuse of a 7-year-old girl",
        link: "https://newsarticle2.com",
      },
    ],
  },
  {
    lat: 28.6139,
    lng: 77.209,
    severity: "Severe",
    title: "Severe Crime Location",
    name: "Delhi, India",
    crimes: [
      {
        year: 2021,
        description: "Attempted assault on a woman aged 30",
        link: "https://newsarticle3.com",
      },
    ],
  },
  {
    lat: 12.9716,
    lng: 77.5946,
    severity: "severe",
    title: "severe Crime Location",
    name: "Bangalore, Karnataka, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
  {
    lat: 26.8467,
    lng: 80.9462,
    severity: "severe",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Lucknow, Uttar Pradesh, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },

  {
    lat: 22.5726,
    lng: 88.3639,
    severity: "severe",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Kolkata, West Bengal, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
  {
    lat: 13.0827,
    lng: 80.2707,
    severity: "severe",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Chennai, Tamil Nadu, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
  {
    lat: 17.385,
    lng: 78.4867,
    severity: "severe",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Hyderabad, Telangana",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },

  {
    lat: 18.5204,
    lng: 73.8567,
    severity: "severe",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Pune, Maharashtra, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
  {
    lat: 26.9124,
    lng: 75.7873,
    severity: "severe",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Jaipur, Rajasthan, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },

  {
    lat: 23.0225,
    lng: 72.5714,
    severity: "severe",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Ahmedabad, Gujarat, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },

  {
    lat: 9.9312,
    lng: 76.2673,
    severity: "moderate",
    title:
      "moderate Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Kochi, Kerala, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },

  {
    lat: 22.7196,
    lng: 75.8577,
    severity: "moderate",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Indore, Madhya Pradesh, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },

  {
    lat: 21.1702,
    lng: 72.8311,
    severity: "moderate",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Surat, Gujarat, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
  {
    lat: 21.1458,
    lng: 79.0882,
    severity: "moderate",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Nagpur, Maharashtra, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },

  {
    lat: 20.2961,
    lng: 85.8245,
    severity: "moderate",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Bhubaneswar, Odisha, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },

  {
    lat: 17.6868,
    lng: 83.2185,
    severity: "moderate",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Vishakhapatnam, Andhra Pradesh, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },

  {
    lat: 25.5941,
    lng: 85.1376,
    severity: "moderate",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Patna, Bihar, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },

  {
    lat: 23.1815,
    lng: 79.9864,
    severity: "moderate",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Jabalpur, Madhya Pradesh, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },

  {
    lat: 21.2514,
    lng: 81.6296,
    severity: "moderate",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Raipur, Chhattisgarh, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },

  {
    lat: 19.2183,
    lng: 73.078,
    severity: "moderate",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Thane, Maharashtra, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
  {
    lat: 11.9416,
    lng: 79.8083,
    severity: "low",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Pondicherry, Puducherry, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
  {
    lat: 24.5797,
    lng: 73.6678,
    severity: "low",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Udaipur, Rajasthan, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
  {
    lat: 32.2196,
    lng: 76.3249,
    severity: "low",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Dharamshala, Himachal Pradesh, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
  {
    lat: 12.2958,
    lng: 76.6394,
    severity: "low",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Mysuru, Karnataka, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
  {
    lat: 31.1048,
    lng: 77.5489,
    severity: "low",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Shimla, Himachal Pradesh, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
  {
    lat: 11.0168,
    lng: 76.9558,
    severity: "low",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Coimbatore, Tamil Nadu, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
  {
    lat: 30.0869,
    lng: 78.2676,
    severity: "low",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Rishikesh, Uttarakhand, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
  {
    lat: 31.9578,
    lng: 77.1736,
    severity: "low",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Kullu, Himachal Pradesh, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
  {
    lat: 26.2183,
    lng: 78.1828,
    severity: "low",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Gwalior, Madhya Pradesh, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
  {
    lat: 32.7266,
    lng: 74.857,
    severity: "low",
    title:
      "severe Crime Location, UP records highest number of crimes against women among the 28 states last year: Report",
    name: "Jammu, Jammu and Kashmir, India",
    crimes: [
      {
        year: 2020,
        description: "Harassment of a woman aged 25",
        link: "https://newsarticle4.com",
      },
    ],
  },
];

function MapComponent() {
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const initMap = () => {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 5.5,
      });
      setMap(mapInstance);

      // Add markers
      locations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: mapInstance,
          title: location.title,
          icon: markerIcons[location.severity],
        });

        marker.addListener("click", () => {
          setSelectedLocation(location);
        });
      });

      // Initialize the Places Autocomplete
      const autocomplete = new window.google.maps.places.Autocomplete(
        searchInputRef.current
      );
      autocomplete.bindTo("bounds", mapInstance);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          mapInstance.setCenter(place.geometry.location);
          mapInstance.setZoom(12);

          // Match the searched location with the predefined locations
          const matchedLocation = locations.find(
            (loc) => loc.name === place.formatted_address
          );
          if (matchedLocation) {
            setSelectedLocation(matchedLocation);
          } else {
            setSelectedLocation(null); // No match found
          }
        } else {
          alert("No details available for input: '" + place.name + "'");
        }
      });
    };

    if (window.google) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBxGW0vC-Cwq7nJZzaiReC6mgirCQ7QHnI&libraries=places`;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search for places"
        style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
      />
      <div ref={mapRef} style={containerStyle} />
      {selectedLocation && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fff",
            position: "absolute",
            top: 60,
            left: 0,
            zIndex: 1000,
          }}
        >
          <h3>Crimes in {selectedLocation.name}</h3>
          <ul>
            {selectedLocation.crimes.map((crime, index) => (
              <li key={index}>
                <strong>{crime.year}:</strong> {crime.description} -{" "}
                <a href={crime.link} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MapComponent;
