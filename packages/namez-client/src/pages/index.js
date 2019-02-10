import React, {Fragment} from 'react';

import Names from './names';
import {Footer, PageContainer} from '../components';

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Names path="/" />
      </PageContainer>
      <Footer />
    </Fragment>
  );
}
