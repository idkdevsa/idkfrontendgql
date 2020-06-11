import React from "react";
import {
  BottomBar,
  MainLayout,
  TopBar,
  ContentLayout,
} from "./VsCodeSkin/VsCodeComponents";

export default VsCodeSkin = ({ children }) => {
  return (
    <MainLayout>
      <TopBar />
      <ContentLayout>{children}</ContentLayout>
      <BottomBar />
    </MainLayout>
  );
};
