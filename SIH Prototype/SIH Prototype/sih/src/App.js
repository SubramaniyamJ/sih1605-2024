// import React from "react";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import HomePage from "./components/HomePage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" component={HomePage} />
//         {/* <Route path="/about" component={AboutPage} /> */}
//         {/* Add more routes here */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// Incorrect: Nested <BrowserRouter>
// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LoginPage from "./components/LoginPage";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import HelpPage from "./components/HelpPage";
import HomePage from "./components/HomePage"; // Import HomePage
import LoginPage from "./components/LoginPage";
import MapComponent from "./components/MapComponent";
import SOSButton from "./components/SOSButton";
import Gesture from "./components/Gesture";
import GenderDistribution from "./components/GenderDistribution";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/alerts" element={<SOSButton />} />
      <Route path="/req" element={<MapComponent />} />
      <Route path="/gesture" element={<Gesture />} />
      <Route path="/genderDistribution" element={<GenderDistribution />} />
    </Routes>
  );
}

export default App;
