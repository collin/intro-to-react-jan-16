import { Link, Routes, Route, useParams } from "react-router-dom";
import { useFetch } from "./useFetch";

const AllUsers = () => {
  const users = useFetch("https://jsonplaceholder.typicode.com/users");

  return (
    <div>
      {users.isLoading && <p>Loading...</p>}
      {users.error && <p>{users.error.message}</p>}
      <ul>
        {users.data?.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SingleUser = () => {
  const params = useParams();
  const user = useFetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`,
  );

  return (
    <div>
      <Link to="/">Back to all users</Link>
      {user.isLoading && <p>Loading...</p>}
      {user.error && <p>{user.error.message}</p>}
      {user.data && (
        <div>
          <div>Username: {user.data.username}</div>
          <div>Name: {user.data.name}</div>
          <div>Email: {user.data.email}</div>
        </div>
      )}
    </div>
  );
};

export const App = () => {
  return (
    <div>
      <h1>User Directory</h1>
      <Routes>
        <Route path="/" element={<AllUsers />} />
        <Route path="/users/:userId" element={<SingleUser />} />
      </Routes>
    </div>
  );
};
