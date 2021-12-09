import { ApolloServer, gql } from "apollo-server";
import faker from "faker";
import neo4j from "neo4j-driver";

import schema from "../../src/schema";
import { reverseString } from "../../src/utils";

test("server creates a thing", async () => {
  const name = faker.random.word();

  const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "password")
  );

  const server = new ApolloServer({ schema, context: { driver } });

  const CREATE_THING = gql`
    mutation CreateThing($name: String!) {
      createThings(input: [{ name: $name }]) {
        things {
          name
          reverseName
        }
      }
    }
  `;

  const res = await server.executeOperation({
    query: CREATE_THING,
    variables: { name },
  });

  expect(res.data).toEqual({
    createThings: { things: [{ name, reverseName: reverseString(name) }] },
  });

  const session = driver.session();

  try {
    const find = await session.run(
      `
        MATCH (t:Thing {name: $name})
        RETURN t
      `,
      { name }
    );

    expect((find.records[0].toObject() as any).t.properties.name).toEqual(name);
  } finally {
    await session.close();
    await driver.close();
  }
});
