import CoursesNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { Route, Routes, useParams, useLocation } from "react-router";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import PeopleTable from "./People/Table";
import AssignmentEditor from "./Assignments/Editor";
import * as courseClient from "./client";
import { useEffect } from "react";
import { useState } from "react";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  console.log("Courses21", cid);
  const course = courses.find((course) => {
    console.log("Courses25", course.number);
    return course.number === cid;
  });
  console.log("Courses23", course);
  const { pathname } = useLocation();
  const [users, setUsers] = useState<any[]>([]);

  const peopleInCourses = pathname.includes("Courses");

  useEffect(() => {
    if (peopleInCourses) {
      const getUsers = async () => {
        const users = await courseClient.findUsersForCourse(course.number);
        setUsers(users);
      };
      getUsers();
    } else {
      setUsers([]);
    }
  }, [peopleInCourses, course.number]);

  console.log("Courses", course);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:aid/Editor"
              element={<AssignmentEditor />}
            />
            <Route path="People" element={<PeopleTable users={users} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
