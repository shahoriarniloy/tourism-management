import React from "react";
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="max-w-[1280px] mx-auto ">
        <div className="footer-logo">
          <h2>TrailBliss</h2>
          <p className="mb-6">
            Where every journey begins with excitement, and every adventure ends
            with memories.
          </p>
        </div>
        <div className="footer-links mb-5">
          <div className="company">
            <h4>Company</h4>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Our Team</li>
              <li>Coming Soon</li>
            </ul>
          </div>
          <div className="destination">
            <h4>Destination</h4>
            <ul>
              <li>Kyoto, Japan</li>
              <li>Paris, France</li>
              <li>Bali, Indonesia</li>
              <li>Bangkok, Thailand</li>
              <li>Machu Picchu, Peru</li>
              <li>Dubai, UAE</li>
            </ul>
          </div>
          <div className="resources">
            <h4>Resources</h4>
            <ul>
              <li>Insurance</li>
              <li>Terms</li>
              <li>Careers</li>
              <li>Updates</li>
              <li>Privacy</li>
              <li>Sitemap</li>
            </ul>
          </div>
          <div className="newsletter">
            <h4>Subscribe Our Newsletter</h4>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button type="submit" className="subscribe-button">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
