class UsersClientRepo {
  getCurrentUserId() {
    return JSON.parse(localStorage.currentUserId);
  }

  setCurrentUserId(userId) {
    localStorage.currentUserId = JSON.stringify(userId);
  }

  async getUsers() {
    const response = await fetch(`/api/users`);
    return response.json();
  }

  async getUserByUserId(userId) {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }

  async getUserByUsername(username) {
    const response = await fetch(`/api/users?username=${username}`);
    return response.json();
  }

  async updateUser(updatedUser) {
    const response = await fetch(`/api/users/${updatedUser.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    return response.json();
  }
}

export default new UsersClientRepo();
