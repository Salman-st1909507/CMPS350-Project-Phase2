export function emptyComponet(title, description) {
  return `
    <div class="empty-state-component row" style="max-width:600px;">
    <h2 class="empty-state-title" style="color: black;">${title}</h2>
    <div class="empty-state-divider"
      style="background-color: gray; height: 100px; width: 3px;"></div>
    <p class="empty-state-description" style="color: gray;">${description}</p>
  </div>
    `;
}

export function popUpMessage(message, goToCartButtonContent, goToCart = true) {
  const popUpMessageBackground = document.createElement("div");
  popUpMessageBackground.classList.add("pop-up-message-background");
  popUpMessageBackground.innerHTML = `
<div class="pop-up-message column">
  <span class="close-button">&times;</span>
  <div class="message-content">Checkout successfully!</div>
  <div class="buttons row">
    <button class="return-to-main-button button">Return to Main</button>
    <button class="go-to-cart-button button"></button>
  </div>
</div>
`;
  document.querySelector(".main").appendChild(popUpMessageBackground);

  const closeButton = document.querySelector(".close-button");
  const returnToMainButton = document.querySelector(".return-to-main-button");
  const goToCartButton = document.querySelector(".go-to-cart-button");
  const messageContent = document.querySelector(".message-content");

  goToCartButton.innerHTML = `${goToCartButtonContent}`;
  messageContent.innerHTML = `${message}`;

  closeButton.addEventListener("click", () => {
    popUpMessageBackground.remove();
  });

  returnToMainButton.addEventListener("click", () => {
    popUpMessageBackground.remove();
    location.href = "home.html";
  });

  goToCartButton.addEventListener("click", () => {
    popUpMessageBackground.remove();
    if (goToCart) location.href = "cart.html";
  });

  window.addEventListener("click", (event) => {
    if (event.target === popUpMessageBackground) {
      popUpMessageBackground.remove();
    }
  });
}
export function popup2(message) {
  const popUpMessageBackground = document.createElement("div");
  popUpMessageBackground.classList.add("pop-up-message-background");
  popUpMessageBackground.innerHTML = `
<div class="pop-up-message column">
  <span class="close-button">&times;</span>
  <div class="message-content">${message}</div>
  <div class="buttons row">
    <button class="go-to-login-button button">Go to Login</button>
    <button class="go-to-main-button button">Go to Main</button>
  </div>
</div>
`;
  document.querySelector(".main").appendChild(popUpMessageBackground);

  const closeButton = document.querySelector(".close-button");
  const goToLoginButton = document.querySelector(".go-to-login-button");
  const goToMainButton = document.querySelector(".go-to-main-button");

  closeButton.addEventListener("click", () => {
    popUpMessageBackground.remove();
  });

  goToLoginButton.addEventListener("click", () => {
    popUpMessageBackground.remove();
    location.href = "login.html";
  });

  goToMainButton.addEventListener("click", () => {
    popUpMessageBackground.remove();
    location.href = "home.html";
  });

  window.addEventListener("click", (event) => {
    if (event.target === popUpMessageBackground) {
      popUpMessageBackground.remove();
    }
  });
}

export function popup3(message) {
  const popUpMessageBackground = document.createElement("div");
  popUpMessageBackground.classList.add("pop-up-message-background");
  popUpMessageBackground.innerHTML = `
<div class="pop-up-message column">
  <span class="close-button">&times;</span>
  <div class="message-content">${message}</div>
  <div class="buttons row">
    <button class="stay-in-account-button button">Update Existing Phone</button>
    <button class="go-to-main-button button">Go to Main</button>
  </div>
</div>
`;
  document.querySelector(".main").appendChild(popUpMessageBackground);

  const closeButton = document.querySelector(".close-button");
  const stayInAccountButton = document.querySelector(".stay-in-account-button");
  const goToMainButton = document.querySelector(".go-to-main-button");

  closeButton.addEventListener("click", () => {
    popUpMessageBackground.remove();
  });

  stayInAccountButton.addEventListener("click", () => {
    popUpMessageBackground.remove();
  });

  goToMainButton.addEventListener("click", () => {
    popUpMessageBackground.remove();
    location.href = "home.html";
  });

  window.addEventListener("click", (event) => {
    if (event.target === popUpMessageBackground) {
      popUpMessageBackground.remove();
    }
  });
}
