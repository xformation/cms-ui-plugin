import * as React from 'react';
// import { graphql, QueryProps, MutationFunc, compose } from 'react-apollo';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import {FaUserGraduate} from 'react-icons/fa';
import StudentSubtabs from './SubTabs';
import {config} from '../../config';
const LOGGED_IN_USER = new URLSearchParams(location.search).get("signedInUser");
export default class StudentsTab extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
      isLoaded: false,
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.performLoading = this.performLoading.bind(this);
  }

  async componentDidMount() {
    await this.performLoading();
  }

  async performLoading(){
    if(!this.state.isLoaded){
      await  this.setState({
        isLoaded: true
      });
    }
  }
  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

  render() {
    const {activeTab, isLoaded} = this.state;
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
            <NavLink className={`${activeTab === 0 ? 'active' : ''}`} onClick={() => { this.toggleTab(0); }} >
              Student
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="border-right">
          <TabPane tabId={0}>
            {
              isLoaded === true ?
                <StudentSubtabs user={LOGGED_IN_USER} />
              : null
            }
          </TabPane>
        </TabContent>
      </section>
    );
  }
}
