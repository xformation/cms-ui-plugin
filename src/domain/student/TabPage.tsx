import * as React from 'react';
// import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import {FaUserGraduate} from 'react-icons/fa';
import StudentSubtabs from './SubTabs';
import {config} from '../../config';

export default class StudentsTab extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
      user: null,
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch(config.LOGGED_IN_USER_URL);
      if (!response.ok) {
        console.log('student plugin. Response error : ', response.statusText);
        return;
      }
      const json = await response.json();
      this.setState({user: json});
    } catch (error) {
      console.log('student plugin. Fetch user error: ', error);
    }

    console.log('student plugin. USER -- ', this.state.user);
  }

  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

  render() {
    const {activeTab, user} = this.state;
    return (
      <section className="tab-container">
        <div className="tab-flex p-1">
          <h5>
            <FaUserGraduate className="m-1 fa-2x m-r-1" />
            Student
          </h5>
        </div>
        <Nav tabs className="pl-3 pl-3 mb-4 mt-4 boxShadow">
          <NavItem className="cursor-pointer">
            <NavLink
              className={`${activeTab === 0 ? 'active' : ''}`}
              onClick={() => {
                this.toggleTab(0);
              }}
            >
              Student
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="border-right">
          <TabPane tabId={0}>
            {/* <StudentSubtabs /> */}
            {user !== null && <StudentSubtabs user={user} />}
          </TabPane>
        </TabContent>
      </section>
    );
  }
}
