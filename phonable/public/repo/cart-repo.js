import itemsRepo from "./items-repo.js";

class CartItemsClientRepo {
  async getCartItems(customerId) {
    const response = await fetch(
      `http://localhost:3000/api/cart-items/${customerId}`
    );
    return response.json();
  }

  async getCartItem(cartItemId, customerId) {
    const response = await fetch(
      `http://localhost:3000/api/cart-items/${customerId}/${cartItemId}`
    );
    return response.json();
  }

  async getCartItemByItemId(itemId) {
    const response = await fetch(
      `http://localhost:3000/api/cart-items?itemId=${itemId}`
    );
    return response.json();
  }

  async updateCartItem(updatedCartItem) {
    const response = await fetch(
      `http://localhost:3000/api/cart-items/${updatedCartItem.customerId}/${updatedCartItem.cartItemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCartItem),
      }
    );
    return response.json();
  }

  async addCartItem(cartItem) {
    const newCartItem = cartItem;
    const existingCartItem = await this.getCartItemByItemId(newCartItem.itemId);

    if (!existingCartItem) {
      const response = await fetch(`http://localhost:3000/api/cart-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });

      return response.json();
    } else {
      const newQuantity = (existingCartItem.quantity += newCartItem.quantity);
      await this.updateCartItem({ ...existingCartItem, quantity: newQuantity });
    }
  }

  async deleteCartItem(cartItemId, customerId) {
    const response = await fetch(
      `http://localhost:3000/api/cart-items/${customerId}/${cartItemId}`,
      {
        method: "DELETE",
      }
    );
    return response.json();
  }
}

export default new CartItemsClientRepo();
