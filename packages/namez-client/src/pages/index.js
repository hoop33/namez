import React, {Fragment} from 'react';

import Names from './names';
import {Footer, Header, PageContainer} from '../components';

export default function Pages() {
  return (
    <Fragment>
      <Header />
      <PageContainer>
        <Names path="/" />
      </PageContainer>
      <Footer />
    </Fragment>
  );
}
