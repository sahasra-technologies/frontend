import React, { useState, useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Index from "./pages/Index.jsx";
import AboutUs from "./pages/About/AboutUs.jsx";

import LoginForm from "./pages/Login/Login.jsx";
import Register from "./pages/Registration/Resgistration.jsx";
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';

import AddTeamDetails from './pages/AddTeamDetails/AddTeamDetails.jsx';
import GameDetailsPage from "./pages/GameDetails.jsx";
import VenueLayout from './pages/VenueLayout/VenueLayout.jsx';
import GroundVenueDetails from './pages/GroundVenueDetails/GroundVenueDetails.jsx';
import GroundTournamentRules from './pages/GroundTournamentRules/GroundTournamentRules.jsx';
import VenueDetails from "./pages/VenueLayout/VenueDetails.jsx";
import RegistrationForm from "./pages/VenueLayout/RegistrationForm.jsx";
import MatchSchedule from "./pages/MatchSchedule.jsx";
import MatchPage from "./pages/Match/MatchPage.jsx";
import TournamentPage from "./pages/Tournaments/TournamentsPage.jsx";
import Header from "@/components/Header";

import NotFound from "./pages/NotFound.jsx";
import CustomSpinner from './components/Spinner/CustomSpinner';
// import Navbar from "./components/Navbar/Navbar"; // Ensure this is imported
import { ThemeContext, ThemeProvider } from "./context/ThemeContext"; // Ensure this exists
import { GameProvider } from './context/GameContext';

const queryClient = new QueryClient();

// 🔄 Layout with Navbar/Footer
function LayoutWrapper({ children }) {
  const location = useLocation();
  const { theme = 'light' } = useContext(ThemeContext) || {}; //

  const hideLayoutPaths = ['/login', '/reset-password'];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className={`app-container ${theme}`}>
      {!hideLayout && <Header />}
      {children}
      {/* {!hideLayout && <Footer />} */}
    </div>
  );
}

const App = () => {
  const [isLoading, setIsLoading] = useState(false); // default = false, spinner only when we fetch

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        {/* Global Spinner */}
        {isLoading && <CustomSpinner />}

        <ThemeProvider>
          <GameProvider>
            <BrowserRouter>
              <Routes>
                {/* home */}
                <Route path="/" element={<LayoutWrapper><Index /></LayoutWrapper>} />
                <Route path="/about-us" element={<LayoutWrapper><AboutUs /></LayoutWrapper>} />

                {/* Authentication */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/register" element={<LayoutWrapper><Register setIsLoading={setIsLoading} /></LayoutWrapper>} />

                {/* APP */}
                <Route path="/tournaments" element={<LayoutWrapper><TournamentPage setIsLoading={setIsLoading} /></LayoutWrapper>} />
                <Route path="/add-team" element={<LayoutWrapper><AddTeamDetails setIsLoading={setIsLoading}/></LayoutWrapper>} />
                <Route path="/tournaments/:id" element={<LayoutWrapper><GameDetailsPage setIsLoading={setIsLoading} /></LayoutWrapper>} />
                <Route path="/venue/:id" element={<LayoutWrapper><VenueLayout setIsLoading={setIsLoading} /></LayoutWrapper>} />
                <Route path="/venue/:id/details" element={<GroundVenueDetails setIsLoading={setIsLoading} />} />
                <Route path="/venue/:id/tournament-rules" element={<GroundTournamentRules setIsLoading={setIsLoading} />} />
                <Route path="/venue-details/:id" element={<VenueDetails setIsLoading={setIsLoading} />} />
                <Route
                  path="/venue/:id/register"
                  element={<LayoutWrapper><RegistrationForm setIsLoading={setIsLoading}/></LayoutWrapper>}
                />
                <Route path="/match-schedule" element={<MatchSchedule setIsLoading={setIsLoading} />} />
                <Route path='/match-page' element={<MatchPage setIsLoading={setIsLoading} />} />

                {/* Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </GameProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
export default App