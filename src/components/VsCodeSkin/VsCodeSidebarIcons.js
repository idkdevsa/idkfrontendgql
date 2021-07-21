import React, { useState, useCallback, useEffect } from "react";
import { Button, Menu, Layout } from "antd";
import { CommentOutlined, UserOutlined } from "@ant-design/icons";
import VsCodeSidebar from "./VsCodeSidebar";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import { Link } from "react-router-dom";

/**
 * GraphQL menu query
 * Gets the labels, types (internal or external) and URLs
 */
const MENU_QUERY = gql`
query MenuQuery {
	menuItems(where: {location: PRIMARY}) {
		nodes {
			key: id
			parentId
			title: label
			url
			}
		}
	}
`;

const flatListToHierarchical = (
	data = [], {
		idKey = 'key',
		parentKey = 'parentId',
		childrenKey = 'children'
	} = {}
) => {
	const tree = [];
	const childrenOf = {};
	data.forEach((item) => {
		const newItem = {
			...item
		};
		const {
			[idKey]: id, [parentKey]: parentId = 0
		} = newItem;
		childrenOf[id] = childrenOf[id] || [];
		newItem[childrenKey] = childrenOf[id];
		parentId
			?
			(
				childrenOf[parentId] = childrenOf[parentId] || []
			).push(newItem) :
			tree.push(newItem);
	});
	return tree;
};

const VsCodeSidebarIcons = (props) => {
  const [menuCollapse, setMenuCollapse] = useState(true);
  const [curMenu, setCurMenu] = useState('');
	const [menus, setMenus] = useState([]);
	const [subMenu, setSubMenu] = useState([]);

	useEffect(() => {
		const executeMenu = async () => {
			try {
				const result = await props.client.query({
					query: MENU_QUERY,
				});
				const hierarchicalList = flatListToHierarchical(result.data.menuItems.nodes);
				setMenus(hierarchicalList);
			} catch (error) {
				console.log(error);
			}
		};
		executeMenu();
	}, [props.client]);

	useEffect(() => {
		setSubMenu(filterSubMenu(menus))
	}, [])

  // Handle behavior of main sidebar and set current menu
  const handleMenuCollapse = useCallback(
    (curMenuSelection) => {
      setMenuCollapse(
        curMenuSelection !== curMenu && menuCollapse === false
          ? false
          : curMenuSelection !== curMenu && menuCollapse === true
          ? false
          : curMenuSelection === curMenu && menuCollapse === false
          ? true
          : false
      );
      setCurMenu(curMenuSelection);
    },
    [curMenu, menuCollapse]
  );

	function filterSubMenu (menus) {
		let subMenuObj = [];
		for(let menu of menus) {
			console.log(menu)
			// console.log(curMenu)
					if (menu.title == curMenu) {
						for(let child of menu.children) {
							const subMenuUrl = child.url ? child.url.replace('https://idkdev.co.za/', '') : '#';
							subMenuObj.push( {
								title: child.title,
								url: subMenuUrl,
							})
						}
				}
			};
			return subMenuObj;
	}

  return (
    <>
      <Layout.Sider className="vscodesidebaricons" width="4rem" trigger={null}>
        <Menu
          className="vscodesidebariconsmenuitem"
          selectable={false}
          onClick={({ key }) => handleMenuCollapse(key)}
        >
					{menus.map((item, index) => {
          return (
					<Menu.Item key={item.title}>
            <Button
              type="link"
              ghost
              icon={<CommentOutlined style={{ fontSize: "2rem" }} />}
            />
          </Menu.Item>
					)
					})
				}
        </Menu>
      </Layout.Sider>
      <Layout.Sider
        className="vscodesidebar"
        collapsible
        collapsed={menuCollapse}
        trigger={null}
        collapsedWidth={0}
      >
        < VsCodeSidebar setMenuCollapse = {
        	setMenuCollapse
        }
        curMenu = {
        	curMenu
        }
        subMenu = {
        	filterSubMenu(menus)
        }
        />
      </Layout.Sider>
    </>
  );
};

export default withApollo(VsCodeSidebarIcons);
