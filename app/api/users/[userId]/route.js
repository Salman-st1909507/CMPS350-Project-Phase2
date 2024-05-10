import usersRepo from "@/app/repo/users-repo";
export async function GET(request, { params }) {
  const userId = params.userId;
  const user = await usersRepo.getUserByUserId(userId);
  return Response.json(user, { status: 200 });
}

export async function PUT(request, { params }) {
  const userId = params.userId;
  const user = await request.json();
  const updatedUser = await usersRepo.updateUser(userId, user);
  return Response.json(updatedUser);
}
