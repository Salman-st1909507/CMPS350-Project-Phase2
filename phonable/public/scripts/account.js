import boughtItemsRepo from "../repo/bought-items-repo.js";
import usersRepo from "../repo/users-repo.js";
import itemsRepo from "../repo/items-repo.js";
import * as components from "../utils/components.js";
let currentUser;
let uploadForm;
let itemGrid;
document.addEventListener("DOMContentLoaded", async () => {
  currentUser = await usersRepo.getUserByUserId(
    await usersRepo.getCurrentUserId()
  );

  if (currentUser.type == "admin") {
    window.location.href = `/statistics`;
  }

  const userDetails = document.querySelector(".user-details-container");
  if (currentUser.type == "customer") {
    userDetails.innerHTML = customerDetailsPage();
    loadItems();
  } else {
    userDetails.innerHTML = sellerDetailsPage();
    await loadSellerItems();

    uploadForm = document.querySelector("#uploadForm");
    itemGrid = document.querySelector("#itemGrid");

    uploadForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const editItemId = uploadForm.dataset.editItemId;

      const newItem = {
        itemId: editItemId,
        name: document.querySelector("#itemName").value,
        price: parseFloat(document.querySelector("#price").value),
        quantity: parseInt(document.querySelector("#quantity").value),
        picture: document.querySelector("#itemImage").value,
        details: document.querySelector("#details").value,
        sellerId: currentUser.userId,
        category: "phone",
      };

      if (editItemId) {
        await itemsRepo.updateItem(newItem);
      } else {
        await itemsRepo.addItem(newItem);
      }

      uploadForm.reset();
      delete uploadForm.dataset.editItemId;

      displayItems(currentUser.userId);
    });

    displayItems(currentUser.userId);
  }

  const signOutButton = document.querySelector(".sign-out-button");
  signOutButton.addEventListener("click", async () => {
    usersRepo.setCurrentUserId(null);
    window.location.href = "login.html";
  });
});

async function loadItems() {
  const itemGrid = document.querySelector(".item-grid");
  let boughtItems = await boughtItemsRepo.getBoughtItemsForCustomer(
    currentUser.userId
  );
  if (boughtItems.length > 0) {
    itemGrid.innerHTML = boughtItems.map((item) => itemCard(item)).join("");
  } else {
    itemGrid.innerHTML = components.emptyComponet(
      "No History Reocrds",
      "You have not ordered anything yet."
    );
  }
}

async function loadSellerItems() {
  const sellerBoughtItemsTable = document.querySelector(
    "#sellerBoughtItemsGrid"
  );
  const boughtItems = await boughtItemsRepo.getBoughtItemsForSeller(
    currentUser.userId
  );

  let boughtItemsWithUserNames = await Promise.all(
    boughtItems.map(async (boughtItem) => {
      const buyer = await usersRepo.getUserByUserId(boughtItem.customerId);
      return { ...boughtItem, buyerUsername: buyer.username };
    })
  );

  if (boughtItems.length > 0) {
    const tableHTML = `
      <table class="item-table">
        <thead>
          <tr>
            <th>Item Image</th>
            <th>Item Name</th>
            <th>Buyer's Name</th>
            <th>Quantity Bought</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${boughtItemsWithUserNames
            .map((boughtItem) => boughtItemRecord(boughtItem))
            .join("")}
        </tbody>
      </table>
    `;

    sellerBoughtItemsTable.innerHTML = tableHTML;
  } else {
    sellerBoughtItemsTable.innerHTML = components.emptyComponet(
      "No Bought Items",
      "You haven't bought any items yet."
    );
  }
}

function boughtItemRecord(boughtItem) {
  return `
  <tr>
    <td><img class="itemImage" src="${boughtItem.Item.picture}" alt="${boughtItem.Item.name}"></td>
    <td>${boughtItem.Item.name}</td>
    <td>${boughtItem.buyerUsername}</td>
    <td>${boughtItem.quantity}</td>
    <td>$${boughtItem.Item.price}</td>
  </tr>
`;
}

function customerDetailsPage() {
  return `<h3 class="title">User Details</h3>
  <div class="user-details">
  ${userDetailsCard(currentUser)}
  </div>
  <div class="account-buttons row">
      <button
          class="update-account-details-button button">Update Account Details</button>
      <button class="sign-out-button button">Log Out</button></div>

  <h3 class="title">History</h3>
  <div class="item-grid">
  </div>`;
}

function userDetailsCard(currentUser) {
  return `
  <p><strong>User Name:</strong> ${currentUser.username}</p>
  <p><strong>First Name:</strong> ${currentUser.name}</p>
  <p><strong>Last name:</strong> ${currentUser.surname}</p>
  <p><strong>Shipping Address:</strong> ${currentUser.shippingAddress}</p>
  <p><strong>Current Balance:</strong> $${currentUser.moneyBalance.toFixed(
    2
  )}</p>
  `;
}

