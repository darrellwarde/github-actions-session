import { gql } from "apollo-server";

const typeDefs = gql`
  type Thing {
    id: ID! @id
    name: String!
    reverseName: String! @ignore
  }
`;

export default typeDefs;
