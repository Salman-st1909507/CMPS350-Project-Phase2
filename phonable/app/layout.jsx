"use client";
import { Inter } from "next/font/google";
import "@/public/style/general-layout.css";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();

  function navigateToHome() {
    router.push("pages/home.html");
  }
  function navigateToCart() {
    router.push("pages/cart.html");
  }
  function navigateToLogin() {
    router.push("pages/login.html");
  }

  function navigateToAccount() {
    router.push("pages/account.html");
  }
  return (
    <html lang="en">
      <head></head>
      <body className={`${"body"}`}>
        <header className="header column">
          <div className="app-bar row">
            <p className="welcoming-text">Up to 50% discounts for new users!</p>

            <div className="account-buttons row">
              <button className="text-button" onClick={navigateToLogin}>
                Login
              </button>
              <p className="buttons-divider">|</p>
              <button className="text-button" onClick={navigateToAccount}>
                My Account
              </button>
            </div>
          </div>

          <div className="search-bar-logo-container column">
            <div className="logo row" onClick={navigateToHome}>
              <img
                className="logo-image"
                src="../Assets/Images/Phonable Logo.png"
                alt="Phonable Logo"
              />
              <h1 className="logo-name">Phonable</h1>
            </div>

            <div className="search-bar-cart-button-container row">
              <div className="search-bar-container row">
                <input
                  className="search-bar"
                  type="text"
                  placeholder="Search..."
                />
                <button className="search-button">Search</button>
              </div>

              <div
                className="cart-button-container row"
                onClick={navigateToCart}
              >
                <img
                  src="../Assets/Images/cart-icon.png"
                  alt="Cart"
                  className="cart-icon"
                />
                <p className="cart-name">Cart</p>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <nav className="nav-bar row">
            <button className="text-button" onClick={navigateToHome}>
              Home
            </button>
            <p className="buttons-divider">|</p>
            <button className="text-button" onClick={navigateToHome}>
              Phones
            </button>
            <p className="buttons-divider">|</p>
            <button className="text-button" onClick={navigateToHome}>
              Accessories
            </button>
          </nav>
        </header>

        <main className="main column">{children}</main>

        <footer className="footer column">
          <div className="footer-inner column">
            <div className="logo" onClick={navigateToHome}>
              <img
                className="logo-image"
                src="../Assets/Images/Phonable Logo.png"
                alt="Phonable Logo"
              />
            </div>

            <div className="footer-links column">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>

            <div className="footer-contact column">
              <h3>Contact Us</h3>
              <p>Email: phonable@example.com</p>
              <p>Phone: +974 12345678</p>
              <p>Address: 123 St. 12, Doha, Qatar</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Phonable. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
