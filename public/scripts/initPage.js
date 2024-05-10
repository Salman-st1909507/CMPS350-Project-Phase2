document.addEventListener("DOMContentLoaded", () => {
  let body = document.querySelector("body");
  let main = document.querySelector("main");

  let mainContent = main.innerHTML;
  body.classList.add("body");
  body.classList.add("column");

  body.innerHTML = headerAndFooter(mainContent, "Main");

  let searchBar = document.querySelector(".search-bar");
  let searchButton = document.querySelector(".search-button");

  searchButton.addEventListener("click", () => {
    window.location.href = `../pages/home.html?searchText=${searchBar.value}`;
  });
});

function headerAndFooter(mainContent) {
  return `
    <header class="header column">

    <div class="app-bar row">
        <p class="welcoming-text">Up to 50% discounts for new users!</p>

        <div class="account-buttons row">
            <button class="text-button"
                onclick="location.href='login.html'">Login</button>
            <p class="buttons-divider">|</p>
            <button class="text-button"
                onclick="location.href='account.html'">My
                Account</button>
        </div>

    </div>

    <div class="search-bar-logo-container column">

        <div class="logo row" onclick="location.href='home.html'">
            <img class="logo-image"
                src="../Assets/Images/Phonable Logo.png"
                alt="Phonable Logo">
            <h1 class="logo-name">Phonable</h1>
        </div>

        <div class="search-bar-cart-button-container row">

            <div class="search-bar-container row">
                <input class="search-bar" type="text"
                    placeholder="Search...">
                <button class="search-button">Search</button>
            </div>

            <div class="cart-button-container row"
                onclick="location.href='cart.html'">
                <img src="../Assets/Images/cart-icon.png" alt="Cart"
                    class="cart-icon">
                <p class="cart-name">Cart</p>
            </div>

        </div>

    </div>

    <div class="divider"></div>

    <nav class="nav-bar row">
        <button class="text-button"
            onclick="location.href='home.html'">Home</button>
        <p class="buttons-divider">|</p>
        <button class="text-button"
            onclick>Phones</button>
        <p class="buttons-divider">|</p>
        <button class="text-button"
            onclick>Accessories</button>
    </nav>

</header>

<main class="main column">
${mainContent}
</main>

<footer class="footer column">

    <div class="footer-inner column">

        <div class="logo" onclick="location.href='home.html'">
            <img class="logo-image"
                src="../Assets/Images/Phonable Logo.png"
                alt="Phonable Logo">
        </div>

        <div class="footer-links column">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
        </div>

        <div class="footer-contact column">
            <h3>Contact Us</h3>
            <p>Email: phonable@example.com</p>
            <p>Phone: +974 12345678</p>
            <p>Address: 123 St. 12, Doha, Qatar</p>
        </div>

    </div>

    <div class="footer-bottom">
        <p>&copy; 2024 Phonable. All rights reserved.</p>
    </div>

</footer>

`;
}
