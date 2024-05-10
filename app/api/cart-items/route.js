import cartItemsRepo from "@/app/repo/cart-items-repo";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let itemId = searchParams.get("itemId");

  const items = await cartItemsRepo.getCartItemByItemId(itemId);
  return Response.json(items);
}

export async function POST(request) {
  const cartItem = await request.json();
  const newItem = await cartItemsRepo.addCartItem(cartItem);
  return Response.json(newItem);
}
