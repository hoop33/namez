import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Colors from '../components/colors';
import {NameTile} from '../components';

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

const NamesContainer = styled.div`
  text-align: center;
  line-height: 400%;
`;

export default function Names() {
  return (
    <Query query={GET_NAMES}>
      {({data, loading, error, fetchMore}) => {
        if (error) return <p>ERROR: ${error}</p>;

        return (
          <NamesContainer>
            {data.names &&
              data.names.nodes &&
              data.names.nodes.map(name => (
                <NameTile
                  key={name.id}
                  name={name}
                  color={colors.nextColor()}
                />
              ))}
          </NamesContainer>
        );
      }}
    </Query>
  );
}
