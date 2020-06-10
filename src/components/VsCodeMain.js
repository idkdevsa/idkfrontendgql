import React, { useState } from 'react';
import { Tabs, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';

const { TabPane } = Tabs;

class VsCodeMain extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    console.log(props);
    const panes = [
      { title: 'Tab 1', content: 'Content of Tab Pane 1', url: '/', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab Pane 2', url: '', key: '2' },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const path = this.props.history.location.pathname;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({
      title: 'New Tab',
      content: 'New Tab Pane',
      url: `${path}`,
      key: activeKey,
    });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  tabLink = pane => {
    return <a href={pane.url}>{pane.title}</a>;
  };

  render() {
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button onClick={this.add}>ADD</Button>
        </div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.state.panes.map((pane, index) => (
            <TabPane tab={pane.title} key={index}></TabPane>
          ))}
          {this.props.children}
        </Tabs>
      </div>
    );
  }
}

export default withRouter(VsCodeMain);
