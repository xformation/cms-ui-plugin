import * as React from "react";
import DatePicker from "react-datepicker";
import * as moment from "moment";

// import {
//     PagingState,
//     IntegratedPaging,
//     IntegratedFiltering,
// } from '@devexpress/dx-react-grid';

// import {
//     Grid,
//     Table,
//     TableHeaderRow,
//     PagingPanel,
// } from '@devexpress/dx-react-grid-bootstrap4';

// import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import { generateRows } from './generator';

// class TableComponent extends React.Component<any, any> {
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             columns: [
//                 { name: 'name', title: 'Student ID' },
//                 { name: 'sex', title: 'Student Name' },
//                 { name: 'city', title: 'Attendance' },
//                 { name: 'car', title: 'Comments' },
//             ],
//             rows: generateRows({ length: 60 }),
//             pageSizes: [5, 10, 15, 0],


//         };
//     }

//     render() {
//         const { rows, columns, pageSizes } = this.state;

//         return (
//             <div className="card">
//                 <Grid
//                     rows={rows}
//                     columns={columns}

//                 >
//                     <PagingState
//                         defaultCurrentPage={0}
//                         defaultPageSize={5}
//                     />

//                     <IntegratedFiltering />
//                     <IntegratedPaging />
//                     <Table />
//                     <TableHeaderRow />
//                     <PagingPanel
//                         pageSizes={pageSizes}
//                     />
//                 </Grid>
//             </div>
//         );
//     }
// }

class DatePickerComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date: any) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
            />

        );
    }
}

const MarkAttendance = () =>
    <section className="plugin-bg-white">
        <h3 className="bg-heading p-1">
            <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true"></i> Admin - Mark Attendance
        </h3>
        <div className="p-1">
            <div className="dgrid-6">
                <div className="chooseDateN">
                    <label>Choose Date</label>
                    <DatePickerComponent />
                    {/* <input type="date" name="" id="" value="12/06/19" /> */}
                </div>
                <div className="">
                    <label>Stream</label>
                    <select className="sfwidth">
                        <option value="">Computer Science</option>
                        <option value="">Information Technology</option>
                        <option value="">Electrical</option>
                    </select>
                </div>
                <div className="">
                    <label>Semester</label>
                    <select className="sfwidth">
                        <option value="">Sem - 1</option>
                        <option value="">Sem - 2</option>
                    </select>
                </div>
                <div className="">
                    <label>Section</label>
                    <select className="sfwidth">
                        <option value="">Div - 1</option>
                        <option value="">Div - 2</option>
                    </select>
                </div>
                <div className="">
                    <label>Period</label>
                    <select className="sfwidth">
                        <option value="">Period - 1</option>
                        <option value="">Period - 2</option>
                    </select>
                </div>
                <div className="">
                    <label>Subject</label>
                    <select className="sfwidth">
                        <option value="">Subject 1</option>
                        <option value="">Subject 2</option>
                    </select>
                </div>
            </div>
            <div className="hflex bg-heading mt-3">
                <h4 className="p-1 py-2 mb-0">Computer Science Sem 1</h4>
                <div className="hhflex">
                    <div >
                        <select >
                            <option value="" selected disabled hidden>No Of Entries</option>
                            <option value="">10</option>
                            <option value="">20</option>
                        </select>
                    </div>
                    <div className="px-2">
                        <select >
                            <option value="" selected disabled hidden>Sort By</option>
                            <option value="">Name</option>
                            <option value="">Roll No</option>
                        </select>
                    </div>
                    <div className="h-center">
                        <input type="text" placeholder="Search Student" />
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
            <table className="fwidth" id="matable">
                <thead>
                    <th>Student Id</th>
                    <th>Student Name</th>
                    <th>Attendance</th>
                    <th>Comments</th>
                </thead>
                <tbody>
                    <tr>
                        <td>001</td>
                        <td>James Cameron</td>
                        <td><a href="">On/Off</a></td>
                        <td><input type="text" placeholder="Enter your comment" /></td>
                    </tr>
                </tbody>
            </table>

            {/* <TableComponent /> */}
        </div>
    </section>;

export default MarkAttendance;