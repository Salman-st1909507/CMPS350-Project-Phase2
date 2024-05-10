import usersRepo from "@/app/repo/users-repo";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let username = searchParams.get("username");

  if (username) {
    const items = await usersRepo.getUserByUsername(username);
    return Response.json(items);
  }

  const accounts = await usersRepo.getUsers();

  return Response.json(accounts);
}

export async function POST(request) {
  const account = await request.json();
  const newAccount = await usersRepo.addAccount(account);
  return Response.json(newAccount);
}
