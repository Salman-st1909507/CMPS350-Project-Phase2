import cartItemsRepo from "@/app/repo/cart-items-repo";

export async function GET(request, { params }) {
  const cartItemId = params.cartItemId;
  const cartItem = await cartItemsRepo.getCartItem(cartItemId);
  return Response.json(cartItem, { status: 200 });
}

export async function PUT(request, { params }) {
  const cartItemId = params.cartItemId;
  const cartItem = await request.json();
  const updatedCartItem = await cartItemsRepo.updateCartItem(
    cartItemId,
    cartItem
  );
  return Response.json(updatedCartItem);
}

export async function DELETE(request, { params }) {
  const cartItemId = params.cartItemId;

  const cartItem = await cartItemsRepo.deleteCartItem(cartItemId);
  return Response.json(cartItem, { status: 200 });
}
