import itemsRepo from "@/app/repo/items-repo";

export async function GET(request, { params }) {
  const itemId = params.itemId;
  const item = await itemsRepo.getItem(itemId);
  return Response.json(item, { status: 200 });
}

export async function PUT(request, { params }) {
  const itemId = params.itemId;
  const item = await request.json();
  const updatedItem = await itemsRepo.updateItem(itemId, item);
  return Response.json(updatedItem);
}

export async function DELETE(request, { params }) {
  const itemId = params.itemId;
  const item = await itemsRepo.deleteItem(itemId);
  return Response.json(item, { status: 200 });
}
