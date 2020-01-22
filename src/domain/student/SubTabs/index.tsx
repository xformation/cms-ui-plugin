import * as React from 'react';
// import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import AddStudentPage from '../AddStudentPage/AddStudentPage';
import StudentListPage from '../StudentListPage/StudentListPage';

export default class StudentSubtabs extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

  render() {
    const {activeTab} = this.state;
    return (
      <section className="tab-container row vertical-tab-container">
        <Nav tabs className="pl-3 pl-3 mb-4 mt-4 col-sm-2">
          <NavItem className="cursor-pointer">
            <NavLink
              className={`vertical-nav-link ${activeTab === 0 ? 'side-active' : ''}`}
              onClick={() => {
                this.toggleTab(0);
              }}
            >
              Student List
            </NavLink>
          </NavItem>
          <NavItem className="cursor-pointer">
            <NavLink
              className={`vertical-nav-link ${activeTab === 1 ? 'side-active' : ''}`}
              onClick={() => {
                this.toggleTab(1);
              }}
            >
              Create Student
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="col-sm-10 border-left p-t-1">
          <TabPane tabId={0}>
            <StudentListPage />
          </TabPane>
          <TabPane tabId={1}>
            <AddStudentPage />
          </TabPane>
        </TabContent>
      </section>
    );
  }
}
