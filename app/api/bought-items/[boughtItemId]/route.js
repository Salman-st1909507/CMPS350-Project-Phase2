import boughtItemsRepo from "@/app/repo/bought-items-repo";

export async function GET(request, { params }) {
  const boughtItemId = params.boughtItemId;
  const boughtItem = await boughtItemsRepo.getBoughtItem(boughtItemId);
  return Response.json(boughtItem, { status: 200 });
}

export async function PUT(request, { params }) {
  const boughtItemId = params.boughtItemId;
  const boughtItem = await request.json();
  const updatedBoughtItem = await boughtItemsRepo.updateBoughtItem(
    boughtItemId,
    boughtItem
  );
  return Response.json(updatedBoughtItem);
}

export async function DELETE(request, { params }) {
  const boughtItemId = params.boughtItemId;

  const boughtItem = await boughtItemsRepo.deleteBoughtItem(boughtItemId);
  return Response.json(boughtItem, { status: 200 });
}
