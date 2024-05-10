import usersRepo from "../repo/users-repo.js";

document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    const user = await usersRepo.getUserByUsername(username);

    if (user && user.password == password) {
      usersRepo.setCurrentUserId(user.userId);
      window.location.href = "home.html";
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
