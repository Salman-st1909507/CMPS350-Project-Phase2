class BoughtItemsClientRepo {
  async getBoughtItemsForCustomer(customerId) {
    const response = await fetch(
      `http://localhost:3000/api/bought-items?customerId=${customerId}`
    );
    return response.json();
  }

  async getBoughtItemsForSeller(sellerId) {
    const response = await fetch(
      `http://localhost:3000/api/bought-items?sellerId=${sellerId}`
    );
    return response.json();
  }

  async getBoughtItemByItemId(itemId) {
    const response = await fetch(
      `http://localhost:3000/api/bought-items?itemId=${itemId}`
    );
    return response.json();
  }

  async addItem(boughtItem) {
    const newBoughtItem = boughtItem;
    const existingBoughtItem = await this.getBoughtItemByItemId(
      newBoughtItem.itemId
    );

    if (
      !existingBoughtItem ||
      existingBoughtItem.customerId != newBoughtItem.customerId
    ) {
      const response = await fetch(`http://localhost:3000/api/bought-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(boughtItem),
      });
      return response.json();
    } else {
      const newQuantity = (existingBoughtItem.quantity +=
        newBoughtItem.quantity);
      await this.updateBoughtItem({
        ...existingBoughtItem,
        quantity: newQuantity,
      });
    }
  }

  async updateBoughtItem(boughtItem) {
    const response = await fetch(
      `http://localhost:3000/api/bought-items/${boughtItem.boughtItemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(boughtItem),
      }
    );
    return response.json();
  }
}

export default new BoughtItemsClientRepo();
