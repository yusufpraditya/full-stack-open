import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Table = styled.table`
  td {
    text-align: center;
  }
`;

const Users = () => {
  const users = useSelector((state) => state.user.users);

  return (
    <>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={user.id}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default Users;