function SellerDetailsCard(currentUser) {
  return `
  <p><strong>User Name:</strong> ${currentUser.username}</p>
  <p><strong>First Name:</strong> ${currentUser.name}</p>
  <p><strong>Last name:</strong> ${currentUser.surname}</p>
  <p><strong>Company Name:</strong> ${currentUser.companyName}</p>
  `;
}

function sellerDetailsPage() {
  const sellerDetailsContainer = document.querySelector(
    ".user-details-container"
  );
  sellerDetailsContainer.innerHTML = "";

  sellerDetailsContainer.innerHTML += SellerDetailsCard(currentUser);

  return `<h3 class="title">Seller Details</h3>
    <div class="user-details">
      ${SellerDetailsCard(currentUser)}
    </div>
    <div class="account-buttons row">
      <button class="update-account-details-button button">Update Account Details</button>
      <button class="sign-out-button button">Log Out</button>
    </div>

    <div class="item-grid">
    </div>
    <!-- Seller functionalities -->
    <section id="uploadItem">
      <h2 class="uploaditem">Upload an Item</h2>
      <form id="uploadForm" enctype="multipart/form-data">
        <label for="itemName">Item Name:</label>
        <input type="text" id="itemName" name="itemName" required><br>

        <label for="price">Price:</label>
        <input type="number" id="price" name="price" min="0.01" step="0.01" required><br>

        <label for="quantity">Available Quantity:</label>
        <input type="number" id="quantity" name="quantity" min="1" required><br>

        <label for="itemImage">Item URL image:</label>
        <input type="url" id="itemImage" name="itemImage" accept="image/*" required><br>

        <label for="details">Details:</label>
        <input type="text" id="details" name="details"required><br>

        <button type="submit">Upload Item</button>
      </form>
    </section>

    <section id="viewItems">
      <h2 class="xx">View Items for Sale</h2>
      <!-- Display items for sale using grid layout -->
      <div class="item-grid" id="itemGrid"></div>
    </section>

    <!-- Display seller's bought items -->
    <section id="sellerBoughtItems"><br>
      <h2 class="xx">History of Bought Items</h2>
      <div class="item-grid2" id="sellerBoughtItemsGrid">
      
      </div>
    </section>`;
}

function itemCard(boughtItem) {
  return `
  <div class="item-card column" id="${boughtItem.boughtItemId}">
                    <img class="item-image"
                        src="${boughtItem.Item.picture}"
                        alt="${boughtItem.Item.name}">

                    <div class="item-info column">
                        <p class="item-name">${boughtItem.Item.name}</p>
                        <h3 class="item-price">$${boughtItem.Item.price}</h3>
                        <h4 class="item-quantity">Quantity Bought: ${boughtItem.quantity} </h4>

                    </div>
                </div>
  `;
}

async function displayItems(sellerId) {
  const uplaodedItems = await itemsRepo.getUploadedItems(sellerId);

  itemGrid.innerHTML = "";
  if (uplaodedItems.length > 0) {
    uplaodedItems.forEach(addItemCard);
  } else {
    itemGrid.innerHTML = components.emptyComponet(
      "No Items Uplaoded",
      "You have not uploaded anything yet."
    );
  }
}

function addItemCard(item) {
  const itemCard = document.createElement("div");
  itemCard.classList.add("item-card");

  itemCard.innerHTML = `
  <img src="${item.picture}" alt="Item Image">
  <h3>${item.name}</h3>
  <p>Price: $${item.price}</p>
  <p>Available Quantity: ${item.quantity}</p>
  <p>Details: ${item.details}</p>
  <button class="edit-button" data-item-id="${item.itemId}">Edit Item</button>
  <button class="delete-button" data-item-id="${item.itemId}">Delete Item</button>
`;

  itemCard
    .querySelector(".edit-button")
    .addEventListener("click", async function () {
      const itemId = this.dataset.itemId;
      const selectedItem = await itemsRepo.getItem(itemId);
      populateFormForEdit(selectedItem);
    });

  itemCard
    .querySelector(".delete-button")
    .addEventListener("click", async function () {
      const itemId = this.dataset.itemId;
      await itemsRepo.deleteItem(itemId);
      displayItems(currentUser.userId);
    });

  itemGrid.appendChild(itemCard);
}

function populateFormForEdit(item) {
  document.querySelector("#itemName").value = item.name;
  document.querySelector("#price").value = item.price;
  document.querySelector("#quantity").value = item.quantity;
  document.querySelector("#itemImage").value = item.picture;
  document.querySelector("#details").value = item.details;

  uploadForm.dataset.editItemId = item.itemId;
}
