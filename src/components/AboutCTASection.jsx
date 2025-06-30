import React from "react";
import { Link } from "react-router-dom";

const AboutCTASection = ({ isVisible, sectionRef }) => (
  <section
    ref={sectionRef}
    data-section="cta"
    className={`bg-playdate-light-blue p-8 rounded-xl py-xxl px-xl text-dark text-center transform transition-all duration-1000 ${
      isVisible
        ? "translate-y-0 opacity-100"
        : "translate-y-10 opacity-0"
    }`}
  >
    <div className="p-4">
    <h2 className="text-xl font-bold mb-md animate-pulse">Join the movement.</h2>
    <p className="text-lg mb-xl">It isn't about the big game. It's about every game.</p>
    <br/>
    <Link
      to="/tournaments"
      className="bg-white text-playdate-primary-blue px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 inline-block hover:scale-110 hover:shadow-2xl transform"
    >
      Get Started Today
    </Link>
    </div>
  </section>
);

export default AboutCTASection;
