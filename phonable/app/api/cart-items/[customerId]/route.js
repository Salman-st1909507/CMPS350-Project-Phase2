import cartItemsRepo from "@/app/repo/cart-items-repo";

export async function GET(request, { params }) {
  const customerId = params.customerId;

  const cartItems = await cartItemsRepo.getCartItems(customerId);
  return Response.json(cartItems);
}
