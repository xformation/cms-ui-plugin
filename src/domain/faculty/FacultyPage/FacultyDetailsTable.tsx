import * as React from "react";
import { FacultyFragment } from "../../types";

import { Link } from "react-router-dom";

export default ({ faculty }: { faculty: FacultyFragment }) =>
  <section>
    <h2 className="heading">Faculty Information</h2>
    <table className="striped-table">
      <tbody>
        <tr>
          <td><strong>Name</strong></td>
          <td>
            <b>
              {faculty.name} {faculty.lastName}
            </b>
          </td>
        </tr>
        <tr>
          <td><strong>Address</strong></td>
          <td>
            {faculty.address}
          </td>
        </tr>
        <tr>
          <td><strong>Email</strong></td>
          <td>
            {faculty.mail}
          </td>
        </tr>
        <tr>
          <td><strong>Designation</strong></td>
          <td>
            {faculty.designation}
          </td>
        </tr>
        <tr>
          <td><strong>Mobile</strong></td>
          <td>
            {faculty.mobile}
          </td>
        </tr>
        <tr>
          <td><strong>Status</strong></td>
          <td>
            {faculty.status}
          </td>
        </tr>
      </tbody>
    </table>
    <Link to={`/plugins/xformation-petclinic-panel/page/editfaculty?id=${faculty.id}`} className="btn customButton">
      Edit Faculty
    </Link>
  </section>;
