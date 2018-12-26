import * as React from "react";
import DatePicker from "react-datepicker";
import * as moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

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
const AttendanceOverview = () =>
    <section>
        <h2 className="heading">
            Attendance found
        </h2>
        <DatePickerComponent />
    </section>;
export default AttendanceOverview;