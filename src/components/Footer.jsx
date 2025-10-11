import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, MessageCircle, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom"; // ✅ for navigation
import { useState } from 'react';

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showCookies , setShowCookies] = useState(false);

  const socialLinks = [
  // { icon: Facebook, href: "https://www.facebook.com/login.php" },
  // { icon: Twitter, href: "https://x.com/login" },
  { icon: Instagram, href: "https://www.instagram.com/playdatesport/?utm_source=qr" },
  // { icon: MessageCircle, href: "https://messages.google.com/web/welcome" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/playdatesport/"}
  ];

  const footerSections = [
    {
      title: "Platform",
      links: [
        // { name: "Find Players", path: "/find-players" },
        // { name: "Book Venues", path: "/book-venues" },
        // { name: "Join Games", path: "/join-games" },
        // { name: "Create Events", path: "/create-events" },
        { name: "Tournaments", path: "/tournaments" },
      ],
    },
    // {
    //   title: "Support",
    //   links: [
    //     { name: "Help Center", path: "/help" },
    //     { name: "Contact Us", path: "/contact" },
    //     { name: "Safety", path: "/safety" },
    //     { name: "Community Guidelines", path: "/guidelines" },
    //     { name: "Terms & Privacy", path: "/terms" },
    //   ],
    // },
    {
      title: "Connect",
      links: [
        { name: "About Us", path: "/about-us" },
        // { name: "Blog", path: "/blog" },
        // { name: "Careers", path: "/careers" },
        // { name: "Press", path: "/press" },
        // { name: "Partnerships", path: "/partnerships" },
      ],
    },
    {
      title: "Policies",
      links: [
        { name: "Privacy Policy", action: () => setShowPrivacy(true) },
        { name: "Terms and Conditions", action: () => setShowTerms(true) },
        { name: "Cookie Policy", action: () => setShowCookies(true) },
        // { name: "Press", path: "/press" },
        // { name: "Partnerships", path: "/partnerships" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Brand section */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-2 mb-4">
                <img src="/Play_primary.svg" alt="logo" className="h-8 w-auto" />
                <span className="text-xl font-bold">PlayDate</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                Connecting sports enthusiasts, one game at a time.
              </p>
              {/* <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, MessageCircle].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-gray-400 hover:text-sports-blue transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div> */}

              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-sports-blue transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Footer links */}
            {footerSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                     <li key={linkIndex}>
                      {link.action ? (
                        <button
                          onClick={link.action}
                          className="text-gray-400 hover:text-white transition-colors text-left w-full"
                        >
                          {link.name}
                        </button>
                      ) : (
                        <Link
                          to={link.path}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 PlayDate. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">
                Designed and developed by <b>Sahasra</b>
              </p>
              {/* <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link> */}
            </div>
          </div>
        </motion.div>
      </div>
      {/* Chat support button */}
      {/* <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button className="bg-sports-blue hover:bg-sports-blue-dark text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
          <MessageCircle className="w-6 h-6" />
        </button>
      </motion.div> */}

      {/* Terms Modal */}
      {showTerms && (
        <div className="terms-modal">
          <div className="terms-content">
            <span className="close-icon" onClick={() => setShowTerms(false)}>×</span>
            {/* <h3>Terms and Conditions</h3> */}
            <h1>PlayDate - Terms and Conditions</h1>
          <div class="meta">Last Updated: June 12, 2025</div>

          <h2>1. Acceptance of Terms</h2>
          <p>By using PlayDate's website or app, you agree to these Terms. If you disagree, please stop using the Platform.</p>

          <h2>2. Eligibility</h2>
          <p>Open to users of all ages. Users under 18 must have adult supervision for bookings and payments.</p>

          <h2>3. Bookings & Payments</h2>
          <p>Payments may be made through the app (advance) or partly at the venue. Payment processing is secure, and PlayDate is not a banking entity. Refunds are initiated within 3-5 business days for delays. Refund value is based on the hours delayed or cancellation timing. Rescheduling or cancellations may depend on venue policy. If you cancel too late or no-show, refunds may not apply.</p>

          <h2>4. User Responsibilities & Code of Conduct</h2>
          <p>Users must not impersonate others, spam, harass, hack, or misuse the system. No-shows or repeated misconduct may result in forfeiture of payments or temporary bans.</p>

          <h2>5. Matchmaking & Playmate System</h2>
          <p>We use your preferences, location, and sports interests to suggest matches. PlayDate does not guarantee that a match will always be found. Poor participation or repeated declines may affect visibility in the system.</p>

          <h2>6. Venue Liability Disclaimer</h2>
          <p>PlayDate is not responsible for injuries, accidents, or disputes during physical games or events. All play is at the user's own risk.</p>

          <h2>7. User-Generated Content & Moderation</h2>
          <p>Users are responsible for any content uploaded. PlayDate reserves the right to remove offensive, fake, or abusive content and block users violating platform rules.</p>

          <h2>8. Media & Promotional Rights</h2>
          <p>Users grant PlayDate rights to capture, reuse, and promote any photos or videos taken during events. This includes marketing and advertising use without separate consent.</p>

          <h2>9. Privacy, Data Security & Usage</h2>
          <p>We collect user data (name, contact, location, sport preferences) only for matchmaking and enhancing the user experience. We never sell user data. Users may request access or deletion of their data by contacting support.</p>

          <h2>10. Intellectual Property</h2>
          <p>All content, code, design, and branding are owned by PlayDate. No one may reproduce or misuse them without written permission.</p>

          <h2>11. Modifications & Updates</h2>
          <p>We may update these terms occasionally. Continued use implies agreement to updated terms.</p>

          <h2>12. Governing Law & Dispute Resolution</h2>
          <p>These terms are governed by Indian law and the jurisdiction of Hyderabad, Telangana. Please contact support before raising legal disputes.</p>

          <br />
          <p>
            <strong>PlayDate Sport</strong><br />
            Address: Uppal,Hyderabad.<br />
            Email: <a href="mailto:contact@playdate.com">contact@playdate.com</a>
          </p>
          <button onClick={() => setShowTerms(false)} className="close-modal-btn">Close</button>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="terms-modal">
          <div className="terms-content">
            <span className="close-icon" onClick={() => setShowPrivacy(false)}>×</span>
            <h1>Privacy Policy - PlayDate Sports Pvt. Ltd.</h1>
            <div className="meta">Effective Date: 01/06/2025</div>

            <h2>1. Information We Collect</h2>
            <p>We collect personal info (name, contact, DOB, etc.), credentials, GPS location, media content, device data, match history, communication logs, and payment information (handled securely via Razorpay).</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use your data to match games, manage tournaments, show performance, send notifications, personalize content, and improve the app.</p>

            <h2>3. Consent for Media Usage</h2>
            <p>By participating in events, you consent to media usage. You can opt out by emailing <a href="mailto:contact@playdate.com">contact@playdate.com</a>.</p>

            <h2>4. Data Sharing and Disclosure</h2>
            <p>We don’t sell your data. We only share with secure processors (e.g., Razorpay, Firebase), authorities if required, and under strict confidentiality with partners.</p>

            <h2>5. User Rights & Choices</h2>
            <p>You can access, correct, or delete your data, and opt out of promotional communications via the app or email.</p>

            <h2>6. Cookies & Tracking</h2>
            <p>We use cookies and SDKs for session management and analytics. You can manage this via your browser/device settings.</p>

            <h2>7. Children’s Privacy</h2>
            <p>Users under 18 need verified guardian consent. We protect minors with limited visibility and identity masking.</p>

            <h2>8. Security Practices</h2>
            <p>We use encryption, HTTPS, secure authentication, internal access tiers, and regular audits to protect data.</p>

            <h2>9. Refunds and Transaction Issues</h2>
            <p>Refunds are processed in 3–5 business days. Disputes must be raised within 24 hours of an issue.</p>

            <h2>10. Policy Updates</h2>
            <p>Policy may change. We notify you via app/email. Continued use implies acceptance.</p>

            <h2>11. Grievance and Contact</h2>
            <p>Please contact support before raising legal disputes.</p>
            
            <br />
            <p>
              <strong>PlayDate Sport</strong><br />
              Address: Uppal,Hyderabad.<br />
              Email: <a href="mailto:contact@playdate.com">contact@playdate.com</a>
            </p>

            <button onClick={() => setShowPrivacy(false)} className="close-modal-btn">Close</button>
          </div>
        </div>
      )}

      {/* Cookie Modal */}
      {showCookies && (
        <div className="terms-modal">
          <div className="terms-content">
            <span className="close-icon" onClick={() => setShowCookies (false)}>×</span>
            <h1>Cookie Policy - PlayDate Sports Pvt. Ltd.</h1>
            <div className="meta">Effective Date: 01/06/2025</div>

            <h2 className="font-semibold mt-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device that help us recognize you, improve
              your browsing experience, and ensure smooth functioning of our platform.
            </p>

            <h2 className="font-semibold mt-4">2. Types of Cookies We Use</h2>
            <p>
                <strong>Essential Cookies:</strong> Required for core features like authentication, navigation, and secure payments. <br />
                <strong>Performance Cookies:</strong> Help us measure app usage, load times, and detect errors. <br />
                <strong>Functional Cookies:</strong> Remember preferences like language, region, and saved settings. <br />
                {/* <strong>Analytics & Tracking Cookies:</strong> Used via Firebase/Google Analytics to analyze trends and improve user experience. <br /> */}
                <strong>Advertising Cookies:</strong> May be used for personalized offers, promotions, or retargeting. <br />
            </p>
            
            <h2 className="font-semibold mt-4">3. How We Use Cookies</h2>
            <p>
              Cookies allow us to: <br />
                &nbsp;&nbsp;&nbsp;Keep you signed in securely.<br />
                &nbsp;&nbsp;&nbsp;Show relevant sports events and tournaments.<br />
                &nbsp;&nbsp;&nbsp;Track performance and improve our app experience.<br />
                &nbsp;&nbsp;&nbsp;Provide secure payment and fraud prevention via Razorpay.<br />
            </p>

            <h2 className="font-semibold mt-4">4. Managing Cookies</h2>
            <p>
              You can manage or disable cookies anytime through your browser or device settings.
              However, disabling cookies may limit some features of PlayDate.
            </p>

            <h2 className="font-semibold mt-4">5. Third-Party Cookies</h2>
            <p>
              We may use trusted third-party tools (Firebase, Razorpay, Google Analytics) which set
              their own cookies for analytics, payments, and security purposes.
            </p>

            <h2 className="font-semibold mt-4">6. Policy Updates</h2>
            <p>
              We may update this Cookie Policy periodically. You’ll be notified via app or email.
              Continued use of PlayDate implies acceptance of these updates.
            </p>
            
            <br />
            <p>
              <strong>PlayDate Sport</strong><br />
              Address: Uppal,Hyderabad.<br />
              Email: <a href="mailto:contact@playdate.com">contact@playdate.com</a>
            </p>

            <button onClick={() => setShowCookies(false)} className="close-modal-btn">Close</button>
          </div>
        </div>
      )}
      
    </footer>
  );
};

export default Footer;
