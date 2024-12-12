import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";
import { Link } from "react-router-dom";

export default function PeopleTable({ users = [] }: { users?: any[] }) {
  console.log("here");
  return (
    <div id="wd-people-table">
      <PeopleDetails />
      <tbody>
        {users.map((user: any) => (
          <tr key={user._id}>
            <td className="wd-full-name text-nowrap">
              <Link
                to={`/Kanbas/Account/Users/${user._id}`}
                className="text-decoration-none"
              >
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>
                <span className="wd-last-name"> {user.lastName}</span>
              </Link>
            </td>
            <td className="wd-login-id">{user.loginId}</td>
            <td className="wd-section">{user.section}</td>
            <td className="wd-role">{user.role}</td>
            <td className="wd-last-activity">{user.lastActivity}</td>
            <td className="wd-total-activity">{user.totalActivity}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}