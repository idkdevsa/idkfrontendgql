import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Breadcrumb } from "antd";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";

// define breadcrumb to dynamically change with the slug

const DynamicUserBreadCrumb = (props) => {
  console.log(props);
  return props.match.params.slug;
};

const routes = [{ path: "/s/", breadcrumb: DynamicUserBreadCrumb }];

// map & render breadcrumb components.
const VsCodeBreadcrumb = withBreadcrumbs(routes)(({ breadcrumbs }) => (
  <>
    <Breadcrumb>
      {breadcrumbs.map(({ match, breadcrumb }) => (
        // other props are available during render, such as `location`
        // and any props found in your route objects will be passed through too
        <Breadcrumb.Item key={match.url}>
          <NavLink to={match.url}>{breadcrumb}</NavLink>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  </>
));

export default withRouter(VsCodeBreadcrumb);
