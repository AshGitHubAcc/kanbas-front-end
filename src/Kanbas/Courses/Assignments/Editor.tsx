import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client"
import * as assignmentClient from "./client";
import { setAssignments, addAssignment, updateAssignment} from "./reducer"
import { useEffect } from "react";
import { useState } from "react";

export default function AssignmentEditor () {
  const { aid } = useParams();
  const { cid } = useParams();
  const assignments = useSelector( (state: any) => state.assignmentReducer.assignments);
  const dispatch = useDispatch();

  const assignment = assignments.find((assignment: any) => assignment._id === aid);



  const [assignmentName, setAssignmentName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [untilDate, setUntilDate] = useState("");


  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = {title: assignmentName,
      description: description,
      course: cid,
      points: points,
      dueDate: dueDate,
      availableFrom: fromDate,
      availableUntil: untilDate
     };
    const assignment = await coursesClient.createAssignmentsForCourse(cid, newAssignment);
    dispatch(addAssignment(assignment));
  };

  const saveAssignment = async () => {
    const assignment = {title: assignmentName,
      description: description,
      course: cid,
      points: points,
      dueDate: dueDate,
      availableFrom: fromDate,
      availableUntil: untilDate
     };
    console.log(assignment);
    await assignmentClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  useEffect(() => {
    if (aid !== "undefined") {
      console.log(assignment);
      setAssignmentName(assignment.title || "");
      setDescription(assignment.description || "");
      setPoints(assignment.points || 0);
      setDueDate(assignment["due-date"] || "");
      setFromDate(assignment["available-from"] || "");
      setUntilDate(assignment["available-until"] || "");
    }
  }, [assignment]);

    return (
      
      <div id="wd-assignments-editor">
        
      <p className="breadcrumb-item active" aria-current="page">{cid}</p>
        <label htmlFor="wd-name">Assignment Name</label>
        <input className="form-control" id="wd-name" value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)}/><br /><br />
        <input className="form-control" id="wd-description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <br />
        <table>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input className=".col-xl me-1 form-control" type="number" id="wd-points" value={points} onChange={(e) => setPoints(parseInt(e.target.value))}/>
          </td>
        </tr>
        <br/>
        <tr>
            <td align = "right" valign="top">
                <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
                <select className="form-control" id="wd-group">
                    <option value="Assignments">ASSIGNMENTS</option>
                </select>
            </td>
        </tr>
        <br />
        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
                <select className="form-control" id="wd-display-grade-as">
                    <option value="Percentage">Percentage</option>
                </select>
            </td>
        </tr>
        <br />
        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
                <select className="form-control" id="wd-submission-type">
                <option value="Online">Online</option>
                </select>
            </td>
        </tr>
        <br></br>
        <tr>
            <td align="right" valign="top">
            </td>
            <td>
                <input type="checkbox" id="wd-text-entry" value="ONLINE"/>
                <label htmlFor="wd-text-entry">Text Entry</label>
            </td>
        </tr>
        <tr>
            <td></td>
            <td valign="top">
                <input type="checkbox" id="wd-website-url" value="ONLINE"/>
                <label htmlFor="wd-website-url">Website URL</label>
            </td>
        </tr>
        <tr>
            <td></td>
            <td valign="top">
                <input type="checkbox" id="wd-media-recordings" value="ONLINE"/>
                <label htmlFor="wd-media-recordings">Media Recordings</label>
            </td>
        </tr>
        <tr>
            <td></td>
            <td valign="top">
                <input type="checkbox" id="wd-student-annotation" value="ONLINE"/>
                <label htmlFor="wd-student-annotation">Student Annotations</label>
            </td>
        </tr>
        <tr>
            <td></td>
            <td valign="top">
                <input type="checkbox" id="wd-file-upload" value="ONLINE"/>
                <label htmlFor="wd-file-upload">File Upload</label>
            </td>
        </tr>
        <br></br>
        <tr>
            <td></td>
          <td align="left" valign="top">
            <label htmlFor="wd-assign-to">Assign to</label>
          </td>
        </tr>
        <tr>
            <td></td>
          <td>
            <input className="form-control" type="text" id="wd-assign-to" value="Everyone" />
          </td>
        </tr>
        <br/>
        <tr>
            <td></td>
          <td align="left" valign="top">
            <label htmlFor="wd-due-date">Due Date</label>
          </td>
        </tr>
        <tr>
            <td></td>
          <td>
            <input className="form-control" type="date" id="wd-due-date" value={dueDate} onChange={(e) => setDueDate(new Date(e.target.value).toISOString().split('T')[0])}/>
          </td>
        </tr>
        <br/>
        <tr>
            <td></td>
          <td align="left" valign="top">
            <label htmlFor="wd-available-from">Available from</label>
          </td>
          <td align="left" valign="top">
            <label htmlFor="wd-available-until">Available until</label>
          </td>
        </tr>
        <tr>
            <td></td>
          <td>
            <input className="form-control" type="date" id="wd-available-from" value={fromDate} onChange={(e) => setFromDate(new Date(e.target.value).toISOString().split('T')[0])}/>
          </td>
          <td>
            <input  className="form-control" type="date" id="wd-available-until" value={untilDate} onChange={(e) => setUntilDate(new Date(e.target.value).toISOString().split('T')[0])}/>
          </td>
        </tr>
        <br/>
        </table>
        <hr/>
        <table>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
            <Link to={`/Kanbas/Courses/${cid}/assignments`}>
            <button className="btn btn-secondary">
              Cancel
              </button>
            </Link>
            <Link to={`/Kanbas/Courses/${cid}/assignments/`}>
            <button className="btn btn-danger" onClick={() => (aid === "undefined"? createAssignmentForCourse(): saveAssignment())}>Save</button>
            </Link>
            </td>
            </tr>
        </table>
    </div>
);}