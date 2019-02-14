import React from 'react';
import styled from 'styled-components';

const NameTile = styled.div`
  font-size: 48px;
`;

export default ({name, color}) => {
  const style = {
    color: color,
  };
  return <NameTile style={style}>{name.text}</NameTile>;
};
