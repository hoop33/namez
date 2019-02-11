import React, {Fragment} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import Colors from '../components/colors';
import {NameTile, Header} from '../components';

const GET_NAMES = gql`
  query nameList($after: String) {
    names(after: $after) {
      cursor
      nodes {
        id
        text
      }
    }
  }
`;

const colors = new Colors();

export default function Names() {
  return (
    <Query query={GET_NAMES}>
      {({data, loading, error}) => {
        if (error) return <p>ERROR</p>;

        return (
          <Fragment>
            <Header />
            {data.names &&
              data.names.nodes &&
              data.names.nodes.map(name => {
                return (
                  <NameTile
                    key={name.id}
                    name={name}
                    color={colors.nextColor()}
                  />
                );
              })}
            )}
          </Fragment>
        );
      }}
    </Query>
  );
}
