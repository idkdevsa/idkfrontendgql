import React, { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const useLoadingSpinner = () => {
  const [isLoading, setIsLoading] = useState(true);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} />;

  const handleLoading = val => {
    setIsLoading(val);
  };

  const renderSpin = () => {
    return <Spin indicator={antIcon} spinning={isLoading} />;
  };

  return [{ isLoading }, renderSpin, handleLoading];
};

export default useLoadingSpinner;
