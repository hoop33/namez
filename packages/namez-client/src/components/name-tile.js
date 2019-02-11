import React from 'react';

export default ({name, color}) => {
  const style = {
    color: color,
  };
  return <div style={style}>{name.text}</div>;
};
