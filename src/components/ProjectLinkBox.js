import React from "react";
import styled from "styled-components";

const ProjectLinkBox = () => {
  const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
  `;

  return (
    <Box>
      <div>View:</div>
      <div>Git:</div>
    </Box>
  );
};

export default ProjectLinkBox;
