const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    """
    A list of names
    """
    names(
      """
      The number of names to return. Must be >= 1. Default = 10
      """
      pageSize: Int
      """
      Return results after the cursor
      """
      after: String
    ): NameConnection!
    name(id: ID!): Name
  }

  """
  A wrapper around a list of names, plus a cursor to the last name in the list.
  """
  type NameConnection {
    cursor: String
    nodes: [Name]
  }

  """
  A name
  """
  type Name {
    id: ID
    text: String
  }
`;

module.exports = typeDefs;
