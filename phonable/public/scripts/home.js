import itemsRepo from "../repo/items-repo.js";
import * as components from "../utils/components.js";

let searchText;
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  searchText = urlParams.get("searchText");
  if (!searchText) {
    searchText = "";
  }

  await loadItems();
});

async function loadItems() {
  const items = await itemsRepo.getItems(searchText);

  const itemGrid = document.querySelector(".item-grid");
  if (items.length > 0) {
    itemGrid.innerHTML = items.map((item) => itemCard(item)).join("");

    document.querySelectorAll(".item-card").forEach((itemCard) => {
      itemCard.addEventListener("click", () => {
        window.location.href = `../pages/item-details.html?itemId=${itemCard.id}`;
      });
    });
  } else {
    itemGrid.innerHTML = components.emptyComponet(
      "No Items Found",
      "There are no items that match your search."
    );
  }
}

function itemCard(item) {
  return `
  <div class="item-card column" id="${item.itemId}">
                    <img class="item-image"
                        src="${item.picture}"
                        alt="${item.name}">

                    <div class="item-info column">
                        <p class="item-name">${item.name}</p>
                        <h3 class="item-price">$${item.price}</h3>
                    </div>
                </div>
  `;
}
