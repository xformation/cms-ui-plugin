import * as React from 'react';
import { Component } from 'react';


class Tabs extends React.Component<{}, any>{
  constructor(props: any) {
    super(props);
    this.state = {
      active: 0
    }
  }

  select = (i: any) => {
    let _this = this;
    return function () {
      _this.setState({
        active: i
      });
    }
  }

  renderTabs = () => {
    return React.Children.map(this.props.children, (item, i) => {
      if (i % 2 === 0) {
        let active = this.state.active === i ? 'active' : '';
        return <a onClick={this.select(i)} className={`${active} tab`}>{item}</a>;
      }
    });
  }

  renderContent() {
    return React.Children.map(this.props.children, (item, i) => {
      if (i - 1 === this.state.active) {
        return <div className='content'>{item}</div>;
      } else {
        return;
      }
    });
  }

  render() {
    return (
      <div className="tabs">
        {this.renderTabs()}
        {this.renderContent()}
      </div>
    );
  }
}

class Tabx extends React.Component<{}, {}>{
  render() {
    return (
      <main>
        <Tabs>
          One
          <span>
            Well here's a nested Tabs element.
          </span>
          Two
          <span>Two thing</span>
          Three
          <span>Three thing</span>
        </Tabs>
      </main>
    );
  }
}

export default Tabx;