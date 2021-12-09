import { Neo4jGraphQL } from "@neo4j/graphql";

import resolvers from "./resolvers";
import typeDefs from "./type-defs";

const neoSchema = new Neo4jGraphQL({ typeDefs, resolvers });

export default neoSchema.schema;
