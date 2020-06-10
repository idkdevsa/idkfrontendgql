import React from 'react';
import { withApollo } from 'react-apollo';

import { Card, Avatar, Layout } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import useCategory from './useCategory';

const VsCodeContent = props => {
  const [category] = useCategory(props);
  console.log(category);

  return (
    <Layout.Content className="vscodecontent">
      {category.posts.map((post, index) => (
        <Card
          key={index}
          style={{ width: 300 }}
          cover={
            <img
              alt={post.node.featuredImage.altText}
              src={post.node.featuredImage.sourceUrl}
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={post.node.title}
            description={post.node.excerpt}
          />
        </Card>
      ))}
    </Layout.Content>
  );
};

export default withApollo(VsCodeContent);
