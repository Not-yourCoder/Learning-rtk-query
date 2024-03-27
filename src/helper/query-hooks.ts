export const fetchTodos = async () => {
  const response = await fetch("http://localhost:3000/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch todos.");
  }
  const data = await response.json();
  return data;
};

export const addTodos = async (post) => {
  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "COntent-type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

export const fetchTags = async () => {
  const response = await fetch("http://localhost:3000/tags");
  if (!response.ok) {
    throw new Error("Failed to fetch todos.");
  }
  const data = await response.json();
  return data;
};
