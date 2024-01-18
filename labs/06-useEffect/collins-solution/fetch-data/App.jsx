import { useEffect, useState } from "react";

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  async function fetchTodos() {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
      );
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
      setLoadingError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {loadingError && <p>{loadingError.message}</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};
