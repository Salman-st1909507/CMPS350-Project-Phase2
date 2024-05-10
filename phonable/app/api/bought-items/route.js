import boughtItemsRepo from "@/app/repo/bought-items-repo";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("customerId");
  const sellerId = searchParams.get("sellerId");
  const itemId = searchParams.get("itemId");

  if (sellerId) {
    const boughtItems = await boughtItemsRepo.getBoughtItemsForSeller(sellerId);
    return Response.json(boughtItems);
  } else if (itemId) {
    const boughtItem = await boughtItemsRepo.getBoughtItemByItemId(itemId);
    return Response.json(boughtItem);
  }

  const boughtItems = await boughtItemsRepo.getBoughtItemsForCustomer(
    customerId
  );
  return Response.json(boughtItems);
}

export async function POST(request) {
  const boughtItem = await request.json();
  const newBoughtItem = await boughtItemsRepo.addBoughtItem(boughtItem);
  return Response.json(newBoughtItem);
}
