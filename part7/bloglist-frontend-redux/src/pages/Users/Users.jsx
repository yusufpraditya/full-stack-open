import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => state.user.users);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center border-2 rounded-lg shadow-md p-4">
        <table className="text-center">
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
                      <NavLink
                        className="hover:bg-black hover:text-white w-full block"
                        to={user.id}
                      >
                        {user.name}
                      </NavLink>
                    </td>
                    <td>{user.blogs.length}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
