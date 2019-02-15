import React, {Fragment} from 'react';
import {createGlobalStyle} from 'styled-components';
import Names from './names';
import {Footer, Header, PageContainer} from '../components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Acme, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: #363636;
    margin: 0;
    padding: 0;
  }
`;

export default function Pages() {
  return (
    <Fragment>
      <GlobalStyle />
      <Header />
      <PageContainer>
        <Names path="/" />
      </PageContainer>
      <Footer />
    </Fragment>
  );
}
