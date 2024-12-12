import { Link, Routes, useLocation, useParams } from "react-router-dom";
export default function CoursesNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();
  const { pathname } = useLocation();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
    {links.map((link) => (
      <div>
      <Link to={`/Kanbas/Courses/${cid}/${link}`} id={`wd-course-${link}-link`}
      className={`list-group-item border border-0 ${pathname.includes(`${link}`) ? "active" : ""}`}>
      {link}
      </Link>

      </div>
      ))}
      <br />
      </div>
);}
