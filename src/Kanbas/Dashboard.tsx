import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enrollments } from "./Database";
import * as enrollmentClinet from "./client";
import { addEnrollment, deleteEnrollment } from "./reducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: {
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const enrolled = enrollments.filter(
    (enrollment) => enrollment.user === currentUser._id
  );

  const enroll = async (userId: string, courseId: string) => {
    await enrollmentClinet.enroll(userId, courseId);
    dispatch(addEnrollment({ userId, courseId }));
  };

  const unenroll = async (userId: string, courseId: string) => {
    await enrollmentClinet.unenroll(userId, courseId);
    dispatch(deleteEnrollment({ userId, courseId }));
  };

  console.log("2", courses);
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button
          onClick={() => setEnrolling(!enrolling)}
          className="float-end btn btn-primary"
        >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1>
      <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={addNewCourse}
        >
          {" "}
          Add{" "}
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={updateCourse}
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5>
      <br />
      <input
        value={course.name}
        className="form-control mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <textarea
        value={course.description}
        className="form-control"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.length > 0 &&
            courses.map((course) => (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
              >
                <img
                  className="card-img-top"
                  src={"/images/reactjs.jpg"}
                  alt="Card image cap"
                />
                <div className="card rounded-3 overflow-hidden">
                  <Link
                    to={`/Kanbas/Courses/${course.number}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {enrolling && (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              updateEnrollment(course._id, !course.enrolled);
                            }}
                            className={`btn ${
                              course.enrolled ? "btn-danger" : "btn-success"
                            } float-end`}
                          >
                            {course.enrolled ? "Unenroll" : "Enroll"}
                          </button>
                        )}
                        {console.log("enrolled", enrolled)}

                        {course.name}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}{" "}
                      </p>
                      <button className="btn btn-primary p-1"> Go </button>
                      <button
                        onClick={(event) => {
                          deleteCourse(course._id);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>

                      <button
                        id="wd-enrollorUn-course-click"
                        className="btn btn-secondary p-1 ms-1"
                        onClick={(e) => {}}
                      >
                        {enrolled.find(
                          (enrollment) => enrollment.course == course._id
                        ) !== undefined
                          ? "Unenroll"
                          : "Enroll"}
                      </button>
                      <button
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning ms-1 me-1 float-end"
                      >
                        Edit
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
