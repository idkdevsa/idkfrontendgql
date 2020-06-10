import React from 'react';
import useCategory from './useCategory';
import { withApollo } from 'react-apollo';
import useMenus from './useMenus';

const Header = props => {
  const [menus] = useMenus(props);
  return <div>{console.log(menus)}</div>;
};

export default withApollo(Header);
