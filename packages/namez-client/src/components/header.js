import React from 'react';

export default function Header({children = 'Namez'}) {
  return (
    <div>
      <h2>{children}</h2>
    </div>
  );
}
