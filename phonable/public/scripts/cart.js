import cartRepo from "../repo/cart-repo.js";
import boughtItemsRepo from "../repo/bought-items-repo.js";
import itemsRepo from "../repo/items-repo.js";
import usersRepo from "../repo/users-repo.js";
import * as components from "../utils/components.js";

let checkoutList = [];

let currentUser;

document.addEventListener("DOMContentLoaded", async () => {
  currentUser = await usersRepo.getUserByUserId(
    await usersRepo.getCurrentUserId()
  );

  await updateCheckoutList();
  await loadCartItems();
});

async function loadCartItems() {
  const shoppingCards = document.querySelector(".shopping-cards");
  const checkoutButton = document.querySelector(".checkout-button");
  let cartItems = await cartRepo.getCartItems(currentUser.userId);

  if (cartItems.length > 0) {
    shoppingCards.innerHTML = cartItems
      .map((item) => cartItemCard(item))
      .join("");

    document.querySelectorAll(".shopping-cart-card").forEach((itemCard) =>
      itemCard
        .querySelector(".shopping-cart-card-checkbox")
        .addEventListener("change", async () => {
          const checkbox = itemCard.querySelector(
            ".shopping-cart-card-checkbox"
          );
          let cartItem = await cartRepo.getCartItem(
            itemCard.id,
            currentUser.userId
          );

          let updatedCartItem = {
            cartItemId: cartItem.cartItemId,
            customerId: cartItem.customerId,
            itemId: cartItem.itemId,
            quantity: cartItem.quantity,
            checked: cartItem.checked,
          };

          if (checkbox.checked) {
            updatedCartItem.checked = checkbox.checked;
            await cartRepo.updateCartItem(updatedCartItem);
            checkoutList.push(
              await cartRepo.getCartItem(itemCard.id, currentUser.userId)
            );
            updateCheckoutList();
          } else {
            updatedCartItem.checked = checkbox.checked;
            await cartRepo.updateCartItem(updatedCartItem);
            checkoutList.pop(
              await cartRepo.getCartItem(itemCard.id, currentUser.userId)
            );
            updateCheckoutList();
          }
        })
    );

    document.querySelectorAll(".shopping-cart-card").forEach((itemCard) =>
      itemCard
        .querySelector(".shopping-cart-card-delete-button")
        .addEventListener("click", async () => {
          await cartRepo.deleteCartItem(itemCard.id, currentUser.userId);
          loadCartItems();
          updateCheckoutList();
        })
    );
    document.querySelectorAll(".shopping-cart-card").forEach((itemCard) =>
      itemCard
        .querySelector(".minus-button")
        .addEventListener("click", async () => {
          let cartItem = await cartRepo.getCartItem(
            itemCard.id,
            currentUser.userId
          );

          let updatedCartItem = {
            cartItemId: cartItem.cartItemId,
            customerId: cartItem.customerId,
            itemId: cartItem.itemId,
            quantity: cartItem.quantity,
            checked: cartItem.checked,
          };

          if (updatedCartItem.quantity > 1) {
            updatedCartItem.quantity -= 1;
            await cartRepo.updateCartItem(updatedCartItem);
            loadCartItems();
            updateCheckoutList();
          }
        })
    );
    document.querySelectorAll(".shopping-cart-card").forEach((itemCard) =>
      itemCard
        .querySelector(".plus-button")
        .addEventListener("click", async () => {
          let cartItem = await cartRepo.getCartItem(
            itemCard.id,
            currentUser.userId
          );
          let item = await itemsRepo.getItem(cartItem.Item.itemId);

          let updatedCartItem = {
            cartItemId: cartItem.cartItemId,
            customerId: cartItem.customerId,
            itemId: cartItem.itemId,
            quantity: cartItem.quantity,
            checked: cartItem.checked,
          };

          if (updatedCartItem.quantity < item.quantity) {
            updatedCartItem.quantity += 1;
            await cartRepo.updateCartItem(updatedCartItem);
            loadCartItems();
            updateCheckoutList();
          }
        })
    );

    checkoutButton.addEventListener("click", checkout);
  } else {
    shoppingCards.innerHTML = components.emptyComponet(
      "Cart is Empty",
      "Your shopping cart is empty"
    );
  }
}
async function checkout() {
  if (checkoutList.length != 0 && getTotal() < currentUser.moneyBalance) {
    checkoutList.forEach(async (cartItem) => {
      await cartRepo.deleteCartItem(cartItem.cartItemId, currentUser.userId);

      let newBoughtItem = {
        customerId: cartItem.customerId,
        itemId: cartItem.itemId,
        quantity: cartItem.quantity,
      };

      await boughtItemsRepo.addItem(newBoughtItem);

      let item = await itemsRepo.getItem(cartItem.itemId);

      await itemsRepo.updateItem({
        ...item,
        quantity: item.quantity - cartItem.quantity,
      });

      let itemAfterUpdate = await itemsRepo.getItem(cartItem.itemId);

      if (itemAfterUpdate.quantity <= 0) {
        await itemsRepo.updateItem({
          ...itemAfterUpdate,
          outOfStock: true,
        });
      }
    });

    await usersRepo.updateUser({
      ...currentUser,
      moneyBalance: currentUser.moneyBalance - getTotal(),
    });

    checkoutList = [];
    loadCartItems();
    updateCheckoutList();
    currentUser.moneyBalance -= getTotal();

    components.popUpMessage(
      "Your order has been placed successfully!",
      "Stay at Cart",
      false
    );
  }
  if (currentUser.moneyBalance < getTotal()) {
    components.popUpMessage(
      "You don't have enough money to checkout!",
      "Stay at Cart",
      false
    );
  }
}

function getTotal() {
  return checkoutList
    .reduce((acc, curr) => (acc += curr.Item.price * curr.quantity), 0)
    .toFixed(2);
}

async function updateCheckoutList() {
  checkoutList = [];
  let cartItems = await cartRepo.getCartItems(currentUser.userId);

  const checkedItems = cartItems.filter((cartItem) => cartItem.checked == true);
  checkedItems.forEach((item) => checkoutList.push(item));

  let total = getTotal();

  document.querySelector(".checkout-text").innerHTML = `$${total}`;
}

function cartItemCard(cartItem) {
  return `
<div class="shopping-cart-card row" id="${cartItem.cartItemId}">

<div class="shopping-cart-card-checkbox-image-info row">

<input class="shopping-cart-card-checkbox" type="checkbox" ${
    cartItem.checked ? "checked" : ""
  }
  name="shopping-cart-card-checkbox" id>

<img
  class="shopping-cart-card-image"
  src="${cartItem.Item.picture}"
  alt="${cartItem.Item.name}">

<p class="shopping-cart-card-details"></p>
<div class="shopping-cart-card-info column">
              <p class="shopping-cart-card-name">${cartItem.Item.name}</p>
              <p class="shopping-cart-card-details">${cartItem.Item.details}</p>
            </div>
            </div>
<div class="shopping-cart-buttons column">

  <p class="shopping-cart-card-price">$${
    cartItem.Item.price * cartItem.quantity
  }</p>

  <div class="shopping-cart-card-quantity-control row">
    <button class="minus-button button">-</button>
    <p class="shopping-cart-card-quantity">${cartItem.quantity}</p> <button
      class="plus-button button">+</button>
  </div>

  <button class="shopping-cart-card-delete-button button">Delete</button>
</div>

</div>
`;
}
