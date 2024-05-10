import itemsRepo from "@/app/repo/items-repo";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let searchText = searchParams.get("searchText");
  let sellerId = searchParams.get("sellerId");

  if (sellerId) {
    const items = await itemsRepo.getUploadedItems(sellerId);
    return Response.json(items);
  }

  const items = await itemsRepo.getItems(searchText);
  return Response.json(items);
}

export async function POST(request) {
  const item = await request.json();
  const newItem = await itemsRepo.addItem(item);
  return Response.json(newItem);
}
