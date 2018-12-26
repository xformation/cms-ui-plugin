import * as React from "react";
import { InstituteFragment } from "../../types";

import { Link } from "react-router-dom";

export default ({ institute }: { institute: InstituteFragment }) =>
  <section>
    <h2 className="heading">Institute Information</h2>
    <table className="striped-table">
      <tbody>
        <tr>
          <td><strong>Name</strong></td>
          <td>
            <b>
              {institute.name}
            </b>
          </td>
        </tr>
        <tr>
          <td><strong>Code</strong></td>
          <td>
            {institute.code}
          </td>
        </tr>
        <tr>
          <td><strong>Year</strong></td>
          <td>
            {institute.year}
          </td>
        </tr>
      </tbody>
    </table>
    <Link to={`/plugins/xformation-petclinic-panel/page/editinstitute?id=${institute.id}`} className="btn customButton">
      Edit Institute
    </Link>
  </section>;
