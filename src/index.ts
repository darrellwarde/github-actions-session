import { ApolloServer } from "apollo-server";
import neo4j from "neo4j-driver";

import schema from "./schema";

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "password")
);

const server = new ApolloServer({
  schema,
  context: { driver },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
