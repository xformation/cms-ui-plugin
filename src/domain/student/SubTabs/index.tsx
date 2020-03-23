import * as React from 'react';
import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import AddStudentPage from './AddStudentPage';
import StudentListPage from './StudentListPage';
import StudentDetailsPage from './StudentDetailsPage';
import {GET_STUDENT_FILTER_DATA} from '../_queries';
import wsCmsBackendServiceSingletonClient from '../../../wsCmsBackendServiceClient';
import {withApollo} from 'react-apollo';

export interface StudentProps extends React.HTMLAttributes<HTMLElement> {
  [data: string]: any;
  // createStudentFilterDataCache?: any;
  user?: any;
}

class StudentSubtabs extends React.Component<StudentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
      user: this.props.user,
      createStudentFilterDataCache: null,
      branchId: null,
      academicYearId: null,
      departmentId: null,
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.registerSocket = this.registerSocket.bind(this);
    this.getcreateStudentFilterDataCache = this.getcreateStudentFilterDataCache.bind(
      this
    );
  }

  async componentDidMount() {
    console.log('Student. component did mount. User ::::', this.state.user.login);
    await this.registerSocket();
    // await this.getcreateStudentFilterDataCache();
  }

  async registerSocket() {
    const socket = wsCmsBackendServiceSingletonClient.getInstance();
    let bid: any = 0;
    let ayid: any = 0;

    socket.onmessage = (response: any) => {
      let message = JSON.parse(response.data);
      console.log('Student index. message received from server ::: ', message);
      this.setState({
        branchId: message.selectedBranchId,
        academicYearId: message.selectedAcademicYearId,
        departmentId: message.selectedDepartmentId,
      });
      bid = '' + message.selectedBranchId;
      ayid = '' + message.selectedAcademicYearId;
      console.log('Student index. branchId: ', this.state.branchId);
      console.log('Student index. departmentId: ', this.state.departmentId);
      console.log('Student index. ayId: ', this.state.academicYearId);
    };

    socket.onopen = () => {
      console.log(
        'Student index. Opening websocekt connection on index.tsx. User : ',
        this.state.user
      );
      socket.send(this.state.user.login);
    };

    window.onbeforeunload = () => {
      console.log('Student index. Closing websocekt connection on index.tsx');
    };
    const {data} = await this.props.client.query({
      query: GET_STUDENT_FILTER_DATA,
      variables: {
        collegeId: bid,
        // departmentId: departmentId,
        academicYearId: ayid,
        // collegeId: collegeId,
      },

      fetchPolicy: 'no-cache',
    });
    this.setState({
      createStudentFilterDataCache: data,
    });
  }

  async getcreateStudentFilterDataCache() {
    const {branchId, academicYearId, departmentId} = this.state;
    console.log('student branch Id:', branchId);
    const {data} = await this.props.client.query({
      query: GET_STUDENT_FILTER_DATA,
      variables: {
        collegeId: '' + branchId,
        // departmentId: departmentId,
        academicYearId: '' + academicYearId,
        // collegeId: collegeId,
      },

      fetchPolicy: 'no-cache',
    });
    this.setState({
      createStudentFilterDataCache: data,
    });
  }

  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
    if (tabNo === 0) {
      this.getcreateStudentFilterDataCache();
    }
  }

  render() {
    const {activeTab, user, createStudentFilterDataCache} = this.state;
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
          {/* <NavItem className="cursor-pointer">
            <NavLink
              className={`vertical-nav-link ${activeTab === 2 ? 'side-active' : ''}`}
              onClick={() => {
                this.toggleTab(2);
              }}
            >
              Student Details
            </NavLink>
          </NavItem> */}
        </Nav>
        <TabContent activeTab={activeTab} className="col-sm-10 border-left p-t-1">
          <TabPane tabId={0}>
            {/* <StudentListPage
              createStudentFilterDataCache={createStudentFilterDataCache}
            />{' '} */}
            {user !== null && createStudentFilterDataCache !== null && (
              <StudentListPage
                user={user}
                createStudentFilterDataCache={
                  createStudentFilterDataCache.createStudentFilterDataCache
                }
              />
            )}
          </TabPane>
          <TabPane tabId={1}>
            {user !== null && createStudentFilterDataCache !== null && (
              <AddStudentPage
                user={user}
                createStudentFilterDataCache={
                  createStudentFilterDataCache.createStudentFilterDataCache
                }
              />
            )}
          </TabPane>
          {/* <TabPane tabId={2}>
            <StudentDetailsPage />
          </TabPane> */}
        </TabContent>
      </section>
    );
  }
}

export default withApollo(StudentSubtabs);
