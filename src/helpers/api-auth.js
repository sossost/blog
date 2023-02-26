export const getBlogIdByUserId = async (userId) => {
  const response = await fetch(
    "https://blog-5a22e-default-rtdb.firebaseio.com/" +
      userId +
      "/auth/email.json/"
  );

  const data = await response.json();

  return data;
};

export const getProfileByEmail = async (email) => {
  const response = await fetch("/api/auth/user/" + email);

  const data = await response.json();

  const user = { email: data.email, username: data.username };

  return user;
};
