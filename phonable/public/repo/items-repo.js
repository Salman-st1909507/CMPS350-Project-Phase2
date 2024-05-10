class ItemsClientRepo {
  async getItems(searchText) {
    const response = await fetch(
      `http://localhost:3000/api/items?searchText=${searchText}`
    );
    return response.json();
  }

  async getItem(itemId) {
    const response = await fetch(`http://localhost:3000/api/items/${itemId}`);
    return response.json();
  }

  async updateItem(updatedItem) {
    const response = await fetch(
      `http://localhost:3000/api/items/${updatedItem.itemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      }
    );
    return response.json();
  }

  async addItem(item) {
    const response = await fetch(`http://localhost:3000/api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    return response.json();
  }

  async deleteItem(itemId) {
    const response = await fetch(`http://localhost:3000/api/items/${itemId}`, {
      method: "DELETE",
    });
    return response.json();
  }

  async getUploadedItems(sellerId) {
    const response = await fetch(
      `http://localhost:3000/api/items?sellerId=${sellerId}`
    );
    return response.json();
  }
}

export default new ItemsClientRepo();
