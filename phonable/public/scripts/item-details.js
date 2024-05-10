import itemsRepo from "../repo/items-repo.js";
import cartRepo from "../repo/cart-repo.js";
import usersRepo from "../repo/users-repo.js";
import * as components from "../utils/components.js";

document.addEventListener("DOMContentLoaded", async () => {
  let currentUser = await usersRepo.getUserByUserId(
    await usersRepo.getCurrentUserId()
  );

  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get("itemId");

  let currentItem = await itemsRepo.getItem(itemId);
  let quantity = 1;

  const itemPreviewContainer = document.querySelector(
    ".item-preview-container"
  );
  itemPreviewContainer.innerHTML = itemPreview(currentItem);

  document.querySelector(".minus-button").addEventListener("click", () => {
    if (quantity > 1) {
      quantity -= 1;
      document.querySelector(
        ".item-preview-quantity-control-quantity"
      ).innerHTML = quantity;
    }
  });

  document.querySelector(".plus-button").addEventListener("click", () => {
    if (quantity < currentItem.quantity) {
      quantity += 1;
      document.querySelector(
        ".item-preview-quantity-control-quantity"
      ).innerHTML = quantity;
    }
  });

  itemPreviewContainer
    .querySelector(".item-preview-add-to-cart-button")
    .addEventListener("click", async () => {
      if (!currentUser) {
        components.popup2("You need to login first!", "Go to Login", false);
      } else {
        const newCartItem = {
          customerId: currentUser.userId,
          itemId: currentItem.itemId,
          quantity: quantity,
          checked: false,
        };

        await cartRepo.addCartItem(newCartItem);

        components.popUpMessage(
          "Item added to cart successfully!",
          "Go to Cart"
        );
      }
    });
});

function itemPreview(item) {
  return `
<img class="item-preview-image"
                    src="${item.picture}"
                    alt="${item.name}">
                <div class="item-preview-info column">
                    <div class="item-preview-name-price-details column">
                        <div class="item-preview-name-price row">
                            <p class="item-preview-name">${item.name}</p>
                            <p class="item-preview-price">$${item.price}</p>
                        </div>
                        <p class="item-preview-details"><span
                                class="span">Details:</span> ${item.details}</p>

                    </div>

                    <div class="item-preview-buttons column">

                        <div class="item-preview-quantity-quantity-control row">
                            <p class="item-preview-quantity"><span
                                    class="span">Quantity:</span>
                                ${item.quantity}</p>

                            <div class="item-preview-quantity-control row">
                                <button class="minus-button button">-</button>
                                <p
                                    class="item-preview-quantity-control-quantity">1</p>
                                <button class="plus-button button">+</button>
                            </div>
                        </div>

                        <button class="item-preview-add-to-cart-button button">Add to
                            Cart</button>
                    </div>

                </div>
`;
}
